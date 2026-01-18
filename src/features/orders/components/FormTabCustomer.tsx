import { useState, useCallback } from "react";
import { Button, Column, FormGroup, Modal, Row, Text, useToast } from "../../../shared/components";
import SearchInput from "../../../shared/components/SearchInput";
import { IoMdPersonAdd } from "react-icons/io";
import { FaTrash } from "react-icons/fa";
import { useFormContext } from "react-hook-form";
import IconButton from "../../../shared/components/Buttons/IconButton";
import { useCreateCustomerMutation, useLazyGetCustomersQuery } from "../services/customerApi";
import { useAlert } from "../../../shared/components/AlertModal";

interface FormProps {
    formData: any;
    updateField: (field: string, value: any) => void;
}

export const FormTabCustomer = ({ formData, updateField }: FormProps) => {
    const {
        formState: { errors },
        trigger,
    } = useFormContext();

    const { showError, showInfo } = useToast();
    const { showSuccess } = useAlert();

    const [searchValue, setSearchValue] = useState<string>("");
    const [isFormOpen, setIsFormOpen] = useState(false);

    // API Hooks
    const [triggerSearch, { isFetching: isSearching }] = useLazyGetCustomersQuery();
    const [createCustomer, { isLoading: isCreating }] = useCreateCustomerMutation();

    // New Customer Form State
    const [newCustomer, setNewCustomer] = useState({
        customer_name: "",
        customer_email: "",
        customer_phone: "",
        customer_address: "",
        customer_city: "",
        customer_country: "",
        customer_type: "individual",
        preferred_contact: "phone",
    });

    const hasSelectedCustomer = !!(formData.customer_data.customer_id && formData.customer_data.customer_id > 0);

    const handleSearch = useCallback(async (query: string) => {
        if (!query) return [];
        try {
            const response = await triggerSearch({ filter: query, page: 1, limit: 10 }).unwrap();
            const customers = response.data || [];

            return customers.map((customer: any) => ({
                ...customer,
                label: (
                    <Row $align="center" $justify="flex-start">
                        <Column gap={"xs"}>
                            <Text weight="semibold" variant="body1">
                                {customer.customer_name}
                            </Text>
                            <Text weight="normal" variant="caption">
                                {customer.customer_email}
                            </Text>
                            <Text weight="normal" variant="caption">
                                {customer.customer_phone}
                            </Text>
                            <Text weight="normal" variant="caption">
                                {customer.customer_address}
                            </Text>
                            <Text weight="normal" variant="caption">
                                {customer.customer_city}, {customer.customer_country}
                            </Text>
                        </Column>
                    </Row>
                ),
            }));
        } catch (error) {
            showInfo("Error searching customers", "Error");
            console.error("Error searching customers:", error);
            return [];
        }
    }, [triggerSearch]);

    const handleSelectCustomer = (customer: any) => {
        updateField("customer_data.customer_id", customer.id);
        updateField("customer_data.customer_name", customer.customer_name);
        updateField("customer_data.customer_email", customer.customer_email);
        updateField("customer_data.customer_phone", customer.customer_phone);
        updateField("customer_data.customer_address", customer.customer_address || "");
        updateField("customer_data.customer_city", customer.customer_city || "");
        updateField("customer_data.customer_country", customer.customer_country || "");
        updateField("customer_data.customer_type", customer.customer_type || "individual");
        updateField("customer_data.preferred_contact", customer.preferred_contact || "phone");
        setSearchValue("");
        trigger(["customer_data.customer_id"]);
        showInfo("Customer selected successfully", "Success");
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

    const handleCreateCustomer = async () => {
        try {
            console.log(newCustomer);
            const response = await createCustomer(newCustomer).unwrap();
            const createdCustomer = response.data || response;

            handleSelectCustomer({
                ...createdCustomer,
                customer_name: newCustomer.customer_name,
                customer_email: newCustomer.customer_email,
                customer_phone: newCustomer.customer_phone,
            });
            setIsFormOpen(false);
            setNewCustomer({ customer_name: "", customer_email: "", customer_phone: "", customer_address: "", customer_city: "", customer_country: "", customer_type: "individual", preferred_contact: "phone" });
            showSuccess("Success", "Customer created successfully", false);
        } catch (error) {
            console.error("Error creating customer:", error);
            showError("Error creating customer " + error?.data?.message, "Error");
        }
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
                        loading={isSearching}
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
                                    <Text weight="normal" variant="caption">
                                        {formData.customer_data.customer_address}
                                    </Text>
                                    <Text weight="normal" variant="caption">
                                        {formData.customer_data.customer_city}, {formData.customer_data.customer_country}
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
                        <Button onClick={handleCreateCustomer} disabled={isCreating} loading={isCreating}>
                            Guardar
                        </Button>
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
                            value={newCustomer.customer_name}
                            onChange={(e) => setNewCustomer({ ...newCustomer, customer_name: e.target.value })}
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
                            value={newCustomer.customer_email}
                            onChange={(e) => setNewCustomer({ ...newCustomer, customer_email: e.target.value })}
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
                            type="tel"
                            value={newCustomer.customer_phone}
                            onChange={(e) => setNewCustomer({ ...newCustomer, customer_phone: e.target.value })}
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
                    <div>
                        <label style={{ display: "block", marginBottom: "4px", fontWeight: "500" }}>
                            Dirección
                        </label>
                        <input
                            type="text"
                            value={newCustomer.customer_address}
                            onChange={(e) => setNewCustomer({ ...newCustomer, customer_address: e.target.value })}
                            style={{
                                width: "100%",
                                padding: "8px 12px",
                                border: "1px solid #d1d5db",
                                borderRadius: "6px",
                                fontSize: "14px",
                            }}
                            placeholder="Ingresa la dirección"
                        />
                    </div>
                    <div>
                        <label style={{ display: "block", marginBottom: "4px", fontWeight: "500" }}>
                            Ciudad
                        </label>
                        <input
                            type="text"
                            value={newCustomer.customer_city}
                            onChange={(e) => setNewCustomer({ ...newCustomer, customer_city: e.target.value })}
                            style={{
                                width: "100%",
                                padding: "8px 12px",
                                border: "1px solid #d1d5db",
                                borderRadius: "6px",
                                fontSize: "14px",
                            }}
                            placeholder="Ingresa la ciudad"
                        />
                    </div>
                    <div>
                        <label style={{ display: "block", marginBottom: "4px", fontWeight: "500" }}>
                            País
                        </label>
                        <input
                            type="text"
                            value={newCustomer.customer_country}
                            onChange={(e) => setNewCustomer({ ...newCustomer, customer_country: e.target.value })}
                            style={{
                                width: "100%",
                                padding: "8px 12px",
                                border: "1px solid #d1d5db",
                                borderRadius: "6px",
                                fontSize: "14px",
                            }}
                            placeholder="Ingresa el país"
                        />
                    </div>
                </form>
            </Modal>
        </>
    );
};
