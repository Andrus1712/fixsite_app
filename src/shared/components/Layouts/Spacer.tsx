import styled from "styled-components";

type SpacerSize = "xs" | "sm" | "md" | "lg" | "xl" | number;

interface SpacerProps {
    size?: SpacerSize;
    horizontal?: boolean;
}

const getSizeValue = (size: SpacerSize) => {
    if (typeof size === "number") return `${size}px`;
    const sizes = {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px"
    };
    return sizes[size] || "16px";
};

const StyledSpacer = styled.div<SpacerProps>`
    ${props => props.horizontal 
        ? `width: ${getSizeValue(props.size || "md")}; height: 1px;`
        : `height: ${getSizeValue(props.size || "md")}; width: 1px;`
    }
    flex-shrink: 0;
`;

export default function Spacer({ size = "md", horizontal = false }: SpacerProps) {
    return <StyledSpacer size={size} horizontal={horizontal} />;
}