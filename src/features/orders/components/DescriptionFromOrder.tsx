import { FormGroup, Label, Select, TextArea } from "../../../shared/components";

interface FormProps {
    formData: any;
    updateField: (field: string, value: any) => void;
}

export const DescriptionFromOrder = ({ formData, updateField }: FormProps) => {
    return (
        <>
            <FormGroup>
                <Label>Descripción</Label>
                <TextArea
                    value={formData.description}
                    onChange={(e) => updateField("description", e.target.value)}
                    rows={3}
                />
            </FormGroup>
            <FormGroup>
                <Label>Prioridad</Label>
                <Select
                    value={formData.priority}
                    onChange={(e) => updateField("priority", Number(e.target.value))}
                    options={[
                        { value: 1, label: "Baja" },
                        { value: 2, label: "Media" },
                        { value: 3, label: "Alta" },
                    ]}
                />
            </FormGroup>
        </>
    );
};
