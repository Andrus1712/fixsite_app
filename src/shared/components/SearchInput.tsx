import styled from "styled-components";

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

interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
}

export default function SearchInput({ value, onChange, placeholder = "Buscar..." }: SearchInputProps) {
    return (
        <SearchContainer>
            <SearchIcon>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21 20l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 9.607z" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </SearchIcon>
            <SearchInputField
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
            />
            {value && (
                <ClearButton onClick={() => onChange("")}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </ClearButton>
            )}
        </SearchContainer>
    );
}