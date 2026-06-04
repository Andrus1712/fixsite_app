import { useState } from "react";
import { Label, Row, Button, Flex } from "../../../shared/components";
import { FiPlus } from "react-icons/fi";
import { useFormContext } from "react-hook-form";
import { IssueCard } from "./IssueCard";
import type { FormPropsOrder } from "../models/FormPropsOrder";

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

function buildInitialIssues(formData: Record<string, unknown>): IssueFormState[] {
    const issues = formData.issues as Record<string, unknown>[] | undefined;
    if (!issues || issues.length === 0) return [];
    return issues.map((issue, index) => ({
        id: index + 1,
        issueType: (issue.issueType as number) || null,
        severity: (issue.severity as number) || null,
        code: (issue.failure_code_id as number) || null,
        description: (issue.description as string) || "",
        steps: Array.isArray(issue.steps_to_reproduce) ? issue.steps_to_reproduce[0] || "" : "",
        files: null,
        uploadedFiles: (issue.attachments as IssueFormState["uploadedFiles"]) || [],
    }));
}

export const FormTabIssues = ({ formData, updateField }: FormPropsOrder) => {
    // Inicializar solo una vez desde formData (evita que el useEffect resetee selecciones)
    const [issues, setIssues] = useState<IssueFormState[]>(() => buildInitialIssues(formData));

    const {
        formState: { errors: _errors },
    } = useFormContext();

    const addIssue = () => {
        const newIssue: IssueFormState = {
            id: Date.now(),
            issueType: null,
            severity: null,
            code: null,
            description: "",
            steps: "",
            files: null,
            uploadedFiles: [],
        };
        const updatedIssues = [...issues, newIssue];
        setIssues(updatedIssues);
        syncWithForm(updatedIssues);
    };

    const removeIssue = (id: number) => {
        const updatedIssues = issues.filter((issue) => issue.id !== id);
        setIssues(updatedIssues);
        syncWithForm(updatedIssues);
    };

    const updateIssue = (id: number, field: keyof IssueFormState, value: unknown) => {
        const updatedIssues = issues.map((issue) => (issue.id === id ? { ...issue, [field]: value } : issue));
        setIssues(updatedIssues);
        syncWithForm(updatedIssues);
    };

    const syncWithForm = (currentIssues: IssueFormState[] = issues) => {
        const formattedIssues = currentIssues.map((issue) => ({
            title: `Falla ${issue.id}`,
            description: issue.description,
            failure_code_id: issue.code ? Number(issue.code) : undefined,
            additional_notes: "",
            steps_to_reproduce: issue.steps ? [issue.steps] : [],
            reported_by: "",
            attachments: issue.uploadedFiles,
        }));
        updateField("issues", formattedIssues);
    };

    return (
        <div>
            <Row
                $align="center"
                $justify="space-between"
                fullWidth
                $gap={"md"}
                className="row"
                style={{ marginBottom: "10px" }}
            >
                <Label>Problemas Reportados ({issues.length})</Label>
                <Button leftIcon={<FiPlus />} variant="primary" size="sm" onClick={addIssue}>
                    Agregar Problema
                </Button>
            </Row>
            <Flex direction="column" fullWidth>
                {issues.map((issue, index) => (
                    <IssueCard
                        key={issue.id}
                        issue={issue}
                        index={index}
                        onUpdate={updateIssue}
                        onRemove={removeIssue}
                    />
                ))}
            </Flex>
        </div>
    );
};
