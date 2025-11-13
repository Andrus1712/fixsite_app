import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *, ::after, ::before {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    overscroll-behavior: none;
  }

  body {
    font-family: 'Inter', sans-serif;
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
  }
`;