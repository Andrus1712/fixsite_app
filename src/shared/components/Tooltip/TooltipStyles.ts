import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
`;

export type TooltipPosition = "top" | "bottom" | "left" | "right";

export const TooltipWrapper = styled.div<{ $fullWidth?: boolean }>`
  position: relative;
  display: ${(props) => (props.$fullWidth ? "flex" : "inline-flex")};
  width: ${(props) => (props.$fullWidth ? "100%" : "auto")};
  align-items: center;
  justify-content: center;
`;

export const TooltipContainer = styled.div<{ $position: TooltipPosition }>`
  position: absolute;
  pointer-events: none;
  z-index: 1000;
  display: flex;

  ${(props) => {
    switch (props.$position) {
      case "top":
        return `
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          padding-bottom: 8px;
          justify-content: center;
        `;
      case "bottom":
        return `
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          padding-top: 8px;
          justify-content: center;
        `;
      case "left":
        return `
          right: 100%;
          top: 50%;
          transform: translateY(-50%);
          padding-right: 8px;
          align-items: center;
        `;
      case "right":
        return `
          left: 100%;
          top: 50%;
          transform: translateY(-50%);
          padding-left: 8px;
          align-items: center;
        `;
    }
  }}
`;

export const TooltipContent = styled.div<{ $position: TooltipPosition }>`
  background-color: ${(props) => props.theme.colors.gray800};
  color: ${(props) => props.theme.colors.white};
  padding: ${(props) => `${props.theme.spacing.xs} ${props.theme.spacing.sm}`};
  border-radius: ${(props) => props.theme.borderRadius.md};
  font-size: ${(props) => props.theme.fontSize.xs};
  font-weight: ${(props) => props.theme.fontWeight.medium};
  white-space: nowrap;
  box-shadow: ${(props) => props.theme.shadows.lg};
  animation: ${fadeIn} 0.2s ease-out;
  position: relative;

  /* Tooltip Arrow */
  &::after {
    content: "";
    position: absolute;
    border-width: 5px;
    border-style: solid;
  }

  ${(props) => {
    switch (props.$position) {
      case "top":
        return `
          &::after {
            top: 100%;
            left: 50%;
            margin-left: -5px;
            border-color: ${props.theme.colors.gray800} transparent transparent transparent;
          }
        `;
      case "bottom":
        return `
          &::after {
            bottom: 100%;
            left: 50%;
            margin-left: -5px;
            border-color: transparent transparent ${props.theme.colors.gray800} transparent;
          }
        `;
      case "left":
        return `
          &::after {
            left: 100%;
            top: 50%;
            margin-top: -5px;
            border-color: transparent transparent transparent ${props.theme.colors.gray800};
          }
        `;
      case "right":
        return `
          &::after {
            right: 100%;
            top: 50%;
            margin-top: -5px;
            border-color: transparent ${props.theme.colors.gray800} transparent transparent;
          }
        `;
    }
  }}
`;
