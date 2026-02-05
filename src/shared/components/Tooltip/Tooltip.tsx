import { useState, type ReactNode, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
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
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const [coords, setCoords] = useState<{ left: number; top: number } | null>(null);

    const computeCoords = useCallback(() => {
        if (!wrapperRef.current) return null;
        const rect = wrapperRef.current.getBoundingClientRect();
        switch (position) {
            case "top":
                return { left: rect.left + rect.width / 2, top: rect.top };
            case "bottom":
                return { left: rect.left + rect.width / 2, top: rect.bottom };
            case "left":
                return { left: rect.left, top: rect.top + rect.height / 2 };
            case "right":
            default:
                return { left: rect.right, top: rect.top + rect.height / 2 };
        }
    }, [position]);

    const clampToViewport = (x: number, y: number) => {
        const padding = 8;
        const left = Math.min(Math.max(x, padding), window.innerWidth - padding);
        const top = Math.min(Math.max(y, padding), window.innerHeight - padding);
        return { left, top };
    };

    const showTooltip = () => {
        if (disabled) return;
        const id = setTimeout(() => {
            const raw = computeCoords();
            if (raw) {
                const clamped = clampToViewport(raw.left, raw.top);
                setCoords(clamped);
            }
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

    useEffect(() => {
        if (!isVisible) return;

        const onScrollOrResize = () => {
            const raw = computeCoords();
            if (raw) setCoords(clampToViewport(raw.left, raw.top));
        };

        window.addEventListener("scroll", onScrollOrResize, { passive: true });
        window.addEventListener("resize", onScrollOrResize);

        return () => {
            window.removeEventListener("scroll", onScrollOrResize);
            window.removeEventListener("resize", onScrollOrResize);
        };
    }, [isVisible, computeCoords]);

    return (
        <TooltipWrapper
            ref={(el) => (wrapperRef.current = el)}
            onMouseEnter={showTooltip}
            onMouseLeave={hideTooltip}
            onFocus={showTooltip}
            onBlur={hideTooltip}
            $fullWidth={fullWidth}
        >
            {children}
            {isVisible && coords && createPortal(
                <TooltipContainer $position={position} style={{ left: `${coords.left}px`, top: `${coords.top}px` }}>
                    <TooltipContent $position={position}>
                        {content}
                    </TooltipContent>
                </TooltipContainer>,
                document.body
            )}
        </TooltipWrapper>
    );
};

export default Tooltip;
