import styled, { css } from "styled-components";
import { type TabsVariant } from "./Tabs";

export const TabsContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const TabsNav = styled.nav<{ $variant?: TabsVariant; $fullWidth?: boolean }>`
    display: flex;
    width: 100%;
    gap: ${(p) => {
        if (p.$variant === "browser" || p.$variant === "segmented") return "0";
        if (p.$variant === "pill") return p.theme.spacing.sm;
        return "0";
    }};
    border-bottom: ${(p) => {
        if (p.$variant === "default" || p.$variant === "minimal" || p.$variant === "browser") {
            return `1px solid ${p.theme.colors.borderLight}`;
        }
        return "none";
    }};
    
    padding: ${(p) => (p.$variant === "segmented" ? p.theme.spacing.xxs : "0")};
    background: ${(p) => (p.$variant === "segmented" ? p.theme.colors.gray100 : "transparent")};
    border-radius: ${(p) => (p.$variant === "segmented" ? p.theme.borderRadius.lg : "0")};
    
    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE 10+ */
    &::-webkit-scrollbar {
        display: none; /* Chrome/Safari */
    }

    /* Active state indicator for default variant */
    position: relative;
    
    ${(p) => p.$fullWidth && css`
        display: flex;
        & > * {
            flex: 1;
        }
    `}

    @media (max-width: ${(p) => p.theme.breakpoints.md}) {
        gap: ${(p) => (p.$variant === "pill" ? p.theme.spacing.xs : "0")};
    }
`;

export const TabButton = styled.button<{
    $active: boolean;
    $variant?: TabsVariant;
    $fullWidth?: boolean;
}>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: ${(p) => p.theme.spacing.sm};
    padding: ${(p) => {
        if (p.$variant === "pill") return `${p.theme.spacing.xs} ${p.theme.spacing.md}`;
        if (p.$variant === "browser") return `${p.theme.spacing.sm} ${p.theme.spacing.lg}`;
        if (p.$variant === "segmented") return `${p.theme.spacing.sm} ${p.theme.spacing.md}`;
        return `${p.theme.spacing.md} ${p.theme.spacing.lg}`;
    }};
    
    font-family: inherit;
    font-size: ${(p) => p.theme.fontSize.sm};
    font-weight: ${(p) => (p.$active ? p.theme.fontWeight.semibold : p.theme.fontWeight.medium)};
    color: ${(p) => {
        if (p.$active) return p.theme.colors.primary;
        return p.theme.colors.textSecondary;
    }};
    
    background: transparent;
    border: none;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    white-space: nowrap;
    position: relative;
    outline: none;

    /* Indicator for active tab in default variant */
    ${(p) => p.$variant === "default" && css`
        &::after {
            content: '';
            position: absolute;
            bottom: -1px;
            left: 0;
            right: 0;
            height: 2px;
            background: ${p.$active ? p.theme.colors.primary : "transparent"};
            transition: all 0.2s;
            border-radius: 2px 2px 0 0;
        }
    `}

    /* Minimal variant */
    ${(p) => p.$variant === "minimal" && css`
        color: ${p.$active ? p.theme.colors.primary : p.theme.colors.textSecondary};
        opacity: ${p.$active ? 1 : 0.7};
        &:hover { opacity: 1; }
    `}

    /* Pill variant */
    ${(p) => p.$variant === "pill" && css`
        border-radius: ${p.theme.borderRadius.full};
        background: ${p.$active ? p.theme.colors.primary : "transparent"};
        color: ${p.$active ? p.theme.colors.white : p.theme.colors.textSecondary};
        &:hover:not(:disabled) {
            background: ${p.$active ? p.theme.colors.primary : p.theme.colors.gray100};
        }
    `}

    /* Segmented variant */
    ${(p) => p.$variant === "segmented" && css`
        border-radius: ${p.theme.borderRadius.md};
        background: ${p.$active ? p.theme.colors.white : "transparent"};
        color: ${p.$active ? p.theme.colors.primary : p.theme.colors.textSecondary};
        box-shadow: ${p.$active ? p.theme.shadows.sm : "none"};
        &:hover:not(:disabled) {
            color: ${p.$active ? p.theme.colors.primary : p.theme.colors.text};
        }
    `}

    /* Browser variant */
    ${(p) => p.$variant === "browser" && css`
        border: 1px solid ${p.$active ? p.theme.colors.borderLight : "transparent"};
        border-bottom: none;
        background: ${p.$active ? p.theme.colors.white : p.theme.colors.gray50};
        border-radius: ${p.theme.borderRadius.md} ${p.theme.borderRadius.md} 0 0;
        margin-bottom: -1px;
        z-index: ${p.$active ? 1 : 0};
        &:hover:not(:disabled) {
            background: ${p.$active ? p.theme.colors.white : p.theme.colors.gray100};
        }
    `}

    .tab-icon {
        display: flex;
        font-size: 1.1em;
    }

    &:hover:not(:disabled) {
        color: ${(p) => (p.$active ? p.theme.colors.primary : p.theme.colors.text)};
    }

    &:disabled {
        cursor: not-allowed;
        opacity: 0.4;
    }

    @media (max-width: ${(p) => p.theme.breakpoints.md}) {
        padding: ${(p) => p.theme.spacing.sm} ${(p) => p.theme.spacing.md};
        flex: ${(p) => (p.$fullWidth ? "1" : "none")};
    }
`;

export const TabContent = styled.div`
    padding: ${(p) => p.theme.spacing.lg} 0;
    width: 100%;
    animation: slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(4px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
