import { useState } from "react";
import { Card, Column, Flex, FormGroup, Input, Label, Radio, Select, Text, TextArea } from "../../../shared/components";
import { FaScrewdriverWrench } from "react-icons/fa6";
import { useTheme } from "styled-components";
import { MdCleaningServices } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { useFormContext, type FieldErrors } from "react-hook-form";

interface FormProps {
    formData: any;
    updateField: (field: string, value: any) => void;
}

export const FormTabService = ({ formData, updateField }: FormProps) => {
    const {
        formState: { errors },
        trigger,
    } = useFormContext();
    const [optionChecked, setOptionChecked] = useState<number | null>(formData.serviceType);

    const handleOptionChange = async (optionSelected: any) => {
        // Lógica corregida para selección única (Radio Button):

        if (optionChecked === optionSelected.id) {
            // Si el mismo ID está seleccionado, lo deselecciona.
            setOptionChecked(null);
            // Opcional: Actualizar el formulario padre si es necesario
            updateField("serviceType", null);
            updateField("description", null);
        } else {
            // Si es un ID diferente (o nada seleccionado), selecciona el nuevo ID.
            setOptionChecked(optionSelected.id);
            // Opcional: Actualizar el formulario padre con el ID
            updateField("serviceType", optionSelected.id);
            updateField("description", optionSelected.description);
        }
        await trigger(["serviceType"]);
    };

    const options = [
        {
            id: 1,
            label: "Reparación",
            icon: FaScrewdriverWrench,
            description: "Arreglo de componentes o fallas especificas.",
        },
        {
            id: 2,
            label: "Diágnostico",
            icon: FaSearch,
            description: "Analisis para identificar el problema del equipo.",
        },
        {
            id: 3,
            label: "Mantenimiento",
            icon: MdCleaningServices,
            description: "Limpieza y optimización preventiva del sistema.",
        },
    ];

    const theme = useTheme();
    return (
        <FormGroup title="Tipo de servicio" description="selecciona el tipo de servicio que deseas ingresar">
            <Flex direction="row" align="center" justify="center" className={"formGroup"} wrap="wrap">
                {options.map((option) => {
                    const IconComponent = option.icon;
                    const isChecked = optionChecked === option.id;

                    return (
                        <Card
                            key={option.id}
                            onClick={() => handleOptionChange(option)}
                            variant={isChecked ? "selected" : "outlined"}
                            size="xs"
                        >
                            <Radio checked={isChecked} style={{ pointerEvents: "none" }} />

                            <Column align="center" gap={"md"}>
                                <IconComponent
                                    size={theme.fontSize["4xl"]}
                                    color={isChecked ? theme.colors.borderFocus : theme.colors.gray800}
                                />
                                <Column align="center" gap={"xs"}>
                                    <Text
                                        weight="semibold"
                                        variant="body1"
                                        align="center"
                                        color={isChecked ? "info" : "black"}
                                    >
                                        {option.label}
                                    </Text>
                                    <Text variant="caption" align="center">
                                        {option.description}
                                    </Text>
                                </Column>
                            </Column>
                        </Card>
                    );
                })}
            </Flex>
            {errors.serviceType ? (
                <Text variant="caption" color="error" align="center">
                    *{errors.serviceType.message}
                </Text>
            ) : null}
        </FormGroup>
    );
};
