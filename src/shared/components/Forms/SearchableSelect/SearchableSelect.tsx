import { forwardRef, useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import {
    ClearButton,
    DropdownItem,
    DropdownList,
    ErrorText,
    InputWrapper,
    Label,
    LoadingItem,
    NoOptions,
    SelectContainer,
    StyledSearchInput
} from "./SearchableSelectStyles";

interface Option {
    value: string | number;
    label: string;
    disabled?: boolean;
}

export interface SearchableSelectProps {
    label?: string;
    error?: string;
    fullWidth?: boolean;
    options: Option[];
    placeholder?: string;
    value?: string | number;
    onChange?: (value: string | number | null) => void;
    onSearch?: (searchTerm: string) => void;
    loading?: boolean;
    isLoading?: boolean;
    serverError?: any;
    name?: string;
    allowClear?: boolean;
}

const SearchableSelect = forwardRef<HTMLInputElement, SearchableSelectProps>(({
    label,
    error,
    fullWidth,
    options,
    placeholder,
    value,
    onChange,
    onSearch,
    loading = false,
    isLoading = false,
    serverError,
    name,
    allowClear = true,
    ...props
}, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [displayValue, setDisplayValue] = useState("");
    const containerRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLUListElement | null>(null);
    const [dropdownStyle, setDropdownStyle] = useState<React.CSSProperties | null>(null);

    // Debounce search term
    useEffect(() => {
        const timer = setTimeout(() => {
            onSearch?.(searchTerm);
        }, 300);
        return () => clearTimeout(timer);
    }, [searchTerm, onSearch]);

    useEffect(() => {
        if (value) {
            const selectedOption = options.find(option => option.value === value);
            setDisplayValue(selectedOption?.label || "");
        } else {
            setDisplayValue("");
        }
    }, [value, options]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            const insideContainer = containerRef.current && containerRef.current.contains(target);
            const insideDropdown = dropdownRef.current && dropdownRef.current.contains(target);
            if (!insideContainer && !insideDropdown) {
                setIsOpen(false);
                setSearchTerm("");
                if (value) {
                    const selectedOption = options.find(option => option.value === value);
                    setDisplayValue(selectedOption?.label || "");
                }
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [value, options]);

    // Calculate dropdown position when opened and on resize/scroll
    useEffect(() => {
        if (!isOpen) {
            setDropdownStyle(null);
            return;
        }

        const updatePosition = () => {
            const el = containerRef.current;
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const style: React.CSSProperties = {
                position: "absolute",
                top: rect.bottom + window.scrollY,
                left: rect.left + window.scrollX,
                width: rect.width,
                zIndex: 10050,
            };
            setDropdownStyle(style);
        };

        updatePosition();
        window.addEventListener("resize", updatePosition);
        window.addEventListener("scroll", updatePosition, true);
        return () => {
            window.removeEventListener("resize", updatePosition);
            window.removeEventListener("scroll", updatePosition, true);
        };
    }, [isOpen]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setSearchTerm(inputValue);
        setDisplayValue(inputValue);
        setIsOpen(true);
    };

    const handleOptionSelect = (option: Option) => {
        if (option.disabled) return;
        setDisplayValue(option.label);
        setSearchTerm("");
        setIsOpen(false);
        onChange?.(option.value);
    };

    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation();
        setDisplayValue("");
        setSearchTerm("");
        onChange?.(null);
    };

    const handleInputFocus = () => {
        if (isOpen) {
            setIsOpen(false);
            setSearchTerm("");
            if (value) {
                const selectedOption = options.find(option => option.value === value);
                setDisplayValue(selectedOption?.label || "");
            }
        } else {
            setIsOpen(true);
            setSearchTerm(displayValue);
            setDisplayValue("");
        }
    };

    return (
        <SelectContainer $fullWidth={fullWidth} ref={containerRef}>
            {label && <Label>{label}</Label>}
            <InputWrapper>
                <StyledSearchInput
                    ref={ref}
                    name={name}
                    value={isOpen ? searchTerm : displayValue}
                    onChange={handleInputChange}
                    onClick={handleInputFocus}
                    placeholder={displayValue === "" && !isOpen ? (placeholder || "Seleccione una opción") : placeholder}
                    $hasError={!!error}
                    $hasValue={!!displayValue && allowClear}
                    autoComplete="off"
                    {...props}
                />
                {displayValue && allowClear && (
                    <ClearButton onClick={handleClear} type="button">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                        </svg>
                    </ClearButton>
                )}
                {/* Dropdown is rendered via portal to avoid being clipped by overflow parents (e.g., Modal) */}
            </InputWrapper>
            {isOpen && dropdownStyle && createPortal(
                <DropdownList
                    ref={(node: any) => (dropdownRef.current = node)}
                    $isOpen={isOpen}
                    style={dropdownStyle}
                >
                    {(loading || isLoading) ? (
                        <LoadingItem>Buscando...</LoadingItem>
                    ) : serverError ? (
                        <LoadingItem>Error al cargar opciones</LoadingItem>
                    ) : options.length === 0 ? (
                        <NoOptions>No se encontraron opciones</NoOptions>
                    ) : (
                        <>
                            {value && allowClear && (
                                <DropdownItem $active={false} onClick={handleClear}>
                                    <em>Limpiar selección</em>
                                </DropdownItem>
                            )}
                            {options.map((option) => (
                                <DropdownItem
                                    key={option.value}
                                    $active={option.value === value}
                                    $disabled={option.disabled}
                                    onClick={() => handleOptionSelect(option)}
                                >
                                    {option.label}
                                </DropdownItem>
                            ))}
                        </>
                    )}
                </DropdownList>,
                document.body
            )}
            {error && <ErrorText>{error}</ErrorText>}
        </SelectContainer>
    );
});

SearchableSelect.displayName = "SearchableSelect";

export default SearchableSelect;
