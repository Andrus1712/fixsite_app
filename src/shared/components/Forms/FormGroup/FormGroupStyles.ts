import styled from "styled-components";

export const GroupContainer = styled.div<{ $fullWidth?: boolean }>`
    display: flex;
    flex-direction: column;
    width: ${(props) => (props.$fullWidth ? "100%" : "auto")};
`;

export const Header = styled.div`
    margin-bottom: ${(props) => props.theme.spacing.md};
`;

export const Title = styled.h3`
    margin: 0 0 ${(props) => props.theme.spacing.xxs} 0;
    font-size: ${(props) => props.theme.fontSize.base};
    font-weight: ${(props) => props.theme.fontWeight.semibold};
    color: ${(props) => props.theme.colors.text};
`;

export const Description = styled.p`
    margin: 0;
    font-size: ${(props) => props.theme.fontSize.sm};
    color: ${(props) => props.theme.colors.textSecondary};
    line-height: 1.5;
`;

export const FieldsContainer = styled.div<{
    $direction: "horizontal" | "vertical";
    $gap: string;
}>`
    display: flex;
    flex-direction: ${(props) => (props.$direction === "horizontal" ? "row" : "column")};
    gap: ${(props) => props.$gap};
    
    ${(props) =>
        props.$direction === "horizontal" &&
        `
        flex-wrap: wrap;
        
        & > * {
            flex: 1;
            min-width: 200px;
        }
    `}
`;
