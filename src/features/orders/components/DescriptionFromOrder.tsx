import { FormGroup, Label, Select, TextArea } from "../../../shared/components";

export const DescriptionFromOrder = (formData: any) => {
    return (
        <>
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
        </>
    );
};
