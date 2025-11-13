import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      primaryLight: string;
      primaryDark: string;
      white: string;
      black: string;
      gray50: string;
      gray100: string;
      gray200: string;
      gray300: string;
      gray400: string;
      gray500: string;
      gray600: string;
      gray700: string;
      gray800: string;
      gray900: string;
      success: string;
      warning: string;
      error: string;
      info: string;
      background: string;
      backgroundSecondary: string;
      surface: string;
      text: string;
      textSecondary: string;
      textMuted: string;
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    layout: {
      sidebarWidth: string;
    };
  }
}