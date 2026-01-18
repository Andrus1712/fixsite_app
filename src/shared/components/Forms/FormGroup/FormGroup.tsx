import { type ReactNode } from "react";
import { useTheme } from "styled-components";
import { Description, FieldsContainer, GroupContainer, Header, Title } from "./FormGroupStyles";

interface FormGroupProps {
    children: ReactNode;
    title?: string;
    description?: string;
    direction?: "horizontal" | "vertical";
    gap?: "xs" | "sm" | "md" | "lg" | "xl";
    fullWidth?: boolean;
}

export default function FormGroup({
    children,
    title,
    description,
    direction = "vertical",
    gap = "md",
    fullWidth,
}: FormGroupProps) {
    const theme = useTheme();

    return (
        <GroupContainer $fullWidth={fullWidth}>
            {(title || description) && (
                <Header>
                    {title && <Title>{title}</Title>}
                    {description && <Description>{description}</Description>}
                </Header>
            )}
            <FieldsContainer $direction={direction} $gap={theme.spacing[gap]}>
                {children}
            </FieldsContainer>
        </GroupContainer>
    );
}
