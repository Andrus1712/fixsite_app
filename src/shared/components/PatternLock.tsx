import { useState, useCallback, useEffect, type MouseEvent, type TouchEvent } from "react";
import styled, { css, keyframes } from "styled-components";
import { Card } from "./Card";
import { Column, Flex, Grid, Row } from "./Layouts";
import { FaRegTrashAlt, FaSave } from "react-icons/fa";
import { MdOutlineReplay } from "react-icons/md";
import { CiPlay1 } from "react-icons/ci";
import ButtonGroup from "./Buttons/ButtonGroup";
import IconButton from "./Buttons/IconButton";

// --- 1. Tipos de TypeScript ---

interface PatternLockProps {
    // Función para devolver el patrón al componente padre (ej: "1-5-9-8")
    onPatternComplete: (patternSequence: string) => void;
    // Patrón precargado desde la BD (opcional)
    initialPattern?: string;
}

// Interfaz para las coordenadas de un punto
interface Coords {
    x: number;
    y: number;
}

const Grid1 = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  /* width: 220px; */
  /* height: 220px; */
  position: relative;
  /* padding: 10px; */
  /* background: white; */
  /* border-radius: 8px; */
  /* border: 1px solid #f3f4f6; */
`;

const dotPulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1.1); }
`;

const Dot = styled.div<{ $selected: boolean; $order?: number; $saved?: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${(props) => {
      if (props.$selected && props.$saved) {
          return "linear-gradient(135deg, #10b981 0%, #059669 100%)";
      } else if (props.$selected) {
          return "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)";
      } else {
          return "linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%)";
      }
  }};
  border: 3px solid ${(props) => {
      if (props.$selected && props.$saved) {
          return "#047857";
      } else if (props.$selected) {
          return "#1e40af";
      } else {
          return "#9ca3af";
      }
  }};
  cursor: pointer;
  z-index: 10;
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => (props.$selected ? "white" : "#6b7280")};
  font-weight: 600;
  font-size: 14px;
  box-shadow: ${(props) => {
      if (props.$selected && props.$saved) {
          return "0 4px 12px rgba(16, 185, 129, 0.4)";
      } else if (props.$selected) {
          return "0 4px 12px rgba(59, 130, 246, 0.4)";
      } else {
          return "0 2px 4px rgba(0, 0, 0, 0.1)";
      }
  }};

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  }

  ${(props) =>
      props.$selected &&
      css`
    animation: ${dotPulse} 0.6s ease-out;
  `}

  &::after {
    content: '${(props) => props.$order || ""}';
    position: absolute;
    top: -8px;
    right: -8px;
    width: 20px;
    height: 20px;
    background: #ef4444;
    border-radius: 50%;
    display: ${(props) => (props.$order ? "flex" : "none")};
    align-items: center;
    justify-content: center;
    font-size: 10px;
    color: white;
    font-weight: bold;
    border: 2px solid white;
  }
`;

const Line = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 5;
`;

const AnimatedPath = styled.path<{ $delay?: number }>`
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: drawLine 0.5s ease-out forwards;
  animation-delay: ${(props) => props.$delay || 0}ms;
  
  @keyframes drawLine {
    to {
      stroke-dashoffset: 0;
    }
  }
`;

// --- 3. Componente Principal ---

const PatternLock = ({ onPatternComplete, initialPattern }: PatternLockProps) => {
    // Convertir el string inicial ("1-5-9") a un array de números [1, 5, 9]
    const initialArray: number[] = initialPattern
        ? // 1. Verificar si initialPattern existe
          initialPattern
              // 2. Separar por guiones
              .split("-")
              // 3. Convertir cada parte a Número
              .map(Number)
              // 4. Filtrar para asegurar que son números válidos (opcional, pero buena práctica)
              .filter((n) => !isNaN(n))
        : [];

    // savedPattern debe inicializarse con el array de números (ej: [1, 5, 9])
    const [savedPattern, setSavedPattern] = useState<number[]>(initialArray);

    // Estado para el patrón que el usuario está dibujando actualmente
    const [currentDrawingPattern, setCurrentDrawingPattern] = useState<number[]>([]);

    const [isDrawing, setIsDrawing] = useState<boolean>(false);
    const [currentMousePos, setCurrentMousePos] = useState<Coords>({ x: 0, y: 0 });

    // Estados para la visualización paso a paso
    const [isReplaying, setIsReplaying] = useState<boolean>(false);
    const [replayStep, setReplayStep] = useState<number>(0);

    const dots: number[] = Array.from({ length: 9 }, (_, i) => i + 1);

    // Determina qué patrón mostrar
    const activePattern = isDrawing
        ? currentDrawingPattern
        : isReplaying
        ? (savedPattern.length > 0 ? savedPattern : currentDrawingPattern).slice(0, replayStep + 1)
        : savedPattern.length > 0
        ? savedPattern
        : currentDrawingPattern;

    const getDotCenter = useCallback((dotId: number): Coords | null => {
        const gridEl = document.getElementById("pattern-grid");
        const dotEl = document.getElementById(`dot-${dotId}`);

        if (!gridEl || !dotEl) return null;

        const gridRect = gridEl.getBoundingClientRect();
        const dotRect = dotEl.getBoundingClientRect();

        const x = dotRect.left + dotRect.width / 2 - gridRect.left;
        const y = dotRect.top + dotRect.height / 2 - gridRect.top;

        return { x, y };
    }, []);

    const handleStart = (id: number) => {
        // No permitir dibujar si ya hay un patrón guardado
        if (savedPattern.length > 0) return;

        setIsDrawing(true);
        setCurrentDrawingPattern([id]);
    };

    const handleMove = useCallback(
        (e: MouseEvent | TouchEvent) => {
            if (!isDrawing) return;

            let clientX: number | undefined;
            let clientY: number | undefined;

            if ("touches" in e) {
                // TouchEvent
                clientX = e.touches[0]?.clientX;
                clientY = e.touches[0]?.clientY;
            } else {
                // MouseEvent
                clientX = e.clientX;
                clientY = e.clientY;
            }

            if (clientX !== undefined && clientY !== undefined) {
                const gridEl = document.getElementById("pattern-grid");
                if (gridEl) {
                    const gridRect = gridEl.getBoundingClientRect();
                    const x = clientX - gridRect.left;
                    const y = clientY - gridRect.top;
                    setCurrentMousePos({ x, y });
                }
            }
        },
        [isDrawing]
    );

    const selectDot = (id: number) => {
        // No permitir seleccionar si ya hay un patrón guardado
        if (savedPattern.length > 0) return;

        if (isDrawing && !currentDrawingPattern.includes(id)) {
            setCurrentDrawingPattern((prev) => [...prev, id]);
        }
    };

    const handleEnd = useCallback(() => {
        if (isDrawing) {
            setIsDrawing(false);
        }
    }, [isDrawing]);

    // Función para guardar el patrón
    const handleSavePattern = () => {
        if (currentDrawingPattern.length > 0) {
            setSavedPattern(currentDrawingPattern);
            const finalPatternString = currentDrawingPattern.join("-");
            onPatternComplete(finalPatternString);
        }
    };

    // Función de limpieza de patrón
    const handleClearPattern = () => {
        setCurrentDrawingPattern([]);
        setSavedPattern([]);
        setIsReplaying(false);
        setReplayStep(0);
        onPatternComplete(""); // Notificar al padre
    };

    // Función para reproducir el patrón paso a paso
    const handleReplayPattern = () => {
        const patternToReplay = savedPattern.length > 0 ? savedPattern : currentDrawingPattern;
        if (patternToReplay.length === 0) return;

        setIsReplaying(true);
        setReplayStep(0);

        // Animar paso a paso
        patternToReplay.forEach((_, index) => {
            setTimeout(() => {
                setReplayStep(index);
                if (index === patternToReplay.length - 1) {
                    setTimeout(() => {
                        setIsReplaying(false);
                        setReplayStep(0);
                    }, 1000);
                }
            }, index * 600);
        });
    };

    // Dibujar las líneas (SVG) con animación
    const renderLines = () => {
        if (activePattern.length < 1) return null;

        // Obtener coordenadas de los puntos del patrón activo
        const points: Coords[] = activePattern.map(getDotCenter).filter((p): p is Coords => p !== null);
        const pathSegments: string[] = [];

        // Dibujar líneas entre puntos seleccionados
        for (let i = 0; i < points.length - 1; i++) {
            pathSegments.push(`M ${points[i].x} ${points[i].y} L ${points[i + 1].x} ${points[i + 1].y}`);
        }

        // Dibujar línea del último punto al cursor (solo si se está dibujando)
        if (isDrawing && points.length > 0) {
            const lastPoint = points[points.length - 1];
            pathSegments.push(`M ${lastPoint.x} ${lastPoint.y} L ${currentMousePos.x} ${currentMousePos.y}`);
        }

        return (
            <Line>
                {isReplaying ? (
                    // Durante replay, animar cada línea individualmente
                    points.map((point, i) => {
                        if (i === points.length - 1) return null;
                        const nextPoint = points[i + 1];
                        const path = `M ${point.x} ${point.y} L ${nextPoint.x} ${nextPoint.y}`;

                        return (
                            <AnimatedPath
                                key={`replay-line-${i}`}
                                d={path}
                                stroke="#3b82f6"
                                strokeWidth="5"
                                fill="none"
                                strokeLinecap="round"
                                $delay={0}
                            />
                        );
                    })
                ) : (
                    // Modo normal, mostrar todas las líneas sin animación
                    <path
                        d={pathSegments.join(" ")}
                        stroke={savedPattern.length > 0 ? "#10b981" : "#3b82f6"}
                        strokeWidth="5"
                        fill="none"
                        strokeLinecap="round"
                    />
                )}
            </Line>
        );
    };

    // Event Listeners globales para detectar el fin del arrastre
    useEffect(() => {
        window.addEventListener("mouseup", handleEnd);
        window.addEventListener("touchend", handleEnd);
        // Usamos as any para evitar errores de sobrecarga de tipos en addEventListener
        window.addEventListener("mousemove", handleMove as any);
        window.addEventListener("touchmove", handleMove as any);

        return () => {
            window.removeEventListener("mouseup", handleEnd);
            window.removeEventListener("touchend", handleEnd);
            window.removeEventListener("mousemove", handleMove as any);
            window.removeEventListener("touchmove", handleMove as any);
        };
    }, [handleEnd, handleMove]);

    return (
        <div style={{ width: "400px", maxWidth: "100%" }}>
            <Row>
                <Card size="xs">
                    <Flex align="center" justify="center">
                        <Grid
                            id="pattern-grid"
                            onContextMenu={(e) => e.preventDefault()}
                            onTouchStart={(e) => e.preventDefault()}
                            onTouchMove={(e) => e.preventDefault()}
                            columns={3}
                            rows={3}
                            style={{ 
                                position: "relative", 
                                userSelect: "none",
                                touchAction: "none"
                            }}
                            gap={"xl"}
                        >
                            {renderLines()}
                            {dots.map((id) => {
                                const isSelected = activePattern.includes(id);
                                const order = isSelected ? activePattern.indexOf(id) + 1 : undefined;

                                return (
                                    <Dot
                                        key={id}
                                        id={`dot-${id}`}
                                        $selected={isSelected}
                                        $order={order}
                                        $saved={savedPattern.length > 0}
                                        onMouseDown={() => handleStart(id)}
                                        onMouseEnter={() => selectDot(id)}
                                        onTouchStart={(e) => {
                                            e.preventDefault();
                                            handleStart(id);
                                        }}
                                        onTouchMove={(e: TouchEvent) => {
                                            e.preventDefault();
                                            const touch = e.touches[0];
                                            if (touch) {
                                                const element = document.elementFromPoint(touch.clientX, touch.clientY);
                                                if (element && element.id.startsWith("dot-")) {
                                                    const dotId = parseInt(element.id.split("-")[1]);
                                                    selectDot(dotId);
                                                }
                                            }
                                        }}
                                    />
                                );
                            })}
                        </Grid>
                    </Flex>
                </Card>
                <Flex fullHeight align="center" justify="center" style={{ minHeight: "40px" }}>
                    {(currentDrawingPattern.length > 0 || savedPattern.length > 0) && !isDrawing && (
                        <ButtonGroup spacing="sm" orientation="vertical">
                            {currentDrawingPattern.length > 0 && savedPattern.length === 0 && (
                                <IconButton
                                    variant="solid"
                                    color="success"
                                    shape="square"
                                    icon={<FaSave />}
                                    onClick={handleSavePattern}
                                    disabled={isReplaying}
                                />
                            )}
                            <IconButton
                                variant="solid"
                                color="info"
                                shape="square"
                                icon={isReplaying ? <CiPlay1 /> : <MdOutlineReplay />}
                                onClick={handleReplayPattern}
                                disabled={isReplaying}
                            />
                            <IconButton
                                variant="solid"
                                color="danger"
                                shape="square"
                                icon={<FaRegTrashAlt />}
                                onClick={handleClearPattern}
                            />
                        </ButtonGroup>
                    )}
                </Flex>
            </Row>
            <div style={{ minHeight: "24px", textAlign: "left" }}>
                {savedPattern.length > 0 && (
                    <p style={{ color: "#10b981", margin: 0 }}>
                        ✅ Patrón guardado {savedPattern}(eliminar para dibujar nuevo)
                    </p>
                )}
                {savedPattern.length === 0 && currentDrawingPattern.length > 0 && !isDrawing && (
                    <p style={{ color: "#f59e0b", margin: 0 }}>⚠️ Patrón dibujado (no guardado)</p>
                )}
                {savedPattern.length === 0 && currentDrawingPattern.length === 0 && !isDrawing && (
                    <p style={{ color: "#aaa", margin: 0 }}>👆 Dibuja un nuevo patrón</p>
                )}
                {isDrawing && (
                    <p style={{ color: "#3f51b5", margin: 0 }}>✏️ Dibujando: **{currentDrawingPattern.join(" - ")}**</p>
                )}
                {isReplaying && (
                    <p style={{ color: "#f59e0b", margin: 0 }}>
                        🎬 Reproduciendo paso {replayStep + 1} de{" "}
                        {(savedPattern.length > 0 ? savedPattern : currentDrawingPattern).length}
                    </p>
                )}
            </div>
        </div>
    );
};

export default PatternLock;
