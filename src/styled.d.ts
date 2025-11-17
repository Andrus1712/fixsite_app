import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      // Primary palette
      primary: string;
      primaryLight: string;
      primaryDark: string;
      primaryHover: string;
      
      // Secondary palette
      secondary: string;
      secondaryLight: string;
      secondaryDark: string;
      
      // Accent colors
      accent: string;
      accentLight: string;
      accentDark: string;
      
      // Neutrals
      white: string;
      black: string;
      gray25: string;
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
      gray950: string;
      
      // Semantic colors
      success: string;
      successLight: string;
      successDark: string;
      warning: string;
      warningLight: string;
      warningDark: string;
      error: string;
      errorLight: string;
      errorDark: string;
      info: string;
      infoLight: string;
      infoDark: string;
      
      // Special colors
      successBg: string;
      successBorder: string;
      successText: string;
      successIndicator: string;
      
      // Background variants
      background: string;
      backgroundSecondary: string;
      backgroundTertiary: string;
      surface: string;
      surfaceHover: string;
      overlay: string;
      
      // Text variants
      text: string;
      textSecondary: string;
      textMuted: string;
      textInverse: string;
      textDisabled: string;
      
      // Border colors
      border: string;
      borderLight: string;
      borderDark: string;
      borderFocus: string;
    };
    spacing: {
      xxs: string;
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
      xxxl: string;
    };
    fontSize: {
      xs: string;
      sm: string;
      base: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
      '4xl': string;
      '5xl': string;
      '6xl': string;
    };
    fontWeight: {
      thin: number;
      light: number;
      normal: number;
      medium: number;
      semibold: number;
      bold: number;
      extrabold: number;
      black: number;
    };
    borderRadius: {
      none: string;
      sm: string;
      base: string;
      md: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
      full: string;
    };
    shadows: {
      sm: string;
      base: string;
      md: string;
      lg: string;
      xl: string;
      '2xl': string;
      inner: string;
    };
    layout: {
      sidebarWidth: string;
      headerHeight: string;
      containerMaxWidth: string;
      contentPadding: string;
    };
    breakpoints: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
      '2xl': string;
    };
    zIndex: {
      dropdown: number;
      sticky: number;
      fixed: number;
      modal: number;
      popover: number;
      tooltip: number;
    };
  }
}