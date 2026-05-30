import { useRef, useEffect } from "react";
import styled from "styled-components";
import { FaFilePdf, FaPrint, FaTimes } from "react-icons/fa";
import { Button, ButtonGroup, LoadingSpinner } from "../../../../shared/components";
import { InvoicePreview } from "./InvoicePreview";
import { useOrderInvoice } from "../../hooks/useOrderInvoice";

// ─── Types ────────────────────────────────────────────────────────────────────

interface InvoiceModalProps {
    isOpen: boolean;
    onClose: () => void;
    orderCode: string;
}

// ─── Styled Components ────────────────────────────────────────────────────────

const Overlay = styled.div<{ $isOpen: boolean }>`
    position: fixed;
    inset: 0;
    z-index: ${(props) => props.theme.zIndex.modal};
    display: ${(props) => (props.$isOpen ? "flex" : "none")};
    align-items: center;
    justify-content: center;
    background: ${(props) => props.theme.colors.overlay};
    padding: ${(props) => props.theme.spacing.md};

    @media print {
        position: static;
        background: none;
        padding: 0;
        display: block;
    }
`;

const ModalContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 900px;
    max-height: 90vh;
    background: ${(props) => props.theme.colors.surface};
    border-radius: ${(props) => props.theme.borderRadius.xl};
    box-shadow: ${(props) => props.theme.shadows.xl};
    overflow: hidden;

    @media print {
        max-width: none;
        max-height: none;
        border-radius: 0;
        box-shadow: none;
    }
`;

const ModalHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${(props) => props.theme.spacing.md} ${(props) => props.theme.spacing.lg};
    border-bottom: 1px solid ${(props) => props.theme.colors.border};
    background: ${(props) => props.theme.colors.surface};

    @media print {
        display: none;
    }
`;

const ModalTitle = styled.h2`
    margin: 0;
    font-size: ${(props) => props.theme.fontSize.lg};
    font-weight: ${(props) => props.theme.fontWeight.semibold};
    color: ${(props) => props.theme.colors.text};
`;

const ModalBody = styled.div`
    flex: 1;
    overflow-y: auto;
    padding: ${(props) => props.theme.spacing.md};
    background: ${(props) => props.theme.colors.background};

    @media print {
        overflow: visible;
        padding: 0;
        background: #ffffff;
    }
`;

const ModalFooter = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: ${(props) => props.theme.spacing.md} ${(props) => props.theme.spacing.lg};
    border-top: 1px solid ${(props) => props.theme.colors.border};
    background: ${(props) => props.theme.colors.surface};

    @media print {
        display: none;
    }
`;

const ErrorContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: ${(props) => props.theme.spacing.xxl};
    gap: ${(props) => props.theme.spacing.md};
    text-align: center;
    color: ${(props) => props.theme.colors.error};
`;

// ─── Component ────────────────────────────────────────────────────────────────

export const InvoiceModal = ({ isOpen, onClose, orderCode }: InvoiceModalProps) => {
    const invoiceRef = useRef<HTMLDivElement>(null);
    const { data, isLoading, error, fetchInvoice } = useOrderInvoice(orderCode);

    useEffect(() => {
        if (isOpen && orderCode) {
            fetchInvoice();
        }
    }, [isOpen, orderCode]);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) {
                onClose();
            }
        };
        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [isOpen, onClose]);

    const handleExportPDF = async () => {
        const element = invoiceRef.current;
        if (!element || !data) return;

        const html2pdf = (await import("html2pdf.js")).default;

        html2pdf()
            .set({
                margin: [10, 10, 10, 10],
                filename: `Factura-${data.invoice.number}.pdf`,
                image: { type: "jpeg", quality: 0.98 },
                html2canvas: { scale: 2, useCORS: true },
                jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
            })
            .from(element)
            .save();
    };

    const handlePrint = () => {
        window.print();
    };

    if (!isOpen) return null;

    return (
        <Overlay $isOpen={isOpen} onClick={onClose}>
            <ModalContainer onClick={(e) => e.stopPropagation()}>
                <ModalHeader>
                    <ModalTitle>Factura — {orderCode}</ModalTitle>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={onClose}
                        leftIcon={<FaTimes />}
                    >
                        Cerrar
                    </Button>
                </ModalHeader>

                <ModalBody>
                    {isLoading && <LoadingSpinner mensaje="Cargando factura..." />}

                    {error && (
                        <ErrorContainer>
                            <p>No se pudo cargar la factura.</p>
                            <Button variant="outline" size="sm" onClick={fetchInvoice}>
                                Reintentar
                            </Button>
                        </ErrorContainer>
                    )}

                    {data && !isLoading && !error && (
                        <InvoicePreview ref={invoiceRef} data={data} />
                    )}
                </ModalBody>

                <ModalFooter>
                    <ButtonGroup orientation="horizontal" spacing="sm">
                        <Button
                            variant="outline"
                            size="sm"
                            leftIcon={<FaPrint />}
                            onClick={handlePrint}
                            disabled={!data}
                        >
                            Imprimir
                        </Button>
                        <Button
                            variant="primary"
                            size="sm"
                            leftIcon={<FaFilePdf />}
                            onClick={handleExportPDF}
                            disabled={!data}
                        >
                            Exportar PDF
                        </Button>
                    </ButtonGroup>
                </ModalFooter>
            </ModalContainer>
        </Overlay>
    );
};
