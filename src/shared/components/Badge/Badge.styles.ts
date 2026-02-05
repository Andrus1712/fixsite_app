import styled from 'styled-components';

type BadgeVariant = 'success' | 'info' | 'warning' | 'danger' | 'default' | 'secondary' | 'outline';

interface BadgeStylesProps {
  variant: BadgeVariant;
}

const getVariantStyles = (variant: BadgeVariant, theme: any) => {
  const variants: Record<BadgeVariant, any> = {
    success: {
      backgroundColor: theme.colors.successLight,
      color: theme.colors.successDark,
      borderColor: theme.colors.success,
    },
    info: {
      backgroundColor: theme.colors.infoLight,
      color: theme.colors.infoDark,
      borderColor: theme.colors.info,
    },
    warning: {
      backgroundColor: theme.colors.warningLight,
      color: theme.colors.warningDark,
      borderColor: theme.colors.warning,
    },
    danger: {
      backgroundColor: theme.colors.errorLight,
      color: theme.colors.errorDark,
      borderColor: theme.colors.error,
    },
    default: {
      backgroundColor: theme.colors.gray100,
      color: theme.colors.gray700,
      borderColor: theme.colors.gray300,
    },
    secondary: {
      backgroundColor: theme.colors.secondaryLight,
      color: theme.colors.secondaryDark,
      borderColor: theme.colors.secondary,
    },
    outline: {
      backgroundColor: 'transparent',
      color: theme.colors.gray700,
      borderColor: theme.colors.border,
    },
  };

  return variants[variant];
};

export const BadgeContainer = styled.span<BadgeStylesProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  font-size: ${({ theme }) => theme.fontSize.xs};
  font-weight: ${({ theme }) => theme.fontWeight.semibold};
  border-radius: ${({ theme }) => theme.borderRadius['2xl']};
  border: 1px solid;
  white-space: nowrap;
  transition: all 0.2s ease-in-out;

  ${({ variant, theme }) => {
    const styles = getVariantStyles(variant, theme);
    return `
      background-color: ${styles.backgroundColor};
      color: ${styles.color};
      border-color: ${styles.borderColor};
    `;
  }}

  &:hover {
    opacity: 0.9;
  }
`;
