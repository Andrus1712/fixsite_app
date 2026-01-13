import styled from "styled-components";

export const TabsContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const TabsNav = styled.nav<{ $variant?: "default" | "minimal" | "pill" | "outline" | "segmented" | "browser" }>`
    display: flex;
    gap: ${(p) => {
        if (p.$variant === "browser" || p.$variant === "segmented") return "0";
        return p.theme.spacing.lg;
    }};
    border-bottom: ${(p) => {
        if (p.$variant === "default") return `1px solid ${p.theme.colors.border}`;
        if (p.$variant === "browser") return `1px solid ${p.theme.colors.border}`;
        return "none";
    }};
    overflow-x: auto;
    overflow-y: hidden;

    &::-webkit-scrollbar {
        height: 4px;
    }

    &::-webkit-scrollbar-track {
        background: ${({ theme }) => theme.colors.backgroundSecondary};
    }

    &::-webkit-scrollbar-thumb {
        background: ${({ theme }) => theme.colors.borderDark};
        border-radius: ${({ theme }) => theme.borderRadius.lg};

        &:hover {
            background: ${({ theme }) => theme.colors.gray500};
        }
    }
`;

export const TabButton = styled.button<{
    $active: boolean;
    $variant?: "default" | "minimal" | "pill" | "outline" | "segmented" | "browser";
}>`
    padding: ${({ theme, $variant }) => {
        if ($variant === "pill") return `${theme.spacing.sm} ${theme.spacing.md}`;
        if ($variant === "browser") return `${theme.spacing.md} ${theme.spacing.lg}`;
        if ($variant === "segmented") return `${theme.spacing.md} ${theme.spacing.lg}`;
        return `${theme.spacing.md} ${theme.spacing.sm}`;
    }};
    border-bottom: ${(props) => {
        if (props.$variant === "default") return `2px solid ${props.$active ? props.theme.colors.primary : "transparent"}`;
        if (props.$variant === "browser") return `1px solid ${props.$active ? props.theme.colors.background : props.theme.colors.border}`;
        return "none";
    }};
    border-top: ${(props) => (props.$variant === "browser" ? `1px solid ${props.theme.colors.border}` : "none")};
    border-left: ${(props) => (props.$variant === "browser" ? `1px solid ${props.theme.colors.border}` : "none")};
    border-right: ${(props) => (props.$variant === "browser" ? `1px solid ${props.theme.colors.border}` : "none")};
    border: ${(props) => {
        if (props.$variant === "segmented") return `1px solid ${props.theme.colors.border}`;
        return undefined;
    }};
    font-weight: ${(props) => (props.$active ? "600" : "500")};
    font-size: ${({ theme }) => theme.fontSize.sm};
    color: ${(props) => {
        if (props.$variant === "pill") {
            return props.$active ? props.theme.colors.white : props.theme.colors.text;
        }
        if (props.$variant === "browser") {
            return props.$active ? props.theme.colors.primary : props.theme.colors.textSecondary;
        }
        if (props.$variant === "segmented") {
            return props.$active ? props.theme.colors.white : props.theme.colors.text;
        }
        return props.$active ? props.theme.colors.primary : props.theme.colors.textSecondary;
    }};
    background: ${(props) => {
        if (props.$variant === "pill") return props.$active ? props.theme.colors.primary : "transparent";
        if (props.$variant === "browser") return props.$active ? props.theme.colors.background : props.theme.colors.backgroundSecondary;
        if (props.$variant === "segmented") return props.$active ? props.theme.colors.primary : props.theme.colors.background;
        return "none";
    }};
    border-radius: ${(props) => {
        if (props.$variant === "pill") return "9999px";
        if (props.$variant === "browser") return `${props.theme.borderRadius.md} ${props.theme.borderRadius.md} 0 0`;
        if (props.$variant === "segmented") return props.theme.borderRadius.md;
        return "0";
    }};
    cursor: pointer;
    transition: all 0.15s ease-in-out;
    white-space: nowrap;
    position: relative;
    margin-bottom: ${(props) => (props.$variant === "browser" ? "-1px" : "0")};
    z-index: ${(props) => (props.$active && props.$variant === "browser" ? "1" : "0")};

    &:hover {
        color: ${(props) => {
            if (props.$active && props.$variant !== "pill" && props.$variant !== "segmented") return props.theme.colors.primary;
            if (props.$variant === "browser" && !props.$active) return props.theme.colors.text;
            if (props.$variant === "segmented" && !props.$active) return props.theme.colors.primary;
            return props.theme.colors.primary;
        }};
        filter: ${(props) => (props.$variant === "pill" && !props.$active ? "brightness(0.98)" : "none")};
        background: ${(props) => {
            if (props.$variant === "browser" && !props.$active) return props.theme.colors.gray50;
            if (props.$variant === "segmented" && !props.$active) return props.theme.colors.gray50;
            return undefined;
        }};
    }

    &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
        color: ${({ theme }) => theme.colors.textDisabled};
    }
`;

export const TabContent = styled.div`
    padding: ${({ theme }) => theme.spacing.lg} 0;
    width: 100%;
    animation: fadeIn 0.2s ease-in-out;

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;

export const TabsWrapper = styled.div`
    display: contents;
`;

