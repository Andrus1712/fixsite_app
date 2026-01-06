import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { useUploadMultipleMutation } from "../../../shared/store/uploadApi";
import {
    FormGroup,
    Label,
    Row,
    FileInput,
    CollapsibleCard,
    Column,
    TextArea,
    SearchableSelect,
} from "../../../shared/components";
import {
    useGetAllFailuresCodesQuery,
    useGetAllFailuresCategoriesQuery,
    useGetAllFailuresSeveritiesQuery,
} from "../../maintenance/services/failureApi";
import { useEffect } from "react";

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

interface IssueCardProps {
    issue: Issue;
    index: number;
    onUpdate: (id: number, field: keyof Issue, value: any) => void;
    onRemove: (id: number) => void;
}

export const IssueCard = ({ issue, index, onUpdate, onRemove }: IssueCardProps) => {
    const [uploadMultiple] = useUploadMultipleMutation();
    const [codesFilter, setCodesFilter] = useState<string>("");
    const [categoryFilter, setCategoryFilter] = useState<string>("");
    const [severityFilter, setSeverityFilter] = useState<string>("");

    const {
        formState: { errors },
    } = useFormContext();

    // Acceder a errores específicos de este issue
    const issueErrors = errors.issues?.[index] as any;

    const {
        data: categories,
        isLoading: isLoadingCategories,
        error: categoryError,
    } = useGetAllFailuresCategoriesQuery({ filter: categoryFilter });
    const {
        data: severities,
        isLoading: isLoadingSeverities,
        error: severityError,
    } = useGetAllFailuresSeveritiesQuery({ filter: severityFilter });

    const {
        data: codes,
        isLoading: codesLoading,
        error: codesError,
    } = useGetAllFailuresCodesQuery(
        {
            filter: codesFilter,
            categoryId: issue.issueType ? issue.issueType.toString() : "",
            deviceTypeId: "",
            severityId: issue.severity ? issue.severity.toString() : "",
        },
        {
            skip: !issue.issueType || !issue.severity,
        }
    );

    const handleCategorySearch = (searchTerm: string) => {
        setCategoryFilter(searchTerm);
    };

    const handleSeveritySearch = (searchTerm: string) => {
        setSeverityFilter(searchTerm);
    };

    const handleCodesSearch = (searchTerm: string) => {
        setCodesFilter(searchTerm);
    };

    // Limpiar código cuando cambien tipo o severidad
    useEffect(() => {
        if (issue.code && (!issue.issueType || !issue.severity)) {
            onUpdate(issue.id, "code", null);
        }
    }, [issue.issueType, issue.severity, issue.code, issue.id, onUpdate]);

    const handleFileUpload = async (files: FileList | null) => {
        if (!files || files.length === 0) return;

        console.log('Files to upload:', files);
        const formData = new FormData();
        Array.from(files).forEach((file) => {
            formData.append("files", file);
        });

        try {
            const result = await uploadMultiple(formData).unwrap();
            console.log('Upload result:', result);
            if (result && result.files) {
                onUpdate(issue.id, "uploadedFiles", result.files);
            } else {
                console.log('No files in result or result is undefined');
            }
        } catch (error) {
            console.error("Error uploading files:", error);
        }
    };

    return (
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
            onDelete={() => onRemove(issue.id)}
        >
            <Column gap={"md"}>
                <Row $align="center" $justify="flex-start" fullWidth $gap={"lg"}>
                    <FormGroup fullWidth>
                        <Label>Tipo de Falla</Label>
                        <SearchableSelect
                            fullWidth
                            value={issue.issueType ? issue.issueType : undefined}
                            onChange={(value) => {
                                onUpdate(issue.id, "issueType", Number(value));
                            }}
                            options={
                                categories?.data?.map((type: any) => ({
                                    value: type.id,
                                    label: type.name,
                                })) || []
                            }
                            placeholder="Seleccionar tipo de Falla"
                            onSearch={handleCategorySearch}
                            isLoading={isLoadingCategories}
                            serverError={categoryError}
                            error={issueErrors?.issue_type?.message}
                        />
                    </FormGroup>
                    <FormGroup fullWidth>
                        <Label>Severidad</Label>
                        <SearchableSelect
                            fullWidth
                            value={issue.severity ? issue.severity : undefined}
                            onChange={(value) => {
                                onUpdate(issue.id, "severity", Number(value));
                            }}
                            options={
                                severities?.data?.map((severity: any) => ({
                                    value: severity.id,
                                    label: severity.name,
                                })) || []
                            }
                            placeholder="Seleccionar severidad"
                            onSearch={handleSeveritySearch}
                            isLoading={isLoadingSeverities}
                            serverError={severityError}
                            error={issueErrors?.issue_severity?.message}
                        />
                    </FormGroup>
                </Row>
                <Row $align="center" $justify="flex-start" fullWidth $gap={"lg"}>
                    <FormGroup fullWidth>
                        <Label>Código de Falla</Label>
                        <SearchableSelect
                            fullWidth
                            value={issue.code ? issue.code : undefined}
                            onChange={(value) => {
                                onUpdate(issue.id, "code", Number(value));
                            }}
                            options={
                                !issue.issueType || !issue.severity
                                    ? []
                                    : codes?.data?.map((code: any) => ({
                                          value: code.id,
                                          label: code.code + " - " + code.name,
                                      })) || []
                            }
                            placeholder={"Seleccionar código de falla"}
                            onSearch={handleCodesSearch}
                            isLoading={codesLoading}
                            serverError={codesError}
                            error={issueErrors?.issue_code?.message}
                        />
                    </FormGroup>
                </Row>
                <FormGroup>
                    <Label>Descripción del Problema</Label>
                    <TextArea
                        value={issue.description}
                        onChange={(e) => onUpdate(issue.id, "description", e.target.value)}
                        placeholder="Describe el problema encontrado..."
                        rows={3}
                        error={issueErrors?.issue_description?.message}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Pasos para Reproducir</Label>
                    <TextArea
                        value={issue.steps}
                        onChange={(e) => onUpdate(issue.id, "steps", e.target.value)}
                        placeholder="Describe los pasos para reproducir el problema..."
                        rows={3}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Archivos Adjuntos</Label>
                    <FileInput
                        multiple
                        accept="image/*,.pdf,.doc,.docx"
                        onChange={(files) => {
                            console.log('FileInput onChange triggered:', files);
                            handleFileUpload(files);
                        }}
                        filesUplaod={issue.uploadedFiles}
                    />
                    {issue.uploadedFiles && issue.uploadedFiles.length > 0 && (
                        <div style={{ marginTop: "8px" }}>
                            {issue.uploadedFiles.map((file, idx) => (
                                <div key={idx} style={{ fontSize: "12px", color: "#666" }}>
                                    📎 {file.originalName}
                                </div>
                            ))}
                        </div>
                    )}
                </FormGroup>
            </Column>
        </CollapsibleCard>
    );
};
