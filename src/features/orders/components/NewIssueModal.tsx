import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button, Flex, Modal } from "../../../shared/components";
import { IssueCard } from "./IssueCard";
import type { CreateOrderIssueDto } from "../services/orderApi";

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

export const NewIssueModal = ({ isOpen, onClose, onSave, isLoading, deviceTypeId }: NewIssueModalProps) => {
    const [issue, setIssue] = useState<IssueFormState>(emptyIssue);

    const methods = useForm({ defaultValues: { issues: [] } });

    const handleUpdate = (id: number, field: keyof IssueFormState, value: unknown) => {
        setIssue((prev) => ({ ...prev, [field]: value }));
    };

    const handleRemove = () => { };

    const handleSave = async () => {
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
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title="Nueva Falla"
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
                        disabled={!issue.code || !issue.description}
                    >
                        Guardar Falla
                    </Button>
                </Flex>
            }
        >
            <FormProvider {...methods}>
                <IssueCard
                    issue={issue}
                    index={0}
                    onUpdate={handleUpdate}
                    onRemove={handleRemove}
                    deviceTypeId={deviceTypeId}
                />
            </FormProvider>
        </Modal>
    );
};
