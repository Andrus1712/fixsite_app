import styled from "styled-components";
import { forwardRef, useState, useRef, useEffect } from "react";

interface Option {
    value: string | number;
    label: string;
    disabled?: boolean;
}

interface SearchableSelectProps {
    label?: string;
    error?: string;
    fullWidth?: boolean;
    options: Option[];
    placeholder?: string;
    value?: string | number;
    onChange?: (value: string | number) => void;
    onSearch?: (searchTerm: string) => void;
    loading?: boolean;
    name?: string;
}

const SelectContainer = styled.div<{ fullWidth?: boolean }>`
    display: flex;
    flex-direction: column;
    width: ${props => props.fullWidth ? "100%" : "auto"};
    position: relative;
`;

const Label = styled.label`
    font-size: 14px;
    font-weight: 500;
    color: #374151;
    margin-bottom: 6px;
`;

const InputWrapper = styled.div`
    position: relative;
`;

const SearchInput = styled.input<{ hasError?: boolean }>`
    width: 100%;
    padding: 12px 16px;
    font-size: 14px;
    border: 1px solid ${props => props.hasError ? "#ef4444" : "#d1d5db"};
    border-radius: 6px;
    background-color: white;
    cursor: pointer;
    transition: all 0.2s;
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
    background-position: right 12px center;
    background-repeat: no-repeat;
    background-size: 16px;
    padding-right: 44px;
    
    &:focus {
        outline: none;
        border-color: ${props => props.hasError ? "#ef4444" : "#3b82f6"};
        box-shadow: 0 0 0 3px ${props => props.hasError ? "rgba(239, 68, 68, 0.1)" : "rgba(59, 130, 246, 0.1)"};
    }
`;

const DropdownList = styled.ul<{ isOpen: boolean }>`
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    max-height: 200px;
    overflow-y: auto;
    z-index: 1000;
    margin: 0;
    padding: 0;
    list-style: none;
    display: ${props => props.isOpen ? "block" : "none"};
`;

const DropdownItem = styled.li<{ isSelected?: boolean }>`
    padding: 12px 16px;
    cursor: pointer;
    background-color: ${props => props.isSelected ? "#f3f4f6" : "white"};
    
    &:hover {
        background-color: #f9fafb;
    }
    
    &:first-child {
        border-radius: 6px 6px 0 0;
    }
    
    &:last-child {
        border-radius: 0 0 6px 6px;
    }
`;

const ErrorText = styled.span`
    font-size: 12px;
    color: #ef4444;
    margin-top: 4px;
`;

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
    name,
    ...props
}, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [displayValue, setDisplayValue] = useState("");
    const containerRef = useRef<HTMLDivElement>(null);

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
        }
    }, [value, options]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setSearchTerm(inputValue);
        setDisplayValue(inputValue);
        setIsOpen(true);
    };

    const handleOptionSelect = (option: Option) => {
        setDisplayValue(option.label);
        setSearchTerm("");
        setIsOpen(false);
        onChange?.(option.value);
    };

    const handleInputFocus = () => {
        setIsOpen(true);
        setSearchTerm(displayValue);
        setDisplayValue("");
    };

    return (
        <SelectContainer fullWidth={fullWidth} ref={containerRef}>
            {label && <Label>{label}</Label>}
            <InputWrapper>
                <SearchInput
                    ref={ref}
                    name={name}
                    value={isOpen ? searchTerm : displayValue}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    placeholder={placeholder}
                    hasError={!!error}
                    autoComplete="off"
                    {...props}
                />
                <DropdownList isOpen={isOpen}>
                    {loading ? (
                        <DropdownItem>Buscando...</DropdownItem>
                    ) : options.length === 0 ? (
                        <DropdownItem>No se encontraron opciones</DropdownItem>
                    ) : (
                        options.map((option) => (
                            <DropdownItem
                                key={option.value}
                                isSelected={option.value === value}
                                onClick={() => handleOptionSelect(option)}
                            >
                                {option.label}
                            </DropdownItem>
                        ))
                    )}
                </DropdownList>
            </InputWrapper>
            {error && <ErrorText>{error}</ErrorText>}
        </SelectContainer>
    );
});

SearchableSelect.displayName = "SearchableSelect";

export default SearchableSelect;