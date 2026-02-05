import React, { useEffect, useRef, useState } from "react";
import {
    DropdownButtonContainer,
    DropdownMenuWrapper,
    DropdownMenuItem,
    DropdownMenuSection,
    DropdownMenuLabel,
    DropdownOverlay,
} from "./DropdownButton.styles";
import Button, { type ButtonSize, type ButtonVariant } from "./Button";
import IconButton, { type IconButtonSize, type IconButtonVariant } from "./IconButton";

export interface DropdownMenuOption {
    id: string;
    label: string;
    onClick: () => void;
    disabled?: boolean;
    isDanger?: boolean;
    icon?: React.ReactNode;
}

export interface DropdownMenuSection {
    label?: string;
    options: DropdownMenuOption[];
}

export interface DropdownButtonProps {
    label?: string;
    variant?: ButtonVariant | IconButtonVariant;
    size?: ButtonSize | IconButtonSize;
    items: DropdownMenuOption[] | DropdownMenuSection[];
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    disabled?: boolean;
    fullWidth?: boolean;
    onToggle?: (isOpen: boolean) => void;
    closeOnSelect?: boolean;
}

const isSectionArray = (items: DropdownMenuOption[] | DropdownMenuSection[]): items is DropdownMenuSection[] => {
    return items.length > 0 && "options" in items[0];
};

export const DropdownButton: React.FC<DropdownButtonProps> = ({
    label,
    variant = "primary",
    size = "md",
    items,
    leftIcon,
    rightIcon,
    disabled = false,
    fullWidth = false,
    onToggle,
    closeOnSelect = true,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleToggle = () => {
        if (disabled) return;
        const newState = !isOpen;
        setIsOpen(newState);
        onToggle?.(newState);
    };

    const handleSelect = (onClick: () => void) => {
        onClick();
        if (closeOnSelect) {
            setIsOpen(false);
        }
    };

    const handleOverlayClick = () => {
        setIsOpen(false);
    };

    const sections = isSectionArray(items) ? items : [{ options: items as DropdownMenuOption[] }];

    return (
        <DropdownButtonContainer ref={containerRef}>
            {label ? (
                <Button
                    onClick={handleToggle}
                    variant={variant as ButtonVariant}
                    size={size}
                    leftIcon={leftIcon}
                    rightIcon={rightIcon}
                    disabled={disabled}
                    fullWidth={fullWidth}
                >
                    {label}
                </Button>
            ) : (
                <IconButton
                    variant={variant as IconButtonVariant}
                    icon={leftIcon ?? rightIcon}
                    onClick={handleToggle}
                    size={size}
                />
            )}

            <DropdownOverlay $isOpen={isOpen} onClick={handleOverlayClick} />

            <DropdownMenuWrapper $isOpen={isOpen}>
                {sections.map((section, sectionIndex) => (
                    <DropdownMenuSection key={sectionIndex}>
                        {section.label && <DropdownMenuLabel>{section.label}</DropdownMenuLabel>}
                        {section.options.map((option) => (
                            <DropdownMenuItem
                                key={option.id}
                                onClick={() => handleSelect(option.onClick)}
                                $isDanger={option.isDanger}
                                $disabled={option.disabled}
                                disabled={option.disabled}
                            >
                                {option.icon}
                                {option.label}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuSection>
                ))}
            </DropdownMenuWrapper>
        </DropdownButtonContainer>
    );
};
