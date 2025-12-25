import { useState } from "react";
import { Label } from "../index";

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
    
    const selectedColor = deviceColors.find(color => color.value === value);

    return (
        <div style={{ position: "relative" }}>
            {label && <Label>{label}</Label>}
            <div
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "8px 12px",
                    border: "1px solid #d1d5db",
                    borderRadius: "6px",
                    cursor: "pointer",
                    backgroundColor: "#fff",
                    minHeight: "40px"
                }}
            >
                <div
                    style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50%",
                        backgroundColor: selectedColor?.hex || "#f3f4f6",
                        border: "1px solid #d1d5db"
                    }}
                />
                <span style={{ flex: 1 }}>
                    {selectedColor?.name || "Seleccionar color"}
                </span>
                <span style={{ fontSize: "12px", color: "#6b7280" }}>▼</span>
            </div>
            
            {isOpen && (
                <div
                    style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        right: 0,
                        backgroundColor: "#fff",
                        border: "1px solid #d1d5db",
                        borderRadius: "6px",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                        zIndex: 1000,
                        maxHeight: "200px",
                        overflowY: "auto"
                    }}
                >
                    {deviceColors.map((color) => (
                        <div
                            key={color.value}
                            onClick={() => {
                                onChange?.(color.value);
                                setIsOpen(false);
                            }}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                padding: "8px 12px",
                                cursor: "pointer",
                                backgroundColor: value === color.value ? "#f3f4f6" : "transparent"
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = "#f9fafb";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = value === color.value ? "#f3f4f6" : "transparent";
                            }}
                        >
                            <div
                                style={{
                                    width: "16px",
                                    height: "16px",
                                    borderRadius: "50%",
                                    backgroundColor: color.hex,
                                    border: "1px solid #d1d5db"
                                }}
                            />
                            <span>{color.name}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};