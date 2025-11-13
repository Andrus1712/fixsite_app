import styled from "styled-components";
import { type ReactNode } from "react";

interface FormGroupProps {
    children: ReactNode;
    title?: string;
    description?: string;
    direction?: "horizontal" | "vertical";
    gap?: "xs" | "sm" | "md" | "lg" | "xl";
}

const getGapValue = (gap: "xs" | "sm" | "md" | "lg" | "xl") => {
    const gaps = {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px"
    };
    return gaps[gap];
};

const GroupContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const Header = styled.div`
    margin-bottom: 16px;
`;

const Title = styled.h3`
    margin: 0 0 4px 0;
    font-size: 16px;
    font-weight: 600;
    color: #111827;
`;

const Description = styled.p`
    margin: 0;
    font-size: 14px;
    color: #6b7280;
    line-height: 1.4;
`;

const FieldsContainer = styled.div<{ 
    direction: "horizontal" | "vertical";
    gap: string;
}>`
    display: flex;
    flex-direction: ${props => props.direction === "horizontal" ? "row" : "column"};
    gap: ${props => props.gap};
    
    ${props => props.direction === "horizontal" && `
        flex-wrap: wrap;
        
        & > * {
            flex: 1;
            min-width: 200px;
        }
    `}
`;

export default function FormGroup({
    children,
    title,
    description,
    direction = "vertical",
    gap = "md"
}: FormGroupProps) {
    return (
        <GroupContainer>
            {(title || description) && (
                <Header>
                    {title && <Title>{title}</Title>}
                    {description && <Description>{description}</Description>}
                </Header>
            )}
            <FieldsContainer direction={direction} gap={getGapValue(gap)}>
                {children}
            </FieldsContainer>
        </GroupContainer>
    );
}