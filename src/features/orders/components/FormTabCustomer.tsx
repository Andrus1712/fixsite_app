import { useState } from "react";
import { Button, Column, FormGroup, Modal, Row, Text } from "../../../shared/components";
import SearchInput from "../../../shared/components/SearchInput";
import { IoMdPersonAdd } from "react-icons/io";
import { FaTrash } from "react-icons/fa";
import { useFormContext } from "react-hook-form";
import IconButton from "../../../shared/components/Buttons/IconButton";

interface FormProps {
    formData: any;
    updateField: (field: string, value: any) => void;
}

export const FormTabCustomer = ({ formData, updateField }: FormProps) => {
    const {
        formState: { errors },
        trigger,
    } = useFormContext();

    const [searchValue, setSearchValue] = useState<string>("");
    const [isFormOpen, setIsFormOpen] = useState(false);

    const hasSelectedCustomer = !!(formData.customer_data.customer_id && formData.customer_data.customer_id > 0);

    const handleSearch = async (query: string) => {
        // Simula la llamada al servidor

        return [
            {
                id: 1,
                name: "Andres Calderon",
                label: (
                    <Row $align="center" $justify="flex-start">
                        <Column gap={"xs"}>
                            <Text weight="semibold" variant="body1">
                                Andres Calderon Upegui
                            </Text>
                            <Text weight="normal" variant="caption">
                                acaldup@gmail.com
                            </Text>
                            <Text weight="normal" variant="caption">
                                +57 3177765722
                            </Text>
                        </Column>
                    </Row>
                ),
            },
            {
                id: 2,
                name: "Pedro Guillermo",
                label: (
                    <Row $align="center" $justify="flex-start">
                        <Column gap={"xs"}>
                            <Text weight="semibold" variant="body1">
                                pedro Gillermo
                            </Text>
                            <Text weight="normal" variant="caption">
                                pguille@gmail.com
                            </Text>
                            <Text weight="normal" variant="caption">
                                +57 3102344321
                            </Text>
                        </Column>
                    </Row>
                ),
            },
        ];
    };

    const handleSelectCustomer = (customer: any) => {
        updateField("customer_data.customer_id", customer.id);
        updateField("customer_data.customer_name", customer.name);
        updateField("customer_data.customer_email", "acaldup@gmail.com");
        updateField("customer_data.customer_phone", "+57 3177765722");
        updateField("customer_data.customer_address", "");
        updateField("customer_data.customer_city", "");
        updateField("customer_data.customer_country", "");
        updateField("customer_data.customer_type", "individual");
        updateField("customer_data.preferred_contact", "phone");
        setSearchValue("");
        trigger(["customer_data.customer_id"]);
    };

    const handleRemoveCustomer = () => {
        updateField("customer_data.customer_id", null);
        updateField("customer_data.customer_name", "");
        updateField("customer_data.customer_email", "");
        updateField("customer_data.customer_phone", "");
        updateField("customer_data.customer_address", "");
        updateField("customer_data.customer_city", "");
        updateField("customer_data.customer_country", "");
        updateField("customer_data.customer_type", "individual");
        updateField("customer_data.preferred_contact", "phone");

        trigger(["customer_data.customer_id"]);
    };

    return (
        <>
            <div style={{ position: "relative" }}>
                <FormGroup title="Información del Cliente" description="Datos de contacto del cliente">
                    <SearchInput
                        value={searchValue}
                        onChange={setSearchValue}
                        onSearch={handleSearch}
                        onSelect={handleSelectCustomer}
                        placeholder="Buscar cliente por nombre, nit o correo..."
                        loading
                        error={
                            errors.customer_data
                                ? Object.values(errors.customer_data)
                                      .map((err: any) => err.message)
                                      .join(" - ")
                                : undefined
                        }
                    />
                    {hasSelectedCustomer && (
                        <div
                            style={{
                                marginTop: "12px",
                                padding: "12px",
                                border: "1px solid #e5e7eb",
                                borderRadius: "8px",
                                backgroundColor: "#f9fafb",
                            }}
                        >
                            <Row $align="center" $justify="space-between">
                                <Column gap={"xs"}>
                                    <Text weight="semibold" variant="body1">
                                        {formData.customer_data.customer_name}
                                    </Text>
                                    <Text weight="normal" variant="caption">
                                        {formData.customer_data.customer_email}
                                    </Text>
                                    <Text weight="normal" variant="caption">
                                        {formData.customer_data.customer_phone}
                                    </Text>
                                </Column>
                                <IconButton
                                    icon={<FaTrash />}
                                    variant="ghost"
                                    size="sm"
                                    color="danger"
                                    onClick={handleRemoveCustomer}
                                />
                            </Row>
                        </div>
                    )}
                </FormGroup>
                <div style={{ position: "absolute", top: 5, right: 0 }}>
                    <Button
                        onClick={() => setIsFormOpen(true)}
                        leftIcon={<IoMdPersonAdd />}
                        variant="indigo"
                        width={200}
                    >
                        Añadir nuevo cliente
                    </Button>
                </div>
            </div>
            <Modal
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                title="Crear Nuevo Cliente"
                size="md"
                footer={
                    <>
                        <Button variant="outline" onClick={() => setIsFormOpen(false)}>
                            Cancelar
                        </Button>
                        <Button onClick={() => setIsFormOpen(false)}>Guardar</Button>
                    </>
                }
            >
                <form style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <div>
                        <label style={{ display: "block", marginBottom: "4px", fontWeight: "500" }}>
                            Nombre completo
                        </label>
                        <input
                            type="text"
                            style={{
                                width: "100%",
                                padding: "8px 12px",
                                border: "1px solid #d1d5db",
                                borderRadius: "6px",
                                fontSize: "14px",
                            }}
                            placeholder="Ingresa el nombre completo"
                        />
                    </div>
                    <div>
                        <label style={{ display: "block", marginBottom: "4px", fontWeight: "500" }}>Email</label>
                        <input
                            type="email"
                            style={{
                                width: "100%",
                                padding: "8px 12px",
                                border: "1px solid #d1d5db",
                                borderRadius: "6px",
                                fontSize: "14px",
                            }}
                            placeholder="usuario@ejemplo.com"
                        />
                    </div>
                    <div>
                        <label style={{ display: "block", marginBottom: "4px", fontWeight: "500" }}>
                            Teléfono de contacto
                        </label>
                        <input
                            type="number"
                            style={{
                                width: "100%",
                                padding: "8px 12px",
                                border: "1px solid #d1d5db",
                                borderRadius: "6px",
                                fontSize: "14px",
                            }}
                            placeholder="+57 xxxxxxxxx"
                        />
                    </div>
                </form>
            </Modal>
        </>
    );
};
