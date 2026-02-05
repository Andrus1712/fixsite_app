const lightTheme = {
    colors: {
        // Primary palette - Digital Cobalt
        primary: '#2E5BFF',
        primaryLight: '#5E81FF',
        primaryDark: '#1A3FB4',
        primaryHover: '#254EDB',

        // Secondary palette - Vibrant Emerald
        secondary: '#00D18F',
        secondaryLight: '#34E8B0',
        secondaryDark: '#00A873',

        // Accent colors
        accent: '#F59E0B',
        accentLight: '#FCD34D',
        accentDark: '#D97706',

        // Standard colors (Convenience aliases)
        red: '#EF4444',
        blue: '#2E5BFF',
        green: '#22C55E',
        yellow: '#EAB308',
        orange: '#F97316',
        purple: '#A855F7',
        pink: '#EC4899',
        cyan: '#06B6D4',
        teal: '#14B8A6',
        lime: '#84CC16',

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
        // Primary palette - Digital Cobalt (Dark mode adjusted)
        primary: '#4D7BFF',
        primaryLight: '#7A9EFF',
        primaryDark: '#2E5BFF',
        primaryHover: '#5E81FF',

        // Secondary palette - Vibrant Emerald
        secondary: '#34E8B0',
        secondaryLight: '#6EEFCF',
        secondaryDark: '#00D18F',

        // Accent colors
        accent: '#FCD34D',
        accentLight: '#FDE68A',
        accentDark: '#F59E0B',

        // Standard colors (Convenience aliases)
        red: '#F87171',
        blue: '#4D7BFF',
        green: '#4ADE80',
        yellow: '#FDE047',
        orange: '#FB923C',
        purple: '#C084FC',
        pink: '#F472B6',
        cyan: '#22D3EE',
        teal: '#2DD4BF',
        lime: '#A3E635',

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
        sidebarWidth: '18.625rem',
        sidebarCollapsedWidth: '4rem',
        headerHeight: '3.33333rem',
        containerMaxWidth: '1200px',
        contentPaddingY: '0.75rem',
        contentPaddingX: '1.25rem'
    },
    breakpoints: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px'
    },
    palette: {
        red: {
            50: '#FEF2F2', 100: '#FEE2E2', 200: '#FECACA', 300: '#FCA5A5', 400: '#F87171',
            500: '#EF4444', 600: '#DC2626', 700: '#B91C1C', 800: '#991B1B', 900: '#7F1D1D', 950: '#450A0A'
        },
        blue: {
            50: '#F0F4FF', 100: '#E1E9FF', 200: '#C2D2FF', 300: '#A4BCFF', 400: '#85A5FF',
            500: '#2E5BFF', 600: '#264ED4', 700: '#1E40A9', 800: '#16327E', 900: '#0E2453', 950: '#07122A'
        },
        green: {
            50: '#F0FDF4', 100: '#DCFCE7', 200: '#BBF7D0', 300: '#86EFAC', 400: '#4ADE80',
            500: '#22C55E', 600: '#16A34A', 700: '#15803D', 800: '#166534', 900: '#14532D', 950: '#052E16'
        },
        yellow: {
            50: '#FEFCE8', 100: '#FEF9C3', 200: '#FEF08A', 300: '#FDE047', 400: '#FACC15',
            500: '#EAB308', 600: '#CA8A04', 700: '#A16207', 800: '#854D0E', 900: '#713F12', 950: '#422006'
        },
        orange: {
            50: '#FFF7ED', 100: '#FFEDD5', 200: '#FED7AA', 300: '#FDBA74', 400: '#FB923C',
            500: '#F97316', 600: '#EA580C', 700: '#C2410C', 800: '#9A3412', 900: '#7C2D12', 950: '#431407'
        },
        purple: {
            50: '#FAF5FF', 100: '#F3E8FF', 200: '#E9D5FF', 300: '#D8B4FE', 400: '#C084FC',
            500: '#A855F7', 600: '#9333EA', 700: '#7E22CE', 800: '#6B21A8', 900: '#581C87', 950: '#3B0764'
        },
        indigo: {
            50: '#EEF2FF', 100: '#E0E7FF', 200: '#C7D2FE', 300: '#A5B4FC', 400: '#818CF8',
            500: '#6366F1', 600: '#4F46E5', 700: '#4338CA', 800: '#3730A3', 900: '#312E81', 950: '#1E1B4B'
        },
        slate: {
            50: '#F8FAFC', 100: '#F1F5F9', 200: '#E2E8F0', 300: '#CBD5E1', 400: '#94A3B8',
            500: '#64748B', 600: '#475569', 700: '#334155', 800: '#1E293B', 900: '#0F172A', 950: '#020617'
        }
    },
    zIndex: {
        dropdown: 1050,
        sticky: 1020,
        fixed: 1030,
        modal: 1040,
        popover: 1000,
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