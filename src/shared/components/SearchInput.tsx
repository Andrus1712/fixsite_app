import styled from "styled-components";
import { useState, useEffect, useRef } from "react";

const SearchContainer = styled.div`
    position: relative;
    width: 100%;
    max-width: 400px;
`;

const SearchInputField = styled.input`
    width: 100%;
    padding: 12px 16px 12px 44px;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    font-size: 14px;
    color: #374151;
    background-color: white;
    transition: all 0.2s;
    
    &:focus {
        outline: none;
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
    
    &::placeholder {
        color: #9ca3af;
    }
`;

const SearchIcon = styled.div`
    position: absolute;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: #6b7280;
    pointer-events: none;
`;

const ClearButton = styled.button`
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: #6b7280;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    
    &:hover {
        color: #374151;
        background-color: #f3f4f6;
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
    display: ${(props) => (props.isOpen ? "block" : "none")};
`;

interface SearchResult {
    id: string | number;
    label: string | React.ReactNode;
    displayValue?: string;
    [key: string]: any;
}

interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
    onSelect?: (result: SearchResult) => void;
    onSearch?: (query: string) => Promise<SearchResult[]>;
    placeholder?: string;
    debounceMs?: number;
    minChars?: number;
    loading?: boolean;
    results?: SearchResult[];
    selectedItem?: SearchResult;
    error?: string;
}

const LoadingSpinner = styled.div`
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
    border: 2px solid #e5e7eb;
    border-top: 2px solid #3b82f6;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    
    @keyframes spin {
        to { transform: translateY(-50%) rotate(360deg); }
    }
`;

const DropdownItem = styled.li`
    padding: 12px 16px;
    cursor: pointer;
    border-bottom: 1px solid #f3f4f6;
    
    &:hover {
        background-color: #f9fafb;
    }
    
    &:last-child {
        border-bottom: none;
    }
`;

const NoResults = styled.div`
    padding: 12px 16px;
    color: #6b7280;
    font-size: 14px;
    text-align: center;
`;

const ErrorMessage = styled.div`
    margin-top: 4px;
    font-size: 12px;
    color: #ef4444;
`;

export default function SearchInput({
    value,
    onChange,
    onSelect,
    onSearch,
    placeholder = "Buscar...",
    debounceMs = 300,
    minChars = 2,
    loading = false,
    results = [],
    selectedItem,
    error,
}: SearchInputProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [internalResults, setInternalResults] = useState<SearchResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const debounceRef = useRef<NodeJS.Timeout | undefined>();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        if (value.length >= minChars && onSearch) {
            debounceRef.current = setTimeout(async () => {
                setIsLoading(true);
                try {
                    const searchResults = await onSearch(value);
                    setInternalResults(searchResults);
                    setIsOpen(searchResults.length > 0);
                } catch (error) {
                    console.error("Search error:", error);
                    setInternalResults([]);
                } finally {
                    setIsLoading(false);
                }
            }, debounceMs);
        } else {
            setInternalResults([]);
            setIsOpen(false);
        }

        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }
        };
    }, [value, onSearch, debounceMs, minChars]);

    const displayResults = onSearch ? internalResults : results;
    const showLoading = onSearch ? isLoading : loading;

    const handleSelect = (result: SearchResult) => {
        const inputValue =
            result.displayValue || (typeof result.label === "string" ? result.label : result.id.toString());
        onChange(inputValue);
        onSelect?.(result);
        setIsOpen(false);
    };

    const showSelectedItem = selectedItem && !isOpen && value;

    return (
        <>
            <SearchContainer ref={containerRef}>
                <SearchIcon>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path
                            d="M21 20l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 9.607z"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </SearchIcon>
                {showSelectedItem ? (
                    <div
                        style={{
                            width: "100%",
                            padding: "12px 16px 12px 44px",
                            border: "1px solid #d1d5db",
                            borderRadius: "8px",
                            fontSize: "14px",
                            color: "#374151",
                            backgroundColor: "white",
                            cursor: "pointer",
                            minHeight: "20px",
                            display: "flex",
                            alignItems: "center",
                        }}
                        onClick={() => {
                            onChange("");
                            if (onSelect) {
                                onSelect(undefined as any);
                            }
                            setIsOpen(true);
                        }}
                    >
                        {selectedItem.label}
                    </div>
                ) : (
                    <SearchInputField
                        type="text"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        placeholder={placeholder}
                        onFocus={() => setIsOpen(true)}
                    />
                )}
                {showLoading && <LoadingSpinner />}
                {value && !showLoading && (
                    <ClearButton
                        onClick={() => {
                            onChange("");
                            setIsOpen(false);
                            // Limpiar selección si existe onSelect
                            if (onSelect && selectedItem) {
                                onSelect(undefined as any);
                            }
                        }}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path
                                d="M6 18L18 6M6 6l12 12"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </ClearButton>
                )}
                <DropdownList isOpen={isOpen && displayResults.length > 0}>
                    {displayResults.map((result) => (
                        <DropdownItem key={result.id} onClick={() => handleSelect(result)}>
                            {result.label}
                        </DropdownItem>
                    ))}
                </DropdownList>
                {isOpen && value.length >= minChars && displayResults.length === 0 && !showLoading && (
                    <DropdownList isOpen={true}>
                        <NoResults>No se encontraron resultados</NoResults>
                    </DropdownList>
                )}
            </SearchContainer>
            {error && <ErrorMessage>{error}</ErrorMessage>}
        </>
    );
}
