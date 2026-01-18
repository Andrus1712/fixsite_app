import { forwardRef, type TextareaHTMLAttributes } from "react";
import { ErrorText, Label, StyledTextArea, TextAreaContainer } from "./TextAreaStyles";

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    fullWidth?: boolean;
    resize?: "none" | "vertical" | "horizontal" | "both";
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(({
    label,
    error,
    fullWidth,
    resize = "vertical",
    ...props
}, ref) => {
    return (
        <TextAreaContainer $fullWidth={fullWidth}>
            {label && <Label>{label}</Label>}
            <StyledTextArea
                ref={ref}
                $hasError={!!error}
                $resize={resize}
                {...props}
            />
            {error && <ErrorText>{error}</ErrorText>}
        </TextAreaContainer>
    );
});

TextArea.displayName = "TextArea";

export default TextArea;
