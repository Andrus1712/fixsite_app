import { useState, type ReactNode } from "react";
import { TooltipContainer, TooltipContent, TooltipWrapper, type TooltipPosition } from "./TooltipStyles";

interface TooltipProps {
    children: ReactNode;
    content: ReactNode;
    position?: TooltipPosition;
    delay?: number;
    disabled?: boolean;
    fullWidth?: boolean;
}

export const Tooltip = ({
    children,
    content,
    position = "top",
    delay = 200,
    disabled = false,
    fullWidth = false
}: TooltipProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout> | null>(null);

    const showTooltip = () => {
        if (disabled) return;
        const id = setTimeout(() => {
            setIsVisible(true);
        }, delay);
        setTimeoutId(id);
    };

    const hideTooltip = () => {
        if (timeoutId) {
            clearTimeout(timeoutId);
            setTimeoutId(null);
        }
        setIsVisible(false);
    };

    return (
        <TooltipWrapper
            onMouseEnter={showTooltip}
            onMouseLeave={hideTooltip}
            onFocus={showTooltip}
            onBlur={hideTooltip}
            $fullWidth={fullWidth}
        >
            {children}
            {isVisible && (
                <TooltipContainer $position={position}>
                    <TooltipContent $position={position}>
                        {content}
                    </TooltipContent>
                </TooltipContainer>
            )}
        </TooltipWrapper>
    );
};

export default Tooltip;
