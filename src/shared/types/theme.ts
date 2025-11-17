const lightTheme = {
    colors: {
        // Primary palette - Deep Indigo
        primary: '#4338CA',
        primaryLight: '#6366F1',
        primaryDark: '#3730A3',
        primaryHover: '#5B21B6',
        
        // Secondary palette - Emerald (from TenantSelector)
        secondary: '#10B981',
        secondaryLight: '#34D399',
        secondaryDark: '#059669',
        
        // Accent colors
        accent: '#F59E0B',
        accentLight: '#FCD34D',
        accentDark: '#D97706',
        
        // Neutrals - White, Black, Grays
        white: '#FFFFFF',
        black: '#000000',
        gray25: '#FCFCFD',
        gray50: '#F9FAFB',
        gray100: '#F3F4F6',
        gray200: '#E5E7EB',
        gray300: '#D1D5DB',
        gray400: '#9CA3AF',
        gray500: '#6B7280',
        gray600: '#4B5563',
        gray700: '#374151',
        gray800: '#1F2937',
        gray900: '#111827',
        gray950: '#030712',
        
        // Semantic colors
        success: '#10B981',
        successLight: '#D1FAE5',
        successDark: '#065F46',
        warning: '#F59E0B',
        warningLight: '#FEF3C7',
        warningDark: '#92400E',
        error: '#EF4444',
        errorLight: '#FEE2E2',
        errorDark: '#991B1B',
        info: '#3B82F6',
        infoLight: '#DBEAFE',
        infoDark: '#1E40AF',
        
        // Special colors (from TenantSelector)
        successBg: '#F0FCF3',
        successBorder: '#BAF7CF',
        successText: '#166334',
        successIndicator: '#23C45E',
        
        // Background variants
        background: '#F9FAFB',
        backgroundSecondary: '#FFFFFF',
        backgroundTertiary: '#F3F4F6',
        surface: '#FFFFFF',
        surfaceHover: '#F9FAFB',
        overlay: 'rgba(0, 0, 0, 0.5)',
        
        // Text variants
        text: '#111827',
        textSecondary: '#6B7280',
        textMuted: '#9CA3AF',
        textInverse: '#FFFFFF',
        textDisabled: '#D1D5DB',
        
        // Border colors
        border: '#E5E7EB',
        borderLight: '#F3F4F6',
        borderDark: '#D1D5DB',
        borderFocus: '#3B82F6'
    }
};

const darkTheme = {
    colors: {
        // Primary palette - Deep Indigo (adjusted for dark)
        primary: '#6366F1',
        primaryLight: '#8B5CF6',
        primaryDark: '#4338CA',
        primaryHover: '#7C3AED',
        
        // Secondary palette - Emerald
        secondary: '#34D399',
        secondaryLight: '#6EE7B7',
        secondaryDark: '#10B981',
        
        // Accent colors
        accent: '#FCD34D',
        accentLight: '#FDE68A',
        accentDark: '#F59E0B',
        
        // Neutrals - Inverted
        white: '#111827',
        black: '#FFFFFF',
        gray25: '#030712',
        gray50: '#111827',
        gray100: '#1F2937',
        gray200: '#374151',
        gray300: '#4B5563',
        gray400: '#6B7280',
        gray500: '#9CA3AF',
        gray600: '#D1D5DB',
        gray700: '#E5E7EB',
        gray800: '#F3F4F6',
        gray900: '#F9FAFB',
        gray950: '#FCFCFD',
        
        // Semantic colors (dark variants)
        success: '#34D399',
        successLight: '#064E3B',
        successDark: '#6EE7B7',
        warning: '#FCD34D',
        warningLight: '#451A03',
        warningDark: '#FDE68A',
        error: '#F87171',
        errorLight: '#450A0A',
        errorDark: '#FCA5A5',
        info: '#60A5FA',
        infoLight: '#0C1E3E',
        infoDark: '#93C5FD',
        
        // Special colors (dark variants)
        successBg: '#064E3B',
        successBorder: '#065F46',
        successText: '#6EE7B7',
        successIndicator: '#34D399',
        
        // Background variants
        background: '#111827',
        backgroundSecondary: '#1F2937',
        backgroundTertiary: '#374151',
        surface: '#1F2937',
        surfaceHover: '#374151',
        overlay: 'rgba(0, 0, 0, 0.8)',
        
        // Text variants
        text: '#F9FAFB',
        textSecondary: '#D1D5DB',
        textMuted: '#9CA3AF',
        textInverse: '#111827',
        textDisabled: '#6B7280',
        
        // Border colors
        border: '#374151',
        borderLight: '#4B5563',
        borderDark: '#1F2937',
        borderFocus: '#60A5FA'
    }
};

const commonTheme = {
    spacing: {
        xxs: '0.125rem',    // 2px
        xs: '0.25rem',      // 4px
        sm: '0.5rem',       // 8px
        md: '1rem',         // 16px
        lg: '1.5rem',       // 24px
        xl: '2rem',         // 32px
        xxl: '3rem',        // 48px
        xxxl: '4rem'        // 64px
    },
    fontSize: {
        xs: '0.75rem',      // 12px
        sm: '0.875rem',     // 14px
        base: '1rem',       // 16px
        lg: '1.125rem',     // 18px
        xl: '1.25rem',      // 20px
        '2xl': '1.5rem',    // 24px
        '3xl': '1.875rem',  // 30px
        '4xl': '2.25rem',   // 36px
        '5xl': '3rem',      // 48px
        '6xl': '3.75rem'    // 60px
    },
    fontWeight: {
        thin: 100,
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
        extrabold: 800,
        black: 900
    },
    borderRadius: {
        none: '0',
        sm: '0.125rem',     // 2px
        base: '0.25rem',    // 4px
        md: '0.375rem',     // 6px
        lg: '0.5rem',       // 8px
        xl: '0.75rem',      // 12px
        '2xl': '1rem',      // 16px
        '3xl': '1.5rem',    // 24px
        full: '9999px'
    },
    shadows: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)'
    },
    layout: {
        sidebarWidth: '16.625rem',
        headerHeight: '3.33333rem',
        containerMaxWidth: '1200px',
        contentPadding: '1.5rem'
    },
    breakpoints: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px'
    },
    zIndex: {
        dropdown: 1000,
        sticky: 1020,
        fixed: 1030,
        modal: 1040,
        popover: 1050,
        tooltip: 1060
    }
};

export const lightThemeConfig = {
    ...commonTheme,
    ...lightTheme
};

export const darkThemeConfig = {
    ...commonTheme,
    ...darkTheme
};

// Default theme (light)
export const theme = lightThemeConfig;