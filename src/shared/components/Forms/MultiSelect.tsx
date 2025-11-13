import styled from "styled-components";
import { forwardRef, useState } from "react";

interface Option {
    value: string | number;
    label: string;
}

interface MultiSelectProps {
    label?: string;
    error?: string;
    fullWidth?: boolean;
    options: Option[];
    value?: (string | number)[];
    onChange?: (values: (string | number)[]) => void;
    placeholder?: string;
}

const MultiSelectContainer = styled.div<{ fullWidth?: boolean }>`
    display: flex;
    flex-direction: column;
    width: ${props => props.fullWidth ? "100%" : "auto"};
`;

const Label = styled.label`
    font-size: 14px;
    font-weight: 500;
    color: #374151;
    margin-bottom: 6px;
`;

const SelectWrapper = styled.div`
    position: relative;
`;

const SelectedItems = styled.div<{ hasError?: boolean }>`
    min-height: 42px;
    padding: 8px 12px;
    border: 1px solid ${props => props.hasError ? "#ef4444" : "#d1d5db"};
    border-radius: 6px;
    background-color: white;
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    align-items: center;
    cursor: pointer;
    
    &:focus-within {
        border-color: ${props => props.hasError ? "#ef4444" : "#3b82f6"};
        box-shadow: 0 0 0 3px ${props => props.hasError ? "rgba(239, 68, 68, 0.1)" : "rgba(59, 130, 246, 0.1)"};
    }
`;

const Tag = styled.span`
    background-color: #3b82f6;
    color: white;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 12px;
    display: flex;
    align-items: center;
    gap: 4px;
`;

const RemoveButton = styled.button`
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    font-size: 14px;
    padding: 0;
    
    &:hover {
        opacity: 0.8;
    }
`;

const Placeholder = styled.span`
    color: #9ca3af;
    font-size: 14px;
`;

const DropdownList = styled.div<{ isOpen: boolean }>`
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    max-height: 200px;
    overflow-y: auto;
    display: ${props => props.isOpen ? "block" : "none"};
`;

const DropdownItem = styled.div<{ selected: boolean }>`
    padding: 8px 12px;
    cursor: pointer;
    font-size: 14px;
    background-color: ${props => props.selected ? "#f3f4f6" : "white"};
    
    &:hover {
        background-color: #f9fafb;
    }
`;

const ErrorText = styled.span`
    font-size: 12px;
    color: #ef4444;
    margin-top: 4px;
`;

const MultiSelect = forwardRef<HTMLDivElement, MultiSelectProps>(({
    label,
    error,
    fullWidth,
    options,
    value = [],
    onChange,
    placeholder = "Seleccionar opciones...",
    ...props
}, ref) => {
    const [isOpen, setIsOpen] = useState(false);

    const selectedOptions = options.filter(option => value.includes(option.value));

    const handleToggleOption = (optionValue: string | number) => {
        const newValue = value.includes(optionValue)
            ? value.filter(v => v !== optionValue)
            : [...value, optionValue];
        onChange?.(newValue);
    };

    const handleRemoveTag = (optionValue: string | number) => {
        const newValue = value.filter(v => v !== optionValue);
        onChange?.(newValue);
    };

    return (
        <MultiSelectContainer fullWidth={fullWidth} ref={ref} {...props}>
            {label && <Label>{label}</Label>}
            <SelectWrapper>
                <SelectedItems 
                    hasError={!!error}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {selectedOptions.length > 0 ? (
                        selectedOptions.map(option => (
                            <Tag key={option.value}>
                                {option.label}
                                <RemoveButton
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleRemoveTag(option.value);
                                    }}
                                >
                                    ×
                                </RemoveButton>
                            </Tag>
                        ))
                    ) : (
                        <Placeholder>{placeholder}</Placeholder>
                    )}
                </SelectedItems>
                
                <DropdownList isOpen={isOpen}>
                    {options.map(option => (
                        <DropdownItem
                            key={option.value}
                            selected={value.includes(option.value)}
                            onClick={() => handleToggleOption(option.value)}
                        >
                            {option.label}
                        </DropdownItem>
                    ))}
                </DropdownList>
            </SelectWrapper>
            {error && <ErrorText>{error}</ErrorText>}
        </MultiSelectContainer>
    );
});

MultiSelect.displayName = "MultiSelect";

export default MultiSelect;