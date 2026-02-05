import { useState, useRef, useEffect } from "react";
import {
    Chevron,
    ColorCircle,
    ColorName,
    ColorOptionItem,
    DropdownMenu,
    PickerContainer,
    SelectedColorDisplay,
    Label
} from "./ColorPickerStyles";

interface ColorOption {
    name: string;
    value: string;
    hex: string;
}

interface ColorPickerProps {
    value?: string;
    onChange?: (value: string) => void;
    label?: string;
}

const deviceColors: ColorOption[] = [
    { name: "Gris Espacial", value: "gris-espacial", hex: "#5d5d5d" },
    { name: "Negro", value: "negro", hex: "#000000" },
    { name: "Blanco", value: "blanco", hex: "#ffffff" },
    { name: "Rojo", value: "rojo", hex: "#ff0000" },
    { name: "Azul", value: "azul", hex: "#007aff" },
    { name: "Verde", value: "verde", hex: "#34c759" },
    { name: "Naranja", value: "naranja", hex: "#ff9500" },
    { name: "Rosa", value: "rosa", hex: "#ff2d92" },
    { name: "Morado", value: "morado", hex: "#af52de" },
    { name: "Dorado", value: "dorado", hex: "#ffd700" },
];

export const ColorPicker = ({ value, onChange, label }: ColorPickerProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const selectedColor = deviceColors.find(color => color.value === value);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <PickerContainer ref={containerRef}>
            {label && <Label>{label}</Label>}
            <SelectedColorDisplay $isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
                <ColorCircle $color={selectedColor?.hex || "#f3f4f6"} />
                <ColorName>
                    {selectedColor?.name || "Seleccionar color"}
                </ColorName>
                <Chevron $isOpen={isOpen}>▼</Chevron>
            </SelectedColorDisplay>

            {isOpen && (
                <DropdownMenu>
                    {deviceColors.map((color) => (
                        <ColorOptionItem
                            key={color.value}
                            $isActive={value === color.value}
                            onClick={() => {
                                onChange?.(color.value);
                                setIsOpen(false);
                            }}
                        >
                            <ColorCircle $color={color.hex} $size="16px" />
                            <ColorName>{color.name}</ColorName>
                        </ColorOptionItem>
                    ))}
                </DropdownMenu>
            )}
        </PickerContainer>
    );
};
