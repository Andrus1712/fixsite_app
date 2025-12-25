import { Box, Button, Container, Flex, FormGroup, FormTabs, Input, Select, TextArea } from "../../../shared/components";
import { useCreateOrderMutation } from "../services/orderApi";
import z from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import NewOrdenComponent from "../components/NewOrdenComponent";
import { FormTabService } from "../components/FromTabService";
import { FormTabCustomer } from "../components/FormTabCustomer";
import { FormTabDevice } from "../components/FormTabDevice";
import { FormTabIssues } from "../components/FormTabIssues";
import { FormTabResume } from "../components/FormTabResume";
import { FormTabResumeAlt } from "../components/FormTabResumeAlt";

// --- Sub-schemas ---

const DeviceDataSchema = z.object({
    device_name: z.string().min(1, "El nombre del dispositivo es obligatorio."),
    device_type: z.number({ error: "El tipo de dispositivo debe ser un número." }).int().positive(),
    device_brand: z.number({ error: "La marca del dispositivo es obligatoria." }).int().positive(), // Asumiendo que es un ID numérico positivo
    serial_number: z.string().optional(),
    imei: z.string().optional(),
    model_year: z.string().min(4, "El año debe tener al menos 4 dígitos."), // Lo dejo como string por si se usa un select con años o un input de texto
    color: z.string().optional(),
    storage_capacity: z.string().optional(),
});

const IssueSchema = z.object({
    issue_name: z.string().min(1, "El nombre del problema es obligatorio."),
    issue_description: z.string().min(1, "La descripción del problema es obligatoria."),
    issue_type: z.number({ error: "El tipo de problema es obligatorio." }).int().positive(),
    issue_severity: z.number({ error: "La severidad del problema es obligatoria." }).int().positive(),
    issue_additional_info: z.string().optional(),
    issue_steps_to_reproduce: z.array(z.string()).optional(),
    issue_environment: z.string().optional(),
    issue_additional_notes: z.string().optional(),
    issue_files: z
        .array(
            z.object({
                filename: z.string(),
                originalName: z.string(),
                size: z.number(),
                url: z.string(),
            })
        )
        .optional(),
});

const CustomerDataSchema = z.object({
    customer_id: z.number({ error: "El cliente es obligatorio." }).int().positive(),
    customer_name: z.string().min(1, "El nombre del cliente es obligatorio."),
    customer_email: z.email({ error: "Formato de email inválido." }).optional(),
    customer_phone: z.string().min(1, "El teléfono es obligatorio.").optional(),
    customer_address: z.string().optional(),
    customer_city: z.string().min(1, "La ciudad es obligatoria."),
    customer_country: z.string().min(1, "El país es obligatorio."),
    customer_type: z.enum(["individual", "business", "other"], {
        error: "El tipo de cliente es obligatorio.",
    }),
    preferred_contact: z.enum(["phone", "email", "whatsapp"], {
        error: "El contacto preferido es obligatorio.",
    }),
});

const CostInfoSchema = z.object({
    estimated_cost: z.number().min(0, "El costo debe ser cero o positivo."),
    labor_cost: z.number().min(0, "El costo de mano de obra debe ser cero o positivo."),
    parts_cost: z.number().min(0, "El costo de partes debe ser cero o positivo."),
    currency: z.string().min(1, "La moneda es obligatoria."),
});

const TimelineSchema = z.object({
    estimated_completion: z.string().optional(), // Podría ser z.date() si usas un selector de fecha
    estimated_hours: z.number().min(0, "Las horas deben ser cero o positivas.").optional(),
    sla_deadline: z.string().optional(), // Podría ser z.date()
});

// --- Esquema principal ---

export const ComponentSchema = z.object({
    serviceType: z.number({ error: "El tipo de servicio es obligatorio." }).int({ error: "El tipo de servicio es obligatorio." }).positive({ error: "El tipo de servicio es obligatorio." }),
    description: z.string().optional(),
    device_data: DeviceDataSchema,
    issues: z.array(IssueSchema).min(1, "Debe haber al menos un problema reportado."),
    customer_data: CustomerDataSchema,
    cost_info: CostInfoSchema.optional(),
    timeline: TimelineSchema.optional(),
    priority: z.number().int().positive(),
});

// --- Tipo derivado (para useForm) ---

export type ComponentFormData = z.infer<typeof ComponentSchema>;

export default function NewOrderpage() {
    const methods = useForm<ComponentFormData>({
        resolver: zodResolver(ComponentSchema),
        defaultValues: {
            // 3. Establece valores por defecto para evitar undefined en campos anidados
            serviceType: 0,
            description: "",
            device_data: {
                device_name: "",
                device_type: 1, // Ejemplo de default para select
                device_brand: 1,
                model_year: "",
                serial_number: "",
                imei: "",
                color: "",
                storage_capacity: "",
            },
            issues: [],
            customer_data: {
                customer_id: undefined,
                customer_name: "",
                customer_email: "",
                customer_phone: "",
                customer_address: "",
                customer_city: "",
                customer_country: "",
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
        },
    });
    const {
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
        trigger,
    } = methods;

    const formData = watch();

    const updateField = (field: string, value: any) => {
        setValue(field as any, value);
    };

    const onSubmit = (data: ComponentFormData) => {
        console.log(data);
        // Lógica de envío de datos aquí
    };

    const [createOrder, { isLoading }] = useCreateOrderMutation();

    const tabs = [
        {
            label: "Servicio",
            content: <FormTabService formData={formData} updateField={updateField} />,
            validationFields: ["serviceType", "description"]
        },
        {
            label: "Cliente",
            content: <FormTabCustomer formData={formData} updateField={updateField} />,
            validationFields: ["customer_data.customer_id"]
        },
        {
            label: "Dispositivo",
            content: <FormTabDevice formData={formData} updateField={updateField} />,
            validationFields: ["device_data.device_name", "device_data.device_type", "device_data.device_brand"]
        },
        {
            label: "Falla",
            content: <FormTabIssues formData={formData} updateField={updateField} />,
        },
        {
            label: "Resumen",
            content: <FormTabResumeAlt formData={formData} updateField={updateField} />,
        },
    ];

    return (
        <Container className="container" center size="xl">
            <Box p="lg" bg="white" rounded shadow>
                <FormProvider {...methods}>
                    <FormTabs
                        tabs={tabs}
                        onSubmit={handleSubmit(onSubmit)}
                        submitLabel="Crear Orden"
                        loading={isLoading}
                    />
                </FormProvider>
            </Box>
            <pre>{JSON.stringify(formData, null, 2)}</pre>
        </Container>
    );
}
