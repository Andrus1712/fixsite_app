import { useState, useRef, useEffect, type InputHTMLAttributes } from "react";
import { FiFile, FiX, FiEye, FiVideo } from "react-icons/fi";
import { Modal } from "../../Modal";
import {
    DropZone, ErrorText, FileActions, FileInfo, FileItem, FileInputContainer,
    FileName, FilePreview, FileSize, HiddenInput, IconButton, Label,
    PreviewContent, PreviewImage, PreviewPDF, PreviewText, PreviewVideo,
    UnsupportedFile, UploadIcon, UploadText
} from "./FileInputStyles";

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
            if (!isAllowedFileType(file)) {
                rejectedFiles.push(`${file.name} - Tipo no permitido`);
                return false;
            }

            if (maxSize && file.size > maxSize * 1024 * 1024) {
                rejectedFiles.push(`${file.name} - Excede ${maxSize}MB`);
                return false;
            }

            return true;
        });

        if (rejectedFiles.length > 0) {
            const errorMsg = `Archivos rechazados:\n${rejectedFiles.join(
                "\n"
            )}\n\nSolo se permiten: Imágenes, Videos MP4 y Documentos PDF/TXT`;
            alert(errorMsg);
        }

        const newFiles = multiple ? [...selectedFiles, ...validFiles].slice(0, maxFiles) : validFiles.slice(0, 1);

        setSelectedFiles(newFiles);

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
        const allowedExtensions = [
            ".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg", ".mp4", ".pdf", ".txt", ".csv", ".json", ".xml", ".md",
        ];
        return allowedExtensions.some((ext) => file.name.toLowerCase().endsWith(ext));
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
                setFileUrl(`${import.meta.env.VITE_API_BASE_URL}${file.url}`);
            }
        }, [file]);

        const loadTextContent = async (file: File | { filename: string; originalName: string; size: number; url: string }) => {
            setLoading(true);
            try {
                let text: string;
                if ('type' in file) {
                    text = await file.text();
                } else {
                    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}${file.url}`);
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
                    Tu navegador no soporta la reproducción de video.
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
        <FileInputContainer $fullWidth={fullWidth}>
            {label && <Label>{label}</Label>}

            <DropZone
                $isDragActive={isDragActive}
                $hasError={!!error}
                $disabled={disabled}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={handleClick}
            >
                <UploadIcon $isDragActive={isDragActive} />
                <UploadText>
                    <strong>Haz clic para subir</strong> o arrastra archivos aquí
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
                                    <IconButton
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            openPreview(file);
                                        }}
                                        title="Previsualizar"
                                    >
                                        <FiEye />
                                    </IconButton>
                                )}
                                <IconButton
                                    $variant="error"
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeFile(index);
                                    }}
                                    title="Eliminar"
                                >
                                    <FiX />
                                </IconButton>
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
