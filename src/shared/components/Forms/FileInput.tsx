import styled, { css } from "styled-components";
import { useState, useRef, useEffect, type InputHTMLAttributes } from "react";
import { FiUpload, FiFile, FiX, FiEye, FiFileText, FiVideo } from "react-icons/fi";
import { Modal } from "../Modal";

interface FileInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
    label?: string;
    error?: string;
    fullWidth?: boolean;
    onChange?: (files: FileList | null) => void;
    maxFiles?: number;
    maxSize?: number; // in MB
    showPreview?: boolean;
    filesUplaod: Array<{ filename: string; originalName: string; size: number; url: string }>;
}

const FileInputContainer = styled.div<{ fullWidth?: boolean }>`
    display: flex;
    flex-direction: column;
    width: ${(props) => (props.fullWidth ? "100%" : "auto")};
`;

const Label = styled.label`
    font-size: 14px;
    font-weight: 500;
    color: #374151;
    margin-bottom: 6px;
`;

const DropZone = styled.div<{
    isDragActive: boolean;
    hasError?: boolean;
    disabled?: boolean;
}>`
    border: 2px dashed ${(props) => {
        if (props.hasError) return "#ef4444";
        if (props.isDragActive) return "#3b82f6";
        return "#d1d5db";
    }};
    border-radius: 8px;
    padding: 24px;
    text-align: center;
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
    transition: all 0.2s;
    background-color: ${(props) => {
        if (props.disabled) return "#f3f4f6";
        if (props.isDragActive) return "#dbeafe";
        return "white";
    }};
    
    &:hover {
        ${(props) =>
            !props.disabled &&
            !props.hasError &&
            css`
            border-color: #3b82f6;
            background-color: #f8fafc;
        `}
    }
`;

const UploadIcon = styled(FiUpload)<{ isDragActive: boolean }>`
    font-size: 32px;
    color: ${(props) => (props.isDragActive ? "#3b82f6" : "#9ca3af")};
    margin-bottom: 8px;
`;

const UploadText = styled.p`
    margin: 0;
    font-size: 14px;
    color: #6b7280;
    
    strong {
        color: #3b82f6;
    }
`;

const HiddenInput = styled.input`
    display: none;
`;

const ErrorText = styled.span`
    font-size: 12px;
    color: #ef4444;
    margin-top: 4px;
`;

const FilePreview = styled.div`
    margin-top: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const FileItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px;
    background-color: #f3f4f6;
    border-radius: 6px;
    font-size: 14px;
`;

const FileActions = styled.div`
    display: flex;
    gap: 4px;
`;

const PreviewButton = styled.button`
    background: none;
    border: none;
    color: #3b82f6;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    
    &:hover {
        background-color: #dbeafe;
    }
`;

const PreviewImage = styled.img`
    max-width: 100%;
    max-height: 80vh;
    object-fit: contain;
    border-radius: 8px;
`;

const PreviewVideo = styled.video`
    max-width: 100%;
    max-height: 80vh;
    border-radius: 8px;
`;

const PreviewPDF = styled.iframe`
    width: 100%;
    height: 80vh;
    border: none;
    border-radius: 8px;
`;

const PreviewText = styled.pre`
    max-width: 100%;
    max-height: 60vh;
    overflow: auto;
    background-color: #f8fafc;
    padding: 16px;
    border-radius: 8px;
    font-family: 'Courier New', monospace;
    font-size: 14px;
    line-height: 1.5;
    white-space: pre-wrap;
    word-wrap: break-word;
`;

const UnsupportedFile = styled.div`
    text-align: center;
    padding: 40px;
    color: #6b7280;
    
    svg {
        margin-bottom: 16px;
    }
`;

const PreviewContent = styled.div`
    text-align: center;
    padding: 20px;
`;

const FileName = styled.h3`
    margin: 16px 0 8px 0;
    color: #374151;
    font-size: 18px;
`;

const FileSize = styled.p`
    margin: 0;
    color: #6b7280;
    font-size: 14px;
`;

const FileInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    color: #374151;
`;

const RemoveButton = styled.button`
    background: none;
    border: none;
    color: #ef4444;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    
    &:hover {
        background-color: #fee2e2;
    }
`;

const FileInput = ({
    label,
    error,
    fullWidth,
    onChange,
    maxFiles = 5,
    maxSize = 10,
    showPreview = true,
    disabled,
    accept,
    multiple,
    filesUplaod,
    ...props
}: FileInputProps) => {
    const [isDragActive, setIsDragActive] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [previewFile, setPreviewFile] = useState<File | { filename: string; originalName: string; size: number; url: string } | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFiles = (files: FileList | null) => {
        if (!files || disabled) return;

        const fileArray = Array.from(files);
        const rejectedFiles: string[] = [];

        const validFiles = fileArray.filter((file) => {
            // Validar tipo de archivo
            if (!isAllowedFileType(file)) {
                rejectedFiles.push(`${file.name} - Tipo no permitido`);
                return false;
            }

            // Validar tamaño
            if (maxSize && file.size > maxSize * 1024 * 1024) {
                rejectedFiles.push(`${file.name} - Excede ${maxSize}MB`);
                return false;
            }

            return true;
        });

        // Mostrar errores si hay archivos rechazados
        if (rejectedFiles.length > 0) {
            const errorMsg = `Archivos rechazados:\n${rejectedFiles.join(
                "\n"
            )}\n\nSolo se permiten: Imágenes, Videos MP4 y Documentos PDF/TXT`;
            alert(errorMsg);
        }

        const newFiles = multiple ? [...selectedFiles, ...validFiles].slice(0, maxFiles) : validFiles.slice(0, 1);

        setSelectedFiles(newFiles);

        // Create FileList-like object
        const dt = new DataTransfer();
        newFiles.forEach((file) => dt.items.add(file));

        onChange?.(dt.files);
    };

    const removeFile = (index: number) => {
        const newFiles = selectedFiles.filter((_, i) => i !== index);
        setSelectedFiles(newFiles);

        const dt = new DataTransfer();
        newFiles.forEach((file) => dt.items.add(file));

        onChange?.(dt.files);
    };

    const handleDragEnter = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!disabled) setIsDragActive(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);

        if (!disabled) {
            handleFiles(e.dataTransfer.files);
        }
    };

    const handleClick = () => {
        if (!disabled) {
            inputRef.current?.click();
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleFiles(e.target.files);
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    const isImageFile = (file: File | { filename: string; originalName: string; size: number; url: string }) => {
        if ('type' in file) {
            return file.type.startsWith("image/");
        }
        return /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file.originalName);
    };

    const isVideoFile = (file: File | { filename: string; originalName: string; size: number; url: string }) => {
        if ('type' in file) {
            return file.type.startsWith("video/");
        }
        return /\.(mp4|webm|ogg)$/i.test(file.originalName);
    };

    const isSupportedVideoFile = (file: File | { filename: string; originalName: string; size: number; url: string }) => {
        if ('type' in file) {
            return file.type === "video/mp4" || file.name.toLowerCase().endsWith(".mp4");
        }
        return /\.mp4$/i.test(file.originalName);
    };

    const isPDFFile = (file: File | { filename: string; originalName: string; size: number; url: string }) => {
        if ('type' in file) {
            return file.type === "application/pdf";
        }
        return /\.pdf$/i.test(file.originalName);
    };

    const isTextFile = (file: File | { filename: string; originalName: string; size: number; url: string }) => {
        if ('type' in file) {
            return (
                file.type.startsWith("text/") ||
                file.name.endsWith(".txt") ||
                file.name.endsWith(".md") ||
                file.name.endsWith(".json") ||
                file.name.endsWith(".xml") ||
                file.name.endsWith(".csv")
            );
        }
        return /\.(txt|md|json|xml|csv)$/i.test(file.originalName);
    };

    const isAllowedFileType = (file: File) => {
        const allowedTypes = [
            // Imágenes
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/gif",
            "image/webp",
            "image/svg+xml",
            // Videos (solo MP4)
            "video/mp4",
            // Documentos
            "application/pdf",
            "text/plain",
            "text/csv",
            "application/json",
            "text/xml",
            "application/xml",
            "text/markdown",
        ];

        // También verificar por extensión para casos donde el MIME type no sea detectado
        const allowedExtensions = [
            ".jpg",
            ".jpeg",
            ".png",
            ".gif",
            ".webp",
            ".svg",
            ".mp4",
            ".pdf",
            ".txt",
            ".csv",
            ".json",
            ".xml",
            ".md",
        ];
        const hasAllowedExtension = allowedExtensions.some((ext) => file.name.toLowerCase().endsWith(ext));

        return allowedTypes.includes(file.type) || hasAllowedExtension;
    };

    const canPreview = (file: File | { filename: string; originalName: string; size: number; url: string }) => {
        return isImageFile(file) || isVideoFile(file) || isPDFFile(file) || isTextFile(file);
    };

    const PreviewRenderer = ({ file }: { file: File | { filename: string; originalName: string; size: number; url: string } }) => {
        const [textContent, setTextContent] = useState<string>("");
        const [loading, setLoading] = useState(false);
        const [fileUrl, setFileUrl] = useState<string>("");

        useEffect(() => {
            if ('type' in file) {
                const url = URL.createObjectURL(file);
                setFileUrl(url);
                return () => {
                    URL.revokeObjectURL(url);
                };
            } else {
                setFileUrl(`http://localhost:3000${file.url}`);
            }
        }, [file]);

        const loadTextContent = async (file: File | { filename: string; originalName: string; size: number; url: string }) => {
            setLoading(true);
            try {
                let text: string;
                if ('type' in file) {
                    text = await file.text();
                } else {
                    const response = await fetch(`http://localhost:3000${file.url}`);
                    text = await response.text();
                }
                setTextContent(text);
            } catch (error) {
                setTextContent("Error al cargar el contenido del archivo");
            } finally {
                setLoading(false);
            }
        };

        if (isImageFile(file)) {
            const fileName = 'type' in file ? file.name : file.originalName;
            return fileUrl ? <PreviewImage src={fileUrl} alt={fileName} /> : <div>Cargando imagen...</div>;
        }

        if (isVideoFile(file)) {
            if (!isSupportedVideoFile(file)) {
                return (
                    <UnsupportedFile>
                        <FiVideo size={64} />
                        <p>Formato de video no soportado en navegadores</p>
                        <small>Tipo: {'type' in file ? file.type : 'video/mp4'}</small>
                        <br />
                        <small>Formatos soportados: MP4, WebM, OGG</small>
                        <br />
                        <a
                            href={fileUrl}
                            download={'type' in file ? file.name : file.originalName}
                            style={{ color: "#3b82f6", textDecoration: "underline" }}
                        >
                            Descargar archivo
                        </a>
                    </UnsupportedFile>
                );
            }

            return fileUrl ? (
                <PreviewVideo controls preload="metadata" muted playsInline>
                    <source src={fileUrl} type={'type' in file ? file.type : 'video/mp4'} />
                    <p>Tu navegador no soporta la reproducción de video.</p>
                    <p>Tipo de archivo: {'type' in file ? file.type : 'video/mp4'}</p>
                    <a href={fileUrl} download={'type' in file ? file.name : file.originalName}>
                        Descargar video
                    </a>
                </PreviewVideo>
            ) : (
                <div>Cargando video...</div>
            );
        }

        if (isPDFFile(file)) {
            const fileName = 'type' in file ? file.name : file.originalName;
            return fileUrl ? <PreviewPDF src={fileUrl} title={fileName} /> : <div>Cargando PDF...</div>;
        }

        if (isTextFile(file)) {
            if (!textContent && !loading) {
                loadTextContent(file);
            }

            return <PreviewText>{loading ? "Cargando..." : textContent || "Contenido vacío"}</PreviewText>;
        }

        return (
            <UnsupportedFile>
                <FiFile size={64} />
                <p>Vista previa no disponible para este tipo de archivo</p>
                <small>{'type' in file ? file.type : 'Archivo del servidor'}</small>
            </UnsupportedFile>
        );
    };

    const openPreview = (file: File | { filename: string; originalName: string; size: number; url: string }) => {
        setPreviewFile(file);
        setIsModalOpen(true);
    };

    const closePreview = () => {
        setPreviewFile(null);
        setIsModalOpen(false);
    };

    return (
        <FileInputContainer fullWidth={fullWidth}>
            {label && <Label>{label}</Label>}

            <DropZone
                isDragActive={isDragActive}
                hasError={!!error}
                disabled={disabled}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={handleClick}
            >
                <UploadIcon isDragActive={isDragActive} />
                <UploadText>
                    <strong>Haz clic para subir</strong> o arrastra archivos aquí
                    <br />
                    <small>
                        {accept && `Formatos: ${accept}`}
                        {maxSize && ` • Máximo ${maxSize}MB`}
                        {multiple && ` • Hasta ${maxFiles} archivos`}
                    </small>
                </UploadText>
            </DropZone>

            <HiddenInput
                ref={inputRef}
                type="file"
                accept={accept}
                multiple={multiple}
                onChange={handleInputChange}
                disabled={disabled}
                {...props}
            />

            {error && <ErrorText>{error}</ErrorText>}

            {showPreview && filesUplaod.length > 0 && (
                <FilePreview>
                    {filesUplaod.map((file, index) => (
                        <FileItem key={`${file.filename}-${index}`}>
                            <FileInfo>
                                <FiFile />
                                <span>{file.originalName}</span>
                                <small>({formatFileSize(file.size)})</small>
                            </FileInfo>
                            <FileActions>
                                {canPreview(file) && (
                                    <PreviewButton
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            openPreview(file);
                                        }}
                                        title="Previsualizar"
                                    >
                                        <FiEye />
                                    </PreviewButton>
                                )}
                                <RemoveButton
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeFile(index);
                                    }}
                                    title="Eliminar"
                                >
                                    <FiX />
                                </RemoveButton>
                            </FileActions>
                        </FileItem>
                    ))}
                </FilePreview>
            )}

            <Modal isOpen={isModalOpen} onClose={closePreview} title="Previsualización">
                {previewFile && (
                    <PreviewContent>
                        <PreviewRenderer file={previewFile} />
                        <FileName>{'type' in previewFile ? previewFile.name : previewFile.originalName}</FileName>
                        <FileSize>{formatFileSize(previewFile.size)}</FileSize>
                    </PreviewContent>
                )}
            </Modal>
        </FileInputContainer>
    );
};

export default FileInput;
