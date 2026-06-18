import { useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button, Flex, Modal, LoadingSpinner } from "../../../shared/components";
import { IssueCard } from "./IssueCard";
import type { CreateOrderIssueDto } from "../services/orderApi";
import type { OrderIssue } from "../models/OrderModel";
import { useGetAllFailuresCategoriesQuery, useGetAllFailuresSeveritiesQuery } from "../../maintenance/services/FailureApi";


type NewIssuePayload = Omit<CreateOrderIssueDto, "order_id">;

interface IssueFormState {
    id: number;
    issueType: number | null;
    severity: number | null;
    code: number | string | null;
    description: string;
    steps: string;
    files: FileList | null;
    uploadedFiles: Array<{ filename: string; originalName: string; size: number; url: string }>;
}

interface NewIssueModalProps {
    isOpen: boolean;
    onClose: () => void;
    orderId: number;
    deviceTypeId: string;
    onSave: (issueData: NewIssuePayload) => Promise<void>;
    isLoading?: boolean;
    /** Si se pasa, el modal entra en modo edición */
    issueToEdit?: OrderIssue | null;
}

const emptyIssue: IssueFormState = {
    id: 1,
    issueType: null,
    severity: null,
    code: null,
    description: "",
    steps: "",
    files: null,
    uploadedFiles: [],
};

export const NewIssueModal = ({
    isOpen,
    onClose,
    onSave,
    isLoading,
    deviceTypeId,
    issueToEdit,
}: NewIssueModalProps) => {
    const isEditMode = !!issueToEdit;
    const [issue, setIssue] = useState<IssueFormState>(emptyIssue);
    const [dataReady, setDataReady] = useState(false);

    const methods = useForm({ defaultValues: { issues: [] } });

    // Consultar categorías y severidades para resolver IDs por nombre
    const shouldFetchLists = isOpen && isEditMode;
    const { data: categoriesData } = useGetAllFailuresCategoriesQuery(
        { filter: "" },
        { skip: !shouldFetchLists }
    );
    const { data: severitiesData } = useGetAllFailuresSeveritiesQuery(
        { filter: "" },
        { skip: !shouldFetchLists }
    );

    // Reset cuando se cierra o se abre en modo creación
    useEffect(() => {
        if (!isOpen) {
            setDataReady(false);
            return;
        }
        if (isOpen && !issueToEdit) {
            setIssue(emptyIssue);
            setDataReady(true);
        }
    }, [isOpen, issueToEdit]);

    // Precargar datos cuando tenemos las listas de categorías y severidades
    useEffect(() => {
        if (!isOpen || !issueToEdit || dataReady) return;

        // Resolver category ID por nombre
        const categoryId = categoriesData?.data?.find(
            (cat: { id: number; name: string }) =>
                cat.name.toLowerCase() === issueToEdit.category?.toLowerCase()
        )?.id ?? null;

        // Resolver severity ID por nombre
        const severityId = severitiesData?.data?.find(
            (sev: { id: number; name: string }) =>
                sev.name.toLowerCase() === issueToEdit.severity?.toLowerCase()
        )?.id ?? null;

        // Si tenemos ambos IDs resueltos (o no hay categoría/severidad en el issue), cargar
        const canResolveCategory = !issueToEdit.category || categoryId !== null;
        const canResolveSeverity = !issueToEdit.severity || severityId !== null;

        if (canResolveCategory && canResolveSeverity) {
            setIssue({
                id: issueToEdit.id,
                issueType: categoryId,
                severity: severityId,
                code: issueToEdit.failure_code_id ?? null,
                description: issueToEdit.description || "",
                steps: issueToEdit.steps_to_reproduce?.join("\n") || "",
                files: null,
                uploadedFiles: issueToEdit.attachments?.map((a) => ({
                    filename: a.filename,
                    originalName: a.originalName,
                    size: Number(a.size),
                    url: a.url,
                })) || [],
            });
            setDataReady(true);
        }
    }, [isOpen, issueToEdit, categoriesData, severitiesData, dataReady]);

    // Timeout de seguridad: si después de 4s no resolvemos, mostrar con datos parciales
    useEffect(() => {
        if (!isOpen || !isEditMode || dataReady) return;

        const timeout = setTimeout(() => {
            if (!dataReady && issueToEdit) {
                setIssue({
                    id: issueToEdit.id,
                    issueType: null,
                    severity: null,
                    code: issueToEdit.failure_code_id ?? null,
                    description: issueToEdit.description || "",
                    steps: issueToEdit.steps_to_reproduce?.join("\n") || "",
                    files: null,
                    uploadedFiles: issueToEdit.attachments?.map((a) => ({
                        filename: a.filename,
                        originalName: a.originalName,
                        size: Number(a.size),
                        url: a.url,
                    })) || [],
                });
                setDataReady(true);
            }
        }, 4000);

        return () => clearTimeout(timeout);
    }, [isOpen, isEditMode, dataReady, issueToEdit]);

    const handleUpdate = (_id: number, field: keyof IssueFormState, value: unknown) => {
        setIssue((prev) => ({ ...prev, [field]: value }));
    };

    const handleRemove = () => { };

    const handleSave = async (): Promise<void> => {
        if (!issue.code || !issue.description) return;

        const issueData: NewIssuePayload = {
            title: `Falla #${issue.id}`,
            description: issue.description,
            failure_code_id: Number(issue.code),
            steps_to_reproduce: issue.steps ? [issue.steps] : [],
            attachments: issue.uploadedFiles.map((f) => ({ ...f, size: String(f.size) })),
        };
        await onSave(issueData);
    };

    const handleClose = () => {
        setIssue(emptyIssue);
        setDataReady(false);
        onClose();
    };

    const showLoading = isEditMode && !dataReady;

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title={isEditMode ? "Editar Falla" : "Nueva Falla"}
            size="lg"
            footer={
                <Flex $justify="flex-end" $gap="sm">
                    <Button variant="outline" onClick={handleClose} disabled={isLoading}>
                        Cancelar
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleSave}
                        loading={isLoading}
                        disabled={!issue.code || !issue.description || showLoading}
                    >
                        {isEditMode ? "Actualizar Falla" : "Guardar Falla"}
                    </Button>
                </Flex>
            }
        >
            <FormProvider {...methods}>
                {showLoading ? (
                    <Flex $justify="center" $align="center" style={{ padding: "2rem" }}>
                        <LoadingSpinner mensaje="Cargando datos de la falla..." />
                    </Flex>
                ) : (
                    <IssueCard
                        key={`edit-${issue.id}-${issue.issueType}-${issue.severity}`}
                        issue={issue}
                        index={0}
                        onUpdate={handleUpdate}
                        onRemove={handleRemove}
                        deviceTypeId={deviceTypeId}
                    />
                )}
            </FormProvider>
        </Modal>
    );
};
