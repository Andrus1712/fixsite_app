import { useState } from "react";
import { Column, Divider, FormGroup, Input, Label, Row, Select, Switch } from "../../../shared/components";
import PatternLock from "../../../shared/components/PatternLock";

interface FormProps {
    formData: any;
    updateField: (field: string, value: any) => void;
}

export const FormTabDevice = ({ formData, updateField }: FormProps) => {
    const [passwordPattern, setPasswordPattern] = useState("");

    const handlePatternComplete = (patternSequence: any) => {
        console.log("Patrón Finalizado:", patternSequence);
        setPasswordPattern(patternSequence); // Guarda el patrón en el estado del formulario
    };
    return (
        <div>
            <Row $align="center" $justify="flex-start" fullWidth $gap={"lg"} className="row">
                <FormGroup fullWidth>
                    <Label>Tipo de Dispositivo</Label>
                    <Select
                        fullWidth
                        value={formData.device_data?.device_type}
                        onChange={(e) => updateField("device_data.device_type", Number(e.target.value))}
                        options={[
                            { value: 1, label: "Smartphone" },
                            { value: 2, label: "Laptop" },
                            { value: 3, label: "Tablet" },
                            { value: 4, label: "Smartwatch" },
                        ]}
                    />
                </FormGroup>
                <FormGroup fullWidth>
                    <Label>Marca</Label>
                    <Select
                        fullWidth
                        value={formData.device_data?.device_brand}
                        onChange={(e) => updateField("device_data.device_brand", Number(e.target.value))}
                        options={[
                            { value: 1, label: "Apple" },
                            { value: 2, label: "Lenovo" },
                            { value: 3, label: "Samsung" },
                            { value: 4, label: "Xiaomi" },
                        ]}
                    />
                </FormGroup>
                <FormGroup fullWidth>
                    <Label>Modelo</Label>
                    <Select
                        options={[
                            { value: 1, label: "Iphone 14" },
                            { value: 2, label: "Iphone 14 pro max" },
                            { value: 3, label: "Iphone 14 pro" },
                            { value: 4, label: "Iphone 12" },
                        ]}
                    />
                </FormGroup>
            </Row>
            <Divider width={0} />
            <Row $align="center" $justify="flex-start" fullWidth $gap={"lg"} className="row">
                <FormGroup fullWidth>
                    <Label>Número de Serie</Label>
                    <Input 
                        type="text" 
                        value={formData.device_data?.serial_number || ""}
                        onChange={(e) => updateField("device_data.serial_number", e.target.value)}
                    />
                </FormGroup>
                <FormGroup fullWidth>
                    <Label>IMEI</Label>
                    <Input 
                        type="text" 
                        value={formData.device_data?.imei || ""}
                        onChange={(e) => updateField("device_data.imei", e.target.value)}
                    />
                </FormGroup>
            </Row>
            <Divider width={0} />
            <FormGroup fullWidth>
                <Label>Autorizar contraseña</Label>
                <Switch checked={true} />
            </FormGroup>
            <Divider width={0} />
            <Column align="flex-start" justify="flex-start" gap={"lg"} className="row">
                <FormGroup>
                    <Label>Tipo de contraseña</Label>
                    <Select
                        options={[
                            { value: 1, label: "Pin" },
                            { value: 2, label: "Patron" },
                            { value: 3, label: "Contraseña" },
                        ]}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Valor</Label>
                    <Input type="text" />
                    <PatternLock initialPattern={passwordPattern} onPatternComplete={handlePatternComplete} />
                </FormGroup>
            </Column>
        </div>
    );
};
