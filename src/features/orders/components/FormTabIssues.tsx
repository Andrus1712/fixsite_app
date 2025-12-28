import { useState, useEffect } from "react";
import { useUploadMultipleMutation } from "../../../shared/store/uploadApi";
import {
    FormGroup,
    Label,
    Row,
    Select,
    FileInput,
    CollapsibleCard,
    Button,
    Column,
    TextArea,
    Flex,
    Text,
    SearchableSelect,
} from "../../../shared/components";
import { FiPlus, FiTrash2 } from "react-icons/fi";
import { useFormContext } from "react-hook-form";

interface Issue {
    id: number;
    issueType: number | null;
    severity: number | null;
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
    const [uploadMultiple] = useUploadMultipleMutation();

    const issueTypeOptions = [
        { value: 1, label: "Hardware" },
        { value: 2, label: "Software" },
        { value: 3, label: "Red/Conectividad" },
        { value: 4, label: "Rendimiento" },
    ];

    const severityOptions = [
        { value: 1, label: "Crítica" },
        { value: 2, label: "Alta" },
        { value: 3, label: "Normal" },
        { value: 4, label: "Baja" },
    ];

    const [filteredIssueTypes, setFilteredIssueTypes] = useState(issueTypeOptions);
    const [filteredSeverities, setFilteredSeverities] = useState(severityOptions);
    const {
        formState: { errors },
    } = useFormContext();

    const handleIssueTypeSearch = (searchTerm: string) => {
        if (!searchTerm) {
            setFilteredIssueTypes(issueTypeOptions);
        } else {
            const filtered = issueTypeOptions.filter((option) =>
                option.label.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredIssueTypes(filtered);
        }
    };

    const handleSeveritySearch = (searchTerm: string) => {
        if (!searchTerm) {
            setFilteredSeverities(severityOptions);
        } else {
            const filtered = severityOptions.filter((option) =>
                option.label.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredSeverities(filtered);
        }
    };

    // Inicializar issues desde formData o crear uno vacío
    useEffect(() => {
        if (formData.issues && formData.issues.length > 0) {
            const mappedIssues = formData.issues.map((issue: any, index: number) => ({
                id: index + 1,
                issueType: issue.issue_type || null,
                severity: issue.issue_severity || null,
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

    const handleFileUpload = async (issueId: number, files: FileList | null) => {
        if (!files || files.length === 0) return;

        const formData = new FormData();
        Array.from(files).forEach((file) => {
            formData.append("files", file);
        });

        try {
            const result = await uploadMultiple(formData).unwrap();
            updateIssue(issueId, "uploadedFiles", result.files);
        } catch (error) {
            console.error("Error uploading files:", error);
        }
    };

    const syncWithForm = (currentIssues = issues) => {
        const formattedIssues = currentIssues.map((issue, index) => ({
            issue_name: `Problema ${issue.id}`,
            issue_description: issue.description,
            issue_type: issue.issueType || 1,
            issue_severity: issue.severity || 1,
            issue_additional_info: "",
            issue_steps_to_reproduce: issue.steps ? [issue.steps] : [""],
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
                    <CollapsibleCard
                        key={issue.id}
                        title={`Falla #${issue.id}`}
                        badge={{
                            text:
                                issue.severity === 1
                                    ? "Crítica"
                                    : issue.severity === 2
                                    ? "Alta"
                                    : issue.severity === 3
                                    ? "Media"
                                    : issue.severity === 4
                                    ? "Baja"
                                    : "Sin definir",
                            variant:
                                issue.severity === 1
                                    ? "critica"
                                    : issue.severity === 2
                                    ? "alta"
                                    : issue.severity === 3
                                    ? "media"
                                    : issue.severity === 4
                                    ? "baja"
                                    : "media",
                        }}
                        defaultExpanded={index === 0}
                        onDelete={() => removeIssue(issue.id)}
                    >
                        <Column gap={"md"}>
                            <Row $align="center" $justify="flex-start" fullWidth $gap={"lg"}>
                                <FormGroup fullWidth>
                                    <Label>Tipo de Falla</Label>
                                    <SearchableSelect
                                        fullWidth
                                        value={issue.issueType ? issue.issueType : undefined}
                                        onChange={(value) => {
                                            updateIssue(issue.id, "issueType", Number(value));
                                        }}
                                        options={filteredIssueTypes}
                                        onSearch={handleIssueTypeSearch}
                                    />
                                </FormGroup>
                                <FormGroup fullWidth>
                                    <Label>Severidad</Label>
                                    <SearchableSelect
                                        fullWidth
                                        value={issue.severity ? issue.severity : undefined}
                                        onChange={(value) => {
                                            updateIssue(issue.id, "severity", Number(value));
                                        }}
                                        options={filteredSeverities}
                                        onSearch={handleSeveritySearch}
                                    />
                                </FormGroup>
                            </Row>

                            <FormGroup>
                                <Label>Descripción del Problema</Label>
                                <TextArea
                                    placeholder="Describe detalladamente el problema..."
                                    value={issue.description}
                                    onChange={(e) => {
                                        updateIssue(issue.id, "description", e.target.value);
                                    }}
                                    rows={3}
                                    fullWidth
                                    error={
                                        errors.issues && Array.isArray(errors.issues)
                                            ? errors.issues[index]?.issue_description?.message
                                            : undefined
                                    }
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label>Pasos para Reproducir</Label>
                                <TextArea
                                    placeholder="1. Paso uno...\n2. Paso dos...\n3. Resultado esperado vs actual"
                                    value={issue.steps}
                                    onChange={(e) => {
                                        updateIssue(issue.id, "steps", e.target.value);
                                    }}
                                    rows={4}
                                    fullWidth
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label>Archivos de Evidencia</Label>
                                <FileInput
                                    accept="image/*,.mp4,application/pdf,.txt,.csv,.json,.xml,.md"
                                    multiple
                                    maxFiles={5}
                                    maxSize={10}
                                    onChange={(files) => handleFileUpload(issue.id, files)}
                                    fullWidth
                                    filesUplaod={issues[index].uploadedFiles}
                                />
                            </FormGroup>
                        </Column>
                    </CollapsibleCard>
                ))}
            </Flex>
            {errors.issues && typeof errors.issues === "object" && "message" in errors.issues ? (
                <Text variant="caption" color="error" align="center">
                    {errors.issues.message}
                </Text>
            ) : null}
        </div>
    );
};
