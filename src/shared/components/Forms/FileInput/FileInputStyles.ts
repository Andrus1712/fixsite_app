import styled, { css } from "styled-components";
import { FiUpload } from "react-icons/fi";

export const FileInputContainer = styled.div<{ $fullWidth?: boolean }>`
    display: flex;
    flex-direction: column;
    width: ${(props) => (props.$fullWidth ? "100%" : "auto")};
`;

export const Label = styled.label`
    font-size: ${(props) => props.theme.fontSize.sm};
    font-weight: ${(props) => props.theme.fontWeight.medium};
    color: ${(props) => props.theme.colors.text};
    margin-bottom: ${(props) => props.theme.spacing.xs};
`;

export const DropZone = styled.div<{
    $isDragActive: boolean;
    $hasError?: boolean;
    $disabled?: boolean;
}>`
    border: 2px dashed ${(props) => {
        if (props.$hasError) return props.theme.colors.error;
        if (props.$isDragActive) return props.theme.colors.primary;
        return props.theme.colors.border;
    }};
    border-radius: ${(props) => props.theme.borderRadius.lg};
    padding: ${(props) => props.theme.spacing.xl};
    text-align: center;
    cursor: ${(props) => (props.$disabled ? "not-allowed" : "pointer")};
    transition: all 0.2s ease;
    background-color: ${(props) => {
        if (props.$disabled) return props.theme.colors.gray100;
        if (props.$isDragActive) return props.theme.colors.primaryLight + "1A";
        return props.theme.colors.surface;
    }};
    
    &:hover {
        ${(props) =>
        !props.$disabled &&
        !props.$hasError &&
        css`
            border-color: ${props.theme.colors.primary};
            background-color: ${props.theme.colors.gray50};
        `}
    }
`;

export const UploadIcon = styled(FiUpload) <{ $isDragActive: boolean }>`
    font-size: 32px;
    color: ${(props) => (props.$isDragActive ? props.theme.colors.primary : props.theme.colors.textMuted)};
    margin-bottom: ${(props) => props.theme.spacing.sm};
`;

export const UploadText = styled.p`
    margin: 0;
    font-size: ${(props) => props.theme.fontSize.sm};
    color: ${(props) => props.theme.colors.textSecondary};
    line-height: 1.5;
    
    strong {
        color: ${(props) => props.theme.colors.primary};
        font-weight: ${(props) => props.theme.fontWeight.semibold};
    }

    small {
        display: block;
        margin-top: ${(props) => props.theme.spacing.xxs};
        color: ${(props) => props.theme.colors.textMuted};
        font-size: ${(props) => props.theme.fontSize.xs};
    }
`;

export const HiddenInput = styled.input`
    display: none;
`;

export const ErrorText = styled.span`
    font-size: ${(props) => props.theme.fontSize.xs};
    color: ${(props) => props.theme.colors.error};
    margin-top: ${(props) => props.theme.spacing.xxs};
`;

export const FilePreview = styled.div`
    margin-top: ${(props) => props.theme.spacing.md};
    display: flex;
    flex-direction: column;
    gap: ${(props) => props.theme.spacing.xs};
`;

export const FileItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${(props) => props.theme.spacing.sm} ${(props) => props.theme.spacing.md};
    background-color: ${(props) => props.theme.colors.gray50};
    border: 1px solid ${(props) => props.theme.colors.borderLight};
    border-radius: ${(props) => props.theme.borderRadius.md};
    font-size: ${(props) => props.theme.fontSize.sm};
    transition: all 0.2s ease;

    &:hover {
        background-color: ${(props) => props.theme.colors.gray100};
        border-color: ${(props) => props.theme.colors.border};
    }
`;

export const FileInfo = styled.div`
    display: flex;
    align-items: center;
    gap: ${(props) => props.theme.spacing.sm};
    color: ${(props) => props.theme.colors.text};
    overflow: hidden;

    span {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    small {
        color: ${(props) => props.theme.colors.textMuted};
        flex-shrink: 0;
    }
`;

export const FileActions = styled.div`
    display: flex;
    gap: ${(props) => props.theme.spacing.xxs};
`;

export const IconButton = styled.button<{ $variant?: "primary" | "error" }>`
    background: none;
    border: none;
    color: ${(props) => props.$variant === "error" ? props.theme.colors.error : props.theme.colors.primary};
    cursor: pointer;
    padding: ${(props) => props.theme.spacing.xs};
    border-radius: ${(props) => props.theme.borderRadius.sm};
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s;
    
    &:hover {
        background-color: ${(props) => props.$variant === "error" ? props.theme.colors.errorLight : props.theme.colors.primaryLight + "1A"};
    }
`;

export const PreviewContent = styled.div`
    text-align: center;
    padding: ${(props) => props.theme.spacing.md};
    max-height: 80vh;
    overflow-y: auto;
`;

export const PreviewImage = styled.img`
    max-width: 100%;
    max-height: 60vh;
    object-fit: contain;
    border-radius: ${(props) => props.theme.borderRadius.md};
    box-shadow: ${(props) => props.theme.shadows.md};
`;

export const PreviewVideo = styled.video`
    width: 100%;
    max-height: 60vh;
    border-radius: ${(props) => props.theme.borderRadius.md};
    box-shadow: ${(props) => props.theme.shadows.md};
`;

export const PreviewPDF = styled.iframe`
    width: 100%;
    height: 60vh;
    border: none;
    border-radius: ${(props) => props.theme.borderRadius.md};
`;

export const PreviewText = styled.pre`
    text-align: left;
    max-width: 100%;
    max-height: 60vh;
    overflow: auto;
    background-color: ${(props) => props.theme.colors.gray50};
    padding: ${(props) => props.theme.spacing.lg};
    border-radius: ${(props) => props.theme.borderRadius.md};
    font-family: 'Courier New', monospace;
    font-size: ${(props) => props.theme.fontSize.sm};
    line-height: 1.6;
    white-space: pre-wrap;
    word-wrap: break-word;
    border: 1px solid ${(props) => props.theme.colors.border};
`;

export const FileName = styled.h3`
    margin: ${(props) => props.theme.spacing.lg} 0 ${(props) => props.theme.spacing.xs} 0;
    color: ${(props) => props.theme.colors.text};
    font-size: ${(props) => props.theme.fontSize.lg};
    font-weight: ${(props) => props.theme.fontWeight.semibold};
`;

export const FileSize = styled.p`
    margin: 0;
    color: ${(props) => props.theme.colors.textMuted};
    font-size: ${(props) => props.theme.fontSize.sm};
`;

export const UnsupportedFile = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: ${(props) => props.theme.spacing.xxl};
    color: ${(props) => props.theme.colors.textMuted};
    
    svg {
        margin-bottom: ${(props) => props.theme.spacing.lg};
        color: ${(props) => props.theme.colors.gray400};
    }
`;
