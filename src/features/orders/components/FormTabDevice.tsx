import { useState } from "react";
import {
    Divider,
    FormGroup,
    Grid,
    Input,
    Label,
    Row,
    SearchableSelect,
    Switch,
    ColorPicker,
    Select,
    MultiSelect,
    TextArea,
} from "../../../shared/components";
import PatternLock from "../../../shared/components/PatternLock";
import { useFormContext } from "react-hook-form";
import {
    useGetDeviceTypesQuery,
    useGetDeviceBrandsQuery,
    useGetDeviceModelsAllQuery,
    useGetPasswordTypesQuery,
} from "../services/infoDevicesApi";

interface FormProps {
    formData: any;
    updateField: (field: string, value: any) => void;
}

export const FormTabDevice = ({ formData, updateField }: FormProps) => {
    const {
        formState: { errors },
    } = useFormContext();
    const [passwordPattern, setPasswordPattern] = useState("");

    // API queries
    const { data: deviceTypes } = useGetDeviceTypesQuery();

    const { data: deviceBrands } = useGetDeviceBrandsQuery();
    const { data: deviceModels, refetch } = useGetDeviceModelsAllQuery(
        {
            brandId: formData.device_data?.device_brand,
            typeId: formData.device_data?.device_type,
        },
        {
            skip: !formData.device_data?.device_brand || !formData.device_data?.device_type,
        }
    );
    // Limpiar modelos cuando no hay brand o type seleccionado
    const availableModels =
        formData.device_data?.device_brand && formData.device_data?.device_type ? deviceModels?.data || [] : [];
    const { data: passwordTypes } = useGetPasswordTypesQuery();

    const handlePatternComplete = (patternSequence: any) => {
        console.log("Patrón Finalizado:", patternSequence);
        setPasswordPattern(patternSequence); // Guarda el patrón en el estado del formulario
    };

    return (
        <div>
            <Row $align="center" $justify="flex-start" fullWidth $gap={"lg"} className="row">
                <FormGroup fullWidth title="Identificacion del equipo">
                    <Grid columns={3}>
                        <div>
                            <Label>Tipo de Dispositivo</Label>
                            <SearchableSelect
                                fullWidth
                                value={formData.device_data?.device_type > 0 ? formData.device_data?.device_type : null}
                                onChange={(value) => {
                                    updateField("device_data.device_type", value);
                                    updateField("device_data.device_brand", "");
                                    updateField("device_data.device_model", "");
                                    updateField("device_data.device_name", "");
                                }}
                                options={
                                    deviceTypes?.data?.map((type: any) => ({
                                        value: type.id,
                                        label: type.name,
                                    })) || []
                                }
                                placeholder="Seleccionar tipo de dispositivo"
                                error={errors.device_data?.device_type?.message}
                            />
                        </div>
                        <div>
                            <Label>Marca</Label>
                            <SearchableSelect
                                fullWidth
                                value={
                                    formData.device_data?.device_brand > 0 ? formData.device_data?.device_brand : null
                                }
                                onChange={(value) => {
                                    updateField("device_data.device_brand", value);
                                    updateField("device_data.device_model", "");
                                    updateField("device_data.device_name", "");
                                }}
                                options={
                                    deviceBrands?.data?.map((brand: any) => ({
                                        value: brand.id,
                                        label: brand.name,
                                    })) || []
                                }
                                placeholder="Seleccionar marca"
                                error={errors.device_data?.device_brand?.message}
                            />
                        </div>
                        <div>
                            <Label>Modelo</Label>
                            <SearchableSelect
                                fullWidth
                                value={
                                    formData.device_data?.device_model > 0 ? formData.device_data?.device_model : null
                                }
                                onChange={(value) => {
                                    updateField("device_data.device_model", value);
                                    if (value) {
                                        let InfoModel = availableModels.filter((model: any) => model.id === value)[0];
                                        updateField(
                                            "device_data.device_name",
                                            `${InfoModel.deviceBrand.name} ${InfoModel.name}`
                                        );
                                    } else {
                                        updateField("device_data.device_name", "");
                                    }
                                }}
                                options={
                                    availableModels.map((model: any) => ({
                                        value: model.id,
                                        label: model.name,
                                    })) || []
                                }
                                placeholder={
                                    !formData.device_data?.device_brand || !formData.device_data?.device_type
                                        ? "Selecciona tipo y marca primero"
                                        : "Seleccionar modelo"
                                }
                                error={errors.device_data?.device_model?.message}
                            />
                        </div>
                        <div>
                            <Label>Nombre del dispositivo</Label>
                            <Input
                                type="text"
                                value={formData.device_data?.device_name || ""}
                                disabled
                                error={errors.device_data?.device_name?.message}
                            />
                        </div>
                    </Grid>
                </FormGroup>
            </Row>
            <Divider width={0} />
            <Row $align="center" $justify="flex-start" fullWidth $gap={"lg"} className="row">
                <FormGroup fullWidth title="Detalles técnicos">
                    <Grid columns={3}>
                        <div>
                            <Label>Número de Serie</Label>
                            <Input
                                type="text"
                                value={formData.device_data?.serial_number || ""}
                                onChange={(e) => updateField("device_data.serial_number", e.target.value)}
                            />
                        </div>
                        <div>
                            <Label>IMEI</Label>
                            <Input
                                type="text"
                                value={formData.device_data?.imei || ""}
                                onChange={(e) => updateField("device_data.imei", e.target.value)}
                            />
                        </div>
                        <div>
                            <ColorPicker
                                label="Color"
                                value={formData.device_data?.color}
                                onChange={(value) => updateField("device_data.color", value)}
                            />
                        </div>
                        <div>
                            <Label>Almacenamiento</Label>
                            <Select
                                value={formData.device_data?.storage}
                                onChange={(e) => updateField("device_data.storage", e.target.value)}
                                options={[
                                    { value: "16GB", label: "16 GB" },
                                    { value: "32GB", label: "32 GB" },
                                    { value: "64GB", label: "64 GB" },
                                    { value: "128GB", label: "128 GB" },
                                    { value: "256GB", label: "256 GB" },
                                    { value: "512GB", label: "512 GB" },
                                    { value: "1TB", label: "1 TB" },
                                    { value: "2TB", label: "2 TB" },
                                ]}
                                placeholder="Seleccionar almacenamiento"
                            />
                        </div>
                        <div>
                            <Label>Accesorios</Label>
                            <MultiSelect
                                value={formData.device_data?.accessories || []}
                                onChange={(values) => updateField("device_data.accessories", values)}
                                options={[
                                    { value: "cargador", label: "Cargador" },
                                    { value: "audifonos", label: "Audífonos" },
                                    { value: "cargador-inalambrico", label: "Cargador Inalámbrico" },
                                    { value: "powerbank", label: "PowerBank" },
                                    { value: "funda", label: "Funda" },
                                    { value: "protector-pantalla", label: "Protector de Pantalla" },
                                    { value: "cable-usb", label: "Cable USB" },
                                    { value: "adaptador", label: "Adaptador" },
                                    { value: "soporte", label: "Soporte" },
                                    { value: "otros", label: "Otros" },
                                ]}
                                placeholder="Seleccionar accesorios"
                            />
                        </div>
                        <div>
                            <Label>Condición Física</Label>
                            <Select
                                value={formData.device_data?.physical_condition}
                                onChange={(e) => updateField("device_data.physical_condition", e.target.value)}
                                options={[
                                    { value: "excelente", label: "Excelente" },
                                    { value: "buena", label: "Buena" },
                                    { value: "regular", label: "Regular" },
                                    { value: "mala", label: "Mala" },
                                ]}
                                placeholder="Seleccionar condición"
                            />
                        </div>
                        <div>
                            <Label>Nivel de Batería</Label>
                            <Select
                                value={formData.device_data?.battery_level}
                                onChange={(e) => updateField("device_data.battery_level", e.target.value)}
                                options={[
                                    { value: "0-25", label: "0-25%" },
                                    { value: "26-50", label: "26-50%" },
                                    { value: "51-75", label: "51-75%" },
                                    { value: "76-100", label: "76-100%" },
                                ]}
                                placeholder="Seleccionar nivel de batería"
                            />
                        </div>
                        <div>
                            <Label>Garantía Vigente</Label>
                            <Switch
                                checked={formData.device_data?.warranty_active || false}
                                onChange={(checked) => updateField("device_data.warranty_active", checked)}
                            />
                        </div>
                        <div style={{ gridColumn: "span 3" }}>
                            <Label>Observaciones</Label>
                            <TextArea
                                value={formData.device_data?.observations || ""}
                                onChange={(e) => updateField("device_data.observations", e.target.value)}
                                placeholder="Observaciones adicionales sobre el dispositivo..."
                                rows={3}
                            />
                        </div>
                    </Grid>
                </FormGroup>
            </Row>
            <Divider width={0} />
            <Row $align="center" $justify="flex-start" fullWidth $gap={"lg"} className="row">
                <FormGroup fullWidth title="Seguridad y Acceso">
                    <div>
                        <Label>Autorizar contraseña</Label>
                        <Switch
                            checked={formData.device_data?.password_authorized || false}
                            onChange={(e) => {
                                const checked = e.target.checked;
                                updateField("device_data.password_authorized", checked);
                                if (!checked) {
                                    updateField("device_data.password_type", null);
                                    updateField("device_data.password_value", "");
                                    updateField("device_data.backup_password", "");
                                }
                            }}
                        />
                    </div>

                    {formData.device_data?.password_authorized && (
                        <>
                            <div>
                                <Label>Tipo de contraseña</Label>
                                <SearchableSelect
                                    value={formData.device_data?.password_type}
                                    onChange={(value) => updateField("device_data.password_type", value)}
                                    options={
                                        passwordTypes?.data?.map((type: any) => ({
                                            value: type.id,
                                            label: type.name,
                                        })) || []
                                    }
                                    placeholder="Seleccionar tipo de contraseña"
                                />
                            </div>

                            {/* Mostrar campo Valor para Pin y Contraseña */}
                            {(formData.device_data?.password_type === 1 ||
                                formData.device_data?.password_type === 3) && (
                                <div>
                                    <Label>Valor</Label>
                                    <Input
                                        type={formData.device_data?.password_type === 1 ? "number" : "text"}
                                        value={formData.device_data?.password_value || ""}
                                        onChange={(e) => updateField("device_data.password_value", e.target.value)}
                                        placeholder={
                                            formData.device_data?.password_type === 1
                                                ? "Ingrese PIN"
                                                : "Ingrese contraseña"
                                        }
                                    />
                                </div>
                            )}

                            {/* Mostrar PatternLock para Patrón */}
                            {formData.device_data?.password_type === 2 && (
                                <div>
                                    <Label>Patrón</Label>
                                    <PatternLock
                                        initialPattern={passwordPattern}
                                        onPatternComplete={(pattern) => {
                                            handlePatternComplete(pattern);
                                            updateField("device_data.password_value", pattern);
                                        }}
                                    />
                                </div>
                            )}

                            {/* Campo contraseña de respaldo para Patrón */}
                            {formData.device_data?.password_type === 2 && (
                                <div>
                                    <Label>Contraseña de Respaldo</Label>
                                    <Input
                                        type="text"
                                        value={formData.device_data?.backup_password || ""}
                                        onChange={(e) => updateField("device_data.backup_password", e.target.value)}
                                        placeholder="Contraseña de respaldo"
                                    />
                                </div>
                            )}
                        </>
                    )}
                </FormGroup>
            </Row>
        </div>
    );
};
