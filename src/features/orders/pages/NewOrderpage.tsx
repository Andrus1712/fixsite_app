import { Box, Button, Container, FormTabs, Modal, useToast } from "../../../shared/components";
import { useCreateOrderMutation } from "../services/orderApi";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormTabService } from "../components/FromTabService";
import { FormTabCustomer } from "../components/FormTabCustomer";
import { FormTabDevice } from "../components/FormTabDevice";
import { FormTabIssues } from "../components/FormTabIssues";
import { FormTabResumeAlt } from "../components/FormTabResumeAlt";
import { FormTabNotes } from "../components/FormTabNotes";
import { useState, useRef } from "react";
import type { FormTabsRef } from "../../../shared/components/Forms/FormTabs";
import { useNavigate } from "react-router";
import { useAlert } from "../../../shared/components/AlertModal";
import { OrderSchema, type OrderFormData } from "../schemas";

export default function NewOrderpage() {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const formTabsRef = useRef<FormTabsRef>(null);

    const methods = useForm<OrderFormData>({
        resolver: zodResolver(OrderSchema),
        defaultValues: {
            // 3. Establece valores por defecto para evitar undefined en campos anidados
            serviceType: 1,
            description: "Servicio de prueba",
            device_data: {
                device_name: "Apple iPhone 17 Pro Max",
                device_type: 1,
                device_brand: 1,
                device_model: 2,
                serial_number: "SM-5928B/DS",
                imei: "355767777661175",
                color: "",
                storage_capacity: "",
            },
            issues: [
                {
                    issue_name: "Problema de ejemplo",
                    issue_description: "dsdasd",
                    issue_type: 1,
                    issue_severity: 1,
                    issue_code: 3,
                    issue_additional_info: "",
                    issue_steps_to_reproduce: ["sadsadassadsa"],
                    issue_environment: "",
                    issue_additional_notes: "",
                    issue_files: [
                        {
                            filename: "1768344587980-466906072.jpg",
                            originalName: "1271131.jpg",
                            size: 104506,
                            url: "/uploads/images/1768344587980-466906072.jpg",
                        },
                    ],
                },
            ],
            customer_data: {
                customer_id: 8,
                customer_name: "Andres Calderon",
                customer_email: "correo@gmail.com",
                customer_phone: "3176655323",
                customer_address: "Direccion",
                customer_type: "individual", // Ejemplo de default para enum
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
            notes: [{
                content: "Nota de prueba",
                type: "INTERNAL",
            }],
        },
    });
    const { handleSubmit, watch, setValue } = methods;

    const formData = watch();

    const { showError } = useToast();
    const { showSuccess, closeAlert } = useAlert();
    const navigator = useNavigate();

    const updateField = (field: string, value: any) => {
        setValue(field as any, value);
    };

    const onSubmit = async () => {
        try {
            const payload = await createOrder(formData).unwrap();
            if (payload.success) {
                showSuccess("Orden Creada", `Se ha creado la orden N° ${payload.data?.order_code || "nueva"}`, [
                    {
                        label: "Ir al registro",
                        variant: "outline",
                        onClick: () => {
                            navigator(`/app/order/${payload.data?.order_code}/details`, {
                                state: { orderData: payload.data },
                            });
                            closeAlert();
                        },
                    },
                    {
                        label: "Ingresar otro",
                        variant: "primary",
                        onClick: () => {
                            methods.reset();
                            formTabsRef.current?.resetToFirstTab();
                            closeAlert();
                        },
                    },
                ]);
            } else {
                showError(payload.errors, payload.message);
            }

            setIsFormOpen(false);
        } catch (error) {
            console.error("Error creating order:", error);
            showError("Error al crear la orden. Por favor, intenta de nuevo.", "Error");
            setIsFormOpen(false);
        }
    };

    const onPreviewFormData = () => {
        setIsFormOpen(true);
    };

    const [createOrder, { isLoading, error }] = useCreateOrderMutation();

    const tabs = [
        {
            label: "Servicio",
            content: <FormTabService formData={formData} updateField={updateField} />,
            validationFields: ["serviceType", "description"],
        },
        {
            label: "Cliente",
            content: <FormTabCustomer formData={formData} updateField={updateField} />,
            validationFields: ["customer_data.customer_id"],
        },
        {
            label: "Dispositivo",
            content: <FormTabDevice formData={formData} updateField={updateField} />,
            validationFields: [
                "device_data.device_name",
                "device_data.device_type",
                "device_data.device_brand",
                "device_data.device_model",
            ],
        },
        {
            label: "Falla",
            content: <FormTabIssues formData={formData} updateField={updateField} />,
            validationFields: ["issues"],
        },
        {
            label: "Notas",
            content: <FormTabNotes formData={formData} updateField={updateField} />,
        },
    ];

    return (
        <Container className="container" center size="xl" padding={"lg"}>
            <Box p="lg" bg="white" rounded shadow>
                <FormProvider {...methods}>
                    <FormTabs
                        ref={formTabsRef}
                        tabs={tabs}
                        onSubmit={onPreviewFormData}
                        submitLabel="Crear Orden"
                        loading={isLoading}
                    />
                </FormProvider>
            </Box>
            <pre>{JSON.stringify(formData, null, 2)}</pre>
            <Modal
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                // title="Crear Nuevo Cliente"
                size="lg"
                footer={
                    <>
                        <Button variant="outline" onClick={() => setIsFormOpen(false)}>
                            Cancelar
                        </Button>
                        <Button onClick={handleSubmit(onSubmit)}>Guardar</Button>
                    </>
                }
            >
                <FormTabResumeAlt formData={formData} />
            </Modal>
        </Container>
    );
}
