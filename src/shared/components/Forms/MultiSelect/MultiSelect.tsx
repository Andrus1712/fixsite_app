import { forwardRef, useState, useRef, useEffect, useImperativeHandle } from "react";
import {
    DropdownItem,
    DropdownList,
    ErrorText,
    Label,
    MultiSelectContainer,
    Placeholder,
    RemoveButton,
    SelectedItems,
    SelectWrapper,
    Tag
} from "./MultiSelectStyles";

interface Option {
    value: string | number;
    label: string;
}

export interface MultiSelectProps {
    label?: string;
    error?: string;
    fullWidth?: boolean;
    options: Option[];
    value?: (string | number)[];
    onChange?: (values: (string | number)[]) => void;
    placeholder?: string;
}

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
    const containerRef = useRef<HTMLDivElement>(null);
    const selectedOptions = options.filter(option => value.includes(option.value));

    // Export the container ref to the parent
    useImperativeHandle(ref, () => containerRef.current!);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

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
        <MultiSelectContainer $fullWidth={fullWidth} ref={containerRef} {...props}>
            {label && <Label>{label}</Label>}
            <SelectWrapper>
                <SelectedItems
                    $hasError={!!error}
                    $isOpen={isOpen}
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

                <DropdownList $isOpen={isOpen}>
                    {options.map(option => (
                        <DropdownItem
                            key={option.value}
                            $isActive={value.includes(option.value)}
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
