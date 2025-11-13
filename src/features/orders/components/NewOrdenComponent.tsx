import React, { useState } from "react";
import styled from "styled-components";
import {
    useCreateOrderMutation,
    useUploadImageMutation,
} from "../services/orderApi";

interface IssueInfo {
    issue_name: string;
    issue_description: string;
    issue_type: number;
    issue_severity: number;
    issue_additional_info: string;
    issue_steps_to_reproduce: string[];
    issue_environment: string;
    issue_additional_notes: string;
    issue_screenshots: string[];
}

interface FormData {
    order_code: string;
    description: string;
    device_data: {
        device_name: string;
        device_type: number;
        device_brand: number;
        serial_number: string;
        imei: string;
        model_year: string;
        color: string;
        storage_capacity: string;
    };
    issues: IssueInfo[];
    customer_data: {
        customer_name: string;
        customer_email: string;
        customer_phone: string;
        customer_address: string;
        customer_city: string;
        customer_country: string;
        customer_type: string;
        preferred_contact: string;
    };
    cost_info: {
        estimated_cost: number;
        labor_cost: number;
        parts_cost: number;
        currency: string;
    };
    timeline: {
        estimated_completion: string;
        estimated_hours: number;
        sla_deadline: string;
    };
    priority: number;
}

const NewOrdenComponent: React.FC = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [createOrder, { isLoading }] = useCreateOrderMutation();
    const [uploadImage] = useUploadImageMutation();
    const [uploadingImages, setUploadingImages] = useState<{
        [key: string]: boolean;
    }>({});
    const [formData, setFormData] = useState<FormData>({
        order_code: "",
        description: "",
        device_data: {
            device_name: "",
            device_type: 1,
            device_brand: 1,
            serial_number: "",
            imei: "",
            model_year: "",
            color: "",
            storage_capacity: "",
        },
        issues: [
            {
                issue_name: "",
                issue_description: "",
                issue_type: 1,
                issue_severity: 1,
                issue_additional_info: "",
                issue_steps_to_reproduce: [""],
                issue_environment: "",
                issue_additional_notes: "",
                issue_screenshots: [],
            },
        ],
        customer_data: {
            customer_name: "",
            customer_email: "",
            customer_phone: "",
            customer_address: "",
            customer_city: "",
            customer_country: "",
            customer_type: "individual",
            preferred_contact: "phone",
        },
        cost_info: {
            estimated_cost: 0,
            labor_cost: 0,
            parts_cost: 0,
            currency: "USD",
        },
        timeline: {
            estimated_completion: "",
            estimated_hours: 0,
            sla_deadline: "",
        },
        priority: 1,
    });

    const tabs = [
        "Información General",
        "Dispositivo",
        "Problemas",
        "Cliente",
        "Costos",
        "Cronograma",
    ];

    const updateFormData = (
        section: keyof FormData,
        field: string,
        value: any
    ) => {
        setFormData((prev) => {
            if (section === "device_data") {
                return {
                    ...prev,
                    device_data: {
                        ...prev.device_data,
                        [field]: value,
                    },
                };
            }
            if (section === "customer_data") {
                return {
                    ...prev,
                    customer_data: {
                        ...prev.customer_data,
                        [field]: value,
                    },
                };
            }
            if (section === "cost_info") {
                return {
                    ...prev,
                    cost_info: {
                        ...prev.cost_info,
                        [field]: value,
                    },
                };
            }
            if (section === "timeline") {
                return {
                    ...prev,
                    timeline: {
                        ...prev.timeline,
                        [field]: value,
                    },
                };
            }
            return prev;
        });
    };

    const updateIssue = (
        issueIndex: number,
        field: keyof IssueInfo,
        value: any
    ) => {
        const newIssues = [...formData.issues];
        newIssues[issueIndex] = { ...newIssues[issueIndex], [field]: value };
        setFormData((prev) => ({ ...prev, issues: newIssues }));
    };

    const addIssue = () => {
        const newIssue: IssueInfo = {
            issue_name: "",
            issue_description: "",
            issue_type: 1,
            issue_severity: 1,
            issue_additional_info: "",
            issue_steps_to_reproduce: [""],
            issue_environment: "",
            issue_additional_notes: "",
            issue_screenshots: [],
        };
        setFormData((prev) => ({
            ...prev,
            issues: [...prev.issues, newIssue],
        }));
    };

    const removeIssue = (issueIndex: number) => {
        if (formData.issues.length > 1) {
            const newIssues = formData.issues.filter(
                (_, i) => i !== issueIndex
            );
            setFormData((prev) => ({ ...prev, issues: newIssues }));
        }
    };

    const updateSteps = (
        issueIndex: number,
        stepIndex: number,
        value: string
    ) => {
        const newSteps = [
            ...formData.issues[issueIndex].issue_steps_to_reproduce,
        ];
        newSteps[stepIndex] = value;
        updateIssue(issueIndex, "issue_steps_to_reproduce", newSteps);
    };

    const addStep = (issueIndex: number) => {
        const newSteps = [
            ...formData.issues[issueIndex].issue_steps_to_reproduce,
            "",
        ];
        updateIssue(issueIndex, "issue_steps_to_reproduce", newSteps);
    };

    const removeStep = (issueIndex: number, stepIndex: number) => {
        const newSteps = formData.issues[
            issueIndex
        ].issue_steps_to_reproduce.filter((_, i) => i !== stepIndex);
        updateIssue(issueIndex, "issue_steps_to_reproduce", newSteps);
    };

    const handleImageUpload = async (
        issueIndex: number,
        files: FileList | null
    ) => {
        if (files) {
            const uploadKey = `${issueIndex}`;
            setUploadingImages((prev) => ({ ...prev, [uploadKey]: true }));

            try {
                const uploadPromises = Array.from(files).map(async (file) => {
                    const formData = new FormData();
                    formData.append("file", file);
                    const response = await uploadImage(formData).unwrap();
                    return response.url;
                });

                const uploadedUrls = await Promise.all(uploadPromises);
                const currentUrls =
                    formData.issues[issueIndex].issue_screenshots;
                updateIssue(issueIndex, "issue_screenshots", [
                    ...currentUrls,
                    ...uploadedUrls,
                ]);
            } catch (error) {
                console.error("Error uploading images:", error);
                alert("Error al subir las imágenes");
            } finally {
                setUploadingImages((prev) => ({ ...prev, [uploadKey]: false }));
            }
        }
    };

    const removeImage = (issueIndex: number, imageIndex: number) => {
        const newImages = formData.issues[issueIndex].issue_screenshots.filter(
            (_, i) => i !== imageIndex
        );
        updateIssue(issueIndex, "issue_screenshots", newImages);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await createOrder(formData).unwrap();
            alert("Orden creada exitosamente");
        } catch (error) {
            console.error("Error creating order:", error);
            alert("Error al crear la orden");
        }
    };

    return (
        <>
            <TabsContainer>
                <TabsNav>
                    {tabs.map((tab, index) => (
                        <TabButton
                            key={index}
                            onClick={() => setActiveTab(index)}
                            $active={activeTab === index}
                        >
                            {tab}
                        </TabButton>
                    ))}
                </TabsNav>
            </TabsContainer>

            <form onSubmit={handleSubmit}>
                {/* Tab 0: Información General */}
                {activeTab === 0 && (
                    <TabContent>
                        <FormGroup>
                            <Label>Código de Orden</Label>
                            <Input
                                type="text"
                                value={formData.order_code}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        order_code: e.target.value,
                                    }))
                                }
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Descripción</Label>
                            <TextArea
                                value={formData.description}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        description: e.target.value,
                                    }))
                                }
                                rows={3}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Prioridad</Label>
                            <Select
                                value={formData.priority}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        priority: Number(e.target.value),
                                    }))
                                }
                            >
                                <option value={1}>Baja</option>
                                <option value={2}>Media</option>
                                <option value={3}>Alta</option>
                            </Select>
                        </FormGroup>
                    </TabContent>
                )}

                {/* Tab 1: Dispositivo */}
                {activeTab === 1 && (
                    <GridContainer>
                        <FormGroup>
                            <Label>Nombre del Dispositivo</Label>
                            <Input
                                type="text"
                                value={formData.device_data.device_name}
                                onChange={(e) =>
                                    updateFormData(
                                        "device_data",
                                        "device_name",
                                        e.target.value
                                    )
                                }
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Tipo de Dispositivo</Label>
                            <Select
                                value={formData.device_data.device_type}
                                onChange={(e) =>
                                    updateFormData(
                                        "device_data",
                                        "device_type",
                                        Number(e.target.value)
                                    )
                                }
                            >
                                <option value={1}>Smartphone</option>
                                <option value={2}>Laptop</option>
                                <option value={3}>Tablet</option>
                                <option value={4}>Smartwatch</option>
                            </Select>
                        </FormGroup>
                        <FormGroup>
                            <Label>Marca</Label>
                            <Select
                                value={formData.device_data.device_brand}
                                onChange={(e) =>
                                    updateFormData(
                                        "device_data",
                                        "device_brand",
                                        Number(e.target.value)
                                    )
                                }
                            >
                                <option value={1}>Samsung</option>
                                <option value={2}>Apple</option>
                                <option value={3}>Lenovo</option>
                            </Select>
                        </FormGroup>
                        <FormGroup>
                            <Label>Número de Serie</Label>
                            <Input
                                type="text"
                                value={formData.device_data.serial_number}
                                onChange={(e) =>
                                    updateFormData(
                                        "device_data",
                                        "serial_number",
                                        e.target.value
                                    )
                                }
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>IMEI</Label>
                            <Input
                                type="text"
                                value={formData.device_data.imei}
                                onChange={(e) =>
                                    updateFormData(
                                        "device_data",
                                        "imei",
                                        e.target.value
                                    )
                                }
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Año del Modelo</Label>
                            <Input
                                type="text"
                                value={formData.device_data.model_year}
                                onChange={(e) =>
                                    updateFormData(
                                        "device_data",
                                        "model_year",
                                        e.target.value
                                    )
                                }
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Color</Label>
                            <Input
                                type="text"
                                value={formData.device_data.color}
                                onChange={(e) =>
                                    updateFormData(
                                        "device_data",
                                        "color",
                                        e.target.value
                                    )
                                }
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Capacidad de Almacenamiento</Label>
                            <Input
                                type="text"
                                value={formData.device_data.storage_capacity}
                                onChange={(e) =>
                                    updateFormData(
                                        "device_data",
                                        "storage_capacity",
                                        e.target.value
                                    )
                                }
                            />
                        </FormGroup>
                    </GridContainer>
                )}

                {/* Tab 2: Problemas */}
                {activeTab === 2 && (
                    <TabContent>
                        <IssuesHeader>
                            <Label>Problemas Reportados</Label>
                            <AddButton type="button" onClick={addIssue}>
                                Agregar Problema
                            </AddButton>
                        </IssuesHeader>

                        {formData.issues.map((issue, issueIndex) => (
                            <IssueCard key={issueIndex}>
                                <IssueHeader>
                                    <IssueTitle>
                                        Problema {issueIndex + 1}
                                    </IssueTitle>
                                    {formData.issues.length > 1 && (
                                        <RemoveButton
                                            type="button"
                                            onClick={() =>
                                                removeIssue(issueIndex)
                                            }
                                        >
                                            Eliminar
                                        </RemoveButton>
                                    )}
                                </IssueHeader>

                                <FormGroup>
                                    <Label>Nombre del Problema</Label>
                                    <Input
                                        type="text"
                                        value={issue.issue_name}
                                        onChange={(e) =>
                                            updateIssue(
                                                issueIndex,
                                                "issue_name",
                                                e.target.value
                                            )
                                        }
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Label>Descripción del Problema</Label>
                                    <TextArea
                                        value={issue.issue_description}
                                        onChange={(e) =>
                                            updateIssue(
                                                issueIndex,
                                                "issue_description",
                                                e.target.value
                                            )
                                        }
                                        rows={3}
                                    />
                                </FormGroup>

                                <GridContainer>
                                    <FormGroup>
                                        <Label>Tipo de Problema</Label>
                                        <Select
                                            value={issue.issue_type}
                                            onChange={(e) =>
                                                updateIssue(
                                                    issueIndex,
                                                    "issue_type",
                                                    Number(e.target.value)
                                                )
                                            }
                                        >
                                            <option value={1}>Hardware</option>
                                            <option value={2}>Pantalla</option>
                                            <option value={3}>
                                                Rendimiento
                                            </option>
                                            <option value={4}>Carga</option>
                                            <option value={5}>Software</option>
                                        </Select>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Severidad</Label>
                                        <Select
                                            value={issue.issue_severity}
                                            onChange={(e) =>
                                                updateIssue(
                                                    issueIndex,
                                                    "issue_severity",
                                                    Number(e.target.value)
                                                )
                                            }
                                        >
                                            <option value={1}>Baja</option>
                                            <option value={2}>Media</option>
                                            <option value={3}>Alta</option>
                                        </Select>
                                    </FormGroup>
                                </GridContainer>

                                <FormGroup>
                                    <Label>Información Adicional</Label>
                                    <TextArea
                                        value={issue.issue_additional_info}
                                        onChange={(e) =>
                                            updateIssue(
                                                issueIndex,
                                                "issue_additional_info",
                                                e.target.value
                                            )
                                        }
                                        rows={2}
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Label>Pasos para Reproducir</Label>
                                    {issue.issue_steps_to_reproduce.map(
                                        (step, stepIndex) => (
                                            <StepContainer key={stepIndex}>
                                                <Input
                                                    type="text"
                                                    value={step}
                                                    onChange={(e) =>
                                                        updateSteps(
                                                            issueIndex,
                                                            stepIndex,
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder={`Paso ${
                                                        stepIndex + 1
                                                    }`}
                                                />
                                                <RemoveButton
                                                    type="button"
                                                    onClick={() =>
                                                        removeStep(
                                                            issueIndex,
                                                            stepIndex
                                                        )
                                                    }
                                                >
                                                    -
                                                </RemoveButton>
                                            </StepContainer>
                                        )
                                    )}
                                    <AddButton
                                        type="button"
                                        onClick={() => addStep(issueIndex)}
                                    >
                                        Agregar Paso
                                    </AddButton>
                                </FormGroup>

                                <FormGroup>
                                    <Label>Entorno</Label>
                                    <Input
                                        type="text"
                                        value={issue.issue_environment}
                                        onChange={(e) =>
                                            updateIssue(
                                                issueIndex,
                                                "issue_environment",
                                                e.target.value
                                            )
                                        }
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Label>Notas Adicionales</Label>
                                    <TextArea
                                        value={issue.issue_additional_notes}
                                        onChange={(e) =>
                                            updateIssue(
                                                issueIndex,
                                                "issue_additional_notes",
                                                e.target.value
                                            )
                                        }
                                        rows={2}
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Label>Imágenes del Problema</Label>
                                    <FileInput
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={(e) =>
                                            handleImageUpload(
                                                issueIndex,
                                                e.target.files
                                            )
                                        }
                                        disabled={
                                            uploadingImages[
                                                issueIndex.toString()
                                            ]
                                        }
                                    />
                                    {uploadingImages[issueIndex.toString()] && (
                                        <UploadingText>
                                            Subiendo imágenes...
                                        </UploadingText>
                                    )}
                                    {issue.issue_screenshots.length > 0 && (
                                        <ImagePreviewContainer>
                                            {issue.issue_screenshots.map(
                                                (url, imageIndex) => (
                                                    <ImagePreview
                                                        key={imageIndex}
                                                    >
                                                        <img
                                                            src={
                                                                "http://localhost:3000" +
                                                                url
                                                            }
                                                            alt={`Preview ${
                                                                imageIndex + 1
                                                            }`}
                                                        />
                                                        <RemoveImageButton
                                                            type="button"
                                                            onClick={() =>
                                                                removeImage(
                                                                    issueIndex,
                                                                    imageIndex
                                                                )
                                                            }
                                                        >
                                                            ×
                                                        </RemoveImageButton>
                                                    </ImagePreview>
                                                )
                                            )}
                                        </ImagePreviewContainer>
                                    )}
                                </FormGroup>
                            </IssueCard>
                        ))}
                    </TabContent>
                )}

                {/* Tab 3: Cliente */}
                {activeTab === 3 && (
                    <GridContainer>
                        <FormGroup>
                            <Label>Nombre del Cliente</Label>
                            <Input
                                type="text"
                                value={formData.customer_data.customer_name}
                                onChange={(e) =>
                                    updateFormData(
                                        "customer_data",
                                        "customer_name",
                                        e.target.value
                                    )
                                }
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Email</Label>
                            <Input
                                type="email"
                                value={formData.customer_data.customer_email}
                                onChange={(e) =>
                                    updateFormData(
                                        "customer_data",
                                        "customer_email",
                                        e.target.value
                                    )
                                }
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Teléfono</Label>
                            <Input
                                type="tel"
                                value={formData.customer_data.customer_phone}
                                onChange={(e) =>
                                    updateFormData(
                                        "customer_data",
                                        "customer_phone",
                                        e.target.value
                                    )
                                }
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Dirección</Label>
                            <Input
                                type="text"
                                value={formData.customer_data.customer_address}
                                onChange={(e) =>
                                    updateFormData(
                                        "customer_data",
                                        "customer_address",
                                        e.target.value
                                    )
                                }
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Ciudad</Label>
                            <Input
                                type="text"
                                value={formData.customer_data.customer_city}
                                onChange={(e) =>
                                    updateFormData(
                                        "customer_data",
                                        "customer_city",
                                        e.target.value
                                    )
                                }
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>País</Label>
                            <Input
                                type="text"
                                value={formData.customer_data.customer_country}
                                onChange={(e) =>
                                    updateFormData(
                                        "customer_data",
                                        "customer_country",
                                        e.target.value
                                    )
                                }
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Tipo de Cliente</Label>
                            <Select
                                value={formData.customer_data.customer_type}
                                onChange={(e) =>
                                    updateFormData(
                                        "customer_data",
                                        "customer_type",
                                        e.target.value
                                    )
                                }
                            >
                                <option value="individual">Individual</option>
                                <option value="business">Empresa</option>
                            </Select>
                        </FormGroup>
                        <FormGroup>
                            <Label>Contacto Preferido</Label>
                            <Select
                                value={formData.customer_data.preferred_contact}
                                onChange={(e) =>
                                    updateFormData(
                                        "customer_data",
                                        "preferred_contact",
                                        e.target.value
                                    )
                                }
                            >
                                <option value="phone">Teléfono</option>
                                <option value="email">Email</option>
                            </Select>
                        </FormGroup>
                    </GridContainer>
                )}

                {/* Tab 4: Costos */}
                {activeTab === 4 && (
                    <GridContainer>
                        <FormGroup>
                            <Label>Costo Estimado</Label>
                            <Input
                                type="number"
                                step="0.01"
                                value={formData.cost_info.estimated_cost}
                                onChange={(e) =>
                                    updateFormData(
                                        "cost_info",
                                        "estimated_cost",
                                        Number(e.target.value)
                                    )
                                }
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Costo de Mano de Obra</Label>
                            <Input
                                type="number"
                                step="0.01"
                                value={formData.cost_info.labor_cost}
                                onChange={(e) =>
                                    updateFormData(
                                        "cost_info",
                                        "labor_cost",
                                        Number(e.target.value)
                                    )
                                }
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Costo de Partes</Label>
                            <Input
                                type="number"
                                step="0.01"
                                value={formData.cost_info.parts_cost}
                                onChange={(e) =>
                                    updateFormData(
                                        "cost_info",
                                        "parts_cost",
                                        Number(e.target.value)
                                    )
                                }
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Moneda</Label>
                            <Select
                                value={formData.cost_info.currency}
                                onChange={(e) =>
                                    updateFormData(
                                        "cost_info",
                                        "currency",
                                        e.target.value
                                    )
                                }
                            >
                                <option value="USD">USD</option>
                                <option value="EUR">EUR</option>
                                <option value="MXN">MXN</option>
                            </Select>
                        </FormGroup>
                    </GridContainer>
                )}

                {/* Tab 5: Cronograma */}
                {activeTab === 5 && (
                    <GridContainer>
                        <FormGroup>
                            <Label>Fecha Estimada de Finalización</Label>
                            <Input
                                type="date"
                                value={formData.timeline.estimated_completion}
                                onChange={(e) =>
                                    updateFormData(
                                        "timeline",
                                        "estimated_completion",
                                        e.target.value
                                    )
                                }
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Horas Estimadas</Label>
                            <Input
                                type="number"
                                value={formData.timeline.estimated_hours}
                                onChange={(e) =>
                                    updateFormData(
                                        "timeline",
                                        "estimated_hours",
                                        Number(e.target.value)
                                    )
                                }
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label>Fecha Límite SLA</Label>
                            <Input
                                type="date"
                                value={formData.timeline.sla_deadline}
                                onChange={(e) =>
                                    updateFormData(
                                        "timeline",
                                        "sla_deadline",
                                        e.target.value
                                    )
                                }
                            />
                        </FormGroup>
                    </GridContainer>
                )}

                <NavigationContainer>
                    <PrevButton
                        type="button"
                        onClick={() => setActiveTab(Math.max(0, activeTab - 1))}
                        disabled={activeTab === 0}
                    >
                        Anterior
                    </PrevButton>

                    {activeTab < tabs.length - 1 ? (
                        <NextButton
                            type="button"
                            onClick={() =>
                                setActiveTab(
                                    Math.min(tabs.length - 1, activeTab + 1)
                                )
                            }
                        >
                            Siguiente
                        </NextButton>
                    ) : (
                        <SubmitButton type="submit" disabled={isLoading}>
                            {isLoading ? "Creando..." : "Crear Orden"}
                        </SubmitButton>
                    )}
                </NavigationContainer>
            </form>
        </>
    );
};

// Styled Components
const Container = styled.div`
    max-width: 64rem;
    margin: 0 auto;
    padding: 1.5rem;
    background: white;
    border-radius: 0.5rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1.5rem;
    color: #1f2937;
`;

const TabsContainer = styled.div`
    border-bottom: 1px solid #e5e7eb;
    margin-bottom: 1.5rem;
`;

const TabsNav = styled.nav`
    display: flex;
    gap: 2rem;
`;

const TabButton = styled.button<{ $active: boolean }>`
    padding: 0.5rem 0.25rem;
    border-bottom: 2px solid
        ${(props) => (props.$active ? "#3b82f6" : "transparent")};
    font-weight: 500;
    font-size: 0.875rem;
    color: ${(props) => (props.$active ? "#2563eb" : "#6b7280")};
    background: none;
    border-top: none;
    border-left: none;
    border-right: none;
    cursor: pointer;
    transition: color 0.2s;

    &:hover {
        color: ${(props) => (props.$active ? "#2563eb" : "#374151")};
    }
`;

const TabContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
`;

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
`;

const Label = styled.label`
    display: block;
    font-size: 0.875rem;
    font-weight: 500;
    color: #374151;
    margin-bottom: 0.25rem;
`;

const Input = styled.input`
    width: 100%;
    padding: 0.5rem 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

    &:focus {
        outline: none;
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
`;

const TextArea = styled.textarea`
    width: 100%;
    padding: 0.5rem 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    resize: vertical;

    &:focus {
        outline: none;
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
`;

const Select = styled.select`
    width: 100%;
    padding: 0.5rem 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    background: white;

    &:focus {
        outline: none;
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
`;

const StepContainer = styled.div`
    display: flex;
    gap: 0.5rem;
    margin-top: 0.5rem;
`;

const RemoveButton = styled.button`
    padding: 0.5rem 0.75rem;
    background: #ef4444;
    color: white;
    border: none;
    border-radius: 0.375rem;
    cursor: pointer;

    &:hover {
        background: #dc2626;
    }
`;

const AddButton = styled.button`
    margin-top: 0.5rem;
    padding: 0.5rem 1rem;
    background: #3b82f6;
    color: white;
    border: none;
    border-radius: 0.375rem;
    cursor: pointer;

    &:hover {
        background: #2563eb;
    }
`;

const NavigationContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
`;

const PrevButton = styled.button`
    padding: 0.5rem 1rem;
    background: #d1d5db;
    color: #374151;
    border: none;
    border-radius: 0.375rem;
    cursor: pointer;

    &:hover:not(:disabled) {
        background: #9ca3af;
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

const NextButton = styled.button`
    padding: 0.5rem 1rem;
    background: #3b82f6;
    color: white;
    border: none;
    border-radius: 0.375rem;
    cursor: pointer;

    &:hover {
        background: #2563eb;
    }
`;

const SubmitButton = styled.button`
    padding: 0.5rem 1.5rem;
    background: #10b981;
    color: white;
    border: none;
    border-radius: 0.375rem;
    cursor: pointer;

    &:hover:not(:disabled) {
        background: #059669;
    }

    &:disabled {
        background: #9ca3af;
        cursor: not-allowed;
    }
`;

const IssuesHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
`;

const IssueCard = styled.div`
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    background: #f9fafb;
`;

const IssueHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
`;

const IssueTitle = styled.h3`
    font-size: 1.125rem;
    font-weight: 600;
    color: #374151;
    margin: 0;
`;

const FileInput = styled.input`
    width: 100%;
    padding: 0.5rem 0.75rem;
    border: 2px dashed #d1d5db;
    border-radius: 0.375rem;
    background: white;
    cursor: pointer;

    &:hover:not(:disabled) {
        border-color: #3b82f6;
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

const ImagePreviewContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 0.5rem;
    margin-top: 0.5rem;
`;

const ImagePreview = styled.div`
    position: relative;
    width: 100px;
    height: 100px;
    border-radius: 0.375rem;
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const RemoveImageButton = styled.button`
    position: absolute;
    top: 0.25rem;
    right: 0.25rem;
    width: 1.5rem;
    height: 1.5rem;
    background: rgba(239, 68, 68, 0.9);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;

    &:hover {
        background: #dc2626;
    }
`;

const UploadingText = styled.p`
    color: #3b82f6;
    font-size: 0.875rem;
    margin-top: 0.5rem;
    font-style: italic;
`;

export default NewOrdenComponent;
