import { useState, useEffect } from "react";
import { Label, Row, Button, Flex, Text } from "../../../shared/components";
import { FiPlus } from "react-icons/fi";
import { useFormContext } from "react-hook-form";
import { IssueCard } from "./IssueCard";

interface Issue {
    id: number;
    issueType: number | null;
    severity: number | null;
    code: number | string | null;
    description: string;
    steps: string;
    files: FileList | null;
    uploadedFiles: Array<{ filename: string; originalName: string; size: number; url: string }>;
}

interface FormProps {
    formData: any;
    updateField: (field: string, value: any) => void;
}

export const FormTabIssues = ({ formData, updateField }: FormProps) => {
    const [issues, setIssues] = useState<Issue[]>([]);

    const {
        formState: { errors },
    } = useFormContext();

    // Inicializar issues desde formData o crear uno vacío
    useEffect(() => {
        if (formData.issues && formData.issues.length > 0) {
            const mappedIssues = formData.issues.map((issue: any, index: number) => ({
                id: index + 1,
                issueType: issue.issue_type || null,
                severity: issue.issue_severity || null,
                code: issue.issue_code || null,
                description: issue.issue_description || "",
                steps: issue.issue_steps_to_reproduce?.[0] || "",
                files: null,
                uploadedFiles: issue.issue_files || [],
            }));
            setIssues(mappedIssues);
        } else {
            setIssues([]);
        }
    }, []);

    const addIssue = () => {
        const newIssue: Issue = {
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

    const updateIssue = (id: number, field: keyof Issue, value: any) => {
        const updatedIssues = issues.map((issue) => (issue.id === id ? { ...issue, [field]: value } : issue));
        setIssues(updatedIssues);
        syncWithForm(updatedIssues);
    };

    const syncWithForm = (currentIssues = issues) => {
        const formattedIssues = currentIssues.map((issue, index) => ({
            issue_name: `Problema ${issue.id}`,
            issue_description: issue.description,
            issue_type: issue.issueType,
            issue_severity: issue.severity,
            issue_code: issue.code,
            issue_additional_info: "",
            issue_steps_to_reproduce: issue.steps ? [issue.steps] : [],
            issue_environment: "",
            issue_additional_notes: "",
            issue_files: issue.uploadedFiles,
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
            {errors.issues && (
                <Text variant="caption" color="error" align="center">
                    *{errors.issues.message}
                </Text>
            )}
        </div>
    );
};
