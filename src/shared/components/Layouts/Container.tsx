import styled from "styled-components";
import { type HTMLAttributes, type ReactNode } from "react";

type ContainerSize = "sm" | "md" | "lg" | "xl" | "full";
type Padding = "xs" | "sm" | "md" | "lg" | "xl" | number;

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
    size?: ContainerSize;
    padding?: Padding;
    center?: boolean;
    title?: string;
    headerActions?: ReactNode;
}

const getSizeValue = (size: ContainerSize) => {
    const sizes = {
        sm: "640px",
        md: "768px", 
        lg: "1024px",
        xl: "1280px",
        full: "100%"
    };
    return sizes[size];
};

const getPaddingValue = (padding: Padding) => {
    if (typeof padding === "number") return `${padding}px`;
    const paddings = {
        xs: "8px",
        sm: "16px",
        md: "24px",
        lg: "32px",
        xl: "48px"
    };
    return paddings[padding] || "24px";
};

const StyledContainer = styled.div<ContainerProps>`
    width: 100%;
    max-width: ${props => getSizeValue(props.size || "lg")};
    margin: ${props => props.center ? "0 auto" : "0"};
    
    @media (max-width: 768px) {
        padding: ${props => getPaddingValue(props.padding || "sm")};
    }
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 16px;
    border-bottom: 1px solid #e5e7eb;
    margin-bottom: 24px;
`;

const Title = styled.h2`
    margin: 0;
    font-size: 20px;
    font-weight: 600;
    color: #111827;
`;

const Content = styled.div<{ padding: Padding }>`
    padding: ${props => getPaddingValue(props.padding)};
`;

export default function Container({ title, headerActions, children, padding = "md", ...props }: ContainerProps) {
    return (
        <StyledContainer {...props}>
            <Content padding={padding}>
                {title && (
                    <Header>
                        <Title>{title}</Title>
                        {headerActions && <div>{headerActions}</div>}
                    </Header>
                )}
                {children}
            </Content>
        </StyledContainer>
    );
}