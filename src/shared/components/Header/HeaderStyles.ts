import styled from "styled-components";

export const HeaderContent = styled.header`
    height: ${(props) => props.theme.layout.headerHeight};
    position: sticky;
    top: 0;
    width: 100%;
    transition: background 300ms ease-out;
    background-color: ${(props) => props.theme.colors.primary};
    backdrop-filter: blur(5px);
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 1.5rem;
    justify-content: space-between;
`;

export const ItemUser = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.33333rem;
    height: 2.33333rem;
    cursor: pointer;
    background-color: ${(props) => props.theme.colors.gray500};
    border-radius: 50%;
    transition: background 300ms ease-out;
    &:hover {
        background-color: ${(props) => props.theme.colors.gray300};
    }
`;

export const BurgerButton = styled.button`
    display: block;
    background: none;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    color: ${(props) => props.theme.colors.gray700};
    padding: 0.5rem;
    border-radius: 4px;
    transition: background-color 0.2s;

    &:hover {
        background-color: ${(props) => props.theme.colors.gray100};
    }

    @media (max-width: 768px) {
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

export const OptionsContainer = styled.div`
    display: flex;
    gap: ${(props) => props.theme.spacing.md};
    align-items: center;
`;