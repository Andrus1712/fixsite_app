import { useState } from "react";
import styled from "styled-components";

import { getStatusConfig, validateTransitionNotes } from "../constants/orderStatusConfig";
import { useUpdateOrderStatusMutation } from "../services/orderApi";
import { Button, Modal, TextArea, useToast } from "../../../shared/components";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ConfirmStatusChangeModalProps {
    isOpen: boolean;
    onClose: () => void;
    orderCode: string;
    currentStatus: number;
    targetStatus: number;
    /** Callback ejecutado tras un cambio de estado exitoso */
    onSuccess?: () => void;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const CANCELLED_STATUS = 7;
const WAITING_PARTS_STATUS = 8;
const NOTES_MAX_LENGTH = 500;

// ─── Styled Components ────────────────────────────────────────────────────────

const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${(props) => props.theme.spacing.md};
`;

const ValidationError = styled.span`
    font-size: ${(props) => props.theme.fontSize.xs};
    color: ${(props) => props.theme.colors.error};
    margin-top: ${(props) => props.theme.spacing.xs};
`;

const FooterContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: ${(props) => props.theme.spacing.sm};
`;

// ─── Component ────────────────────────────────────────────────────────────────

export const ConfirmStatusChangeModal = ({
    isOpen,
    onClose,
    orderCode,
    currentStatus,
    targetStatus,
    onSuccess,
}: ConfirmStatusChangeModalProps) => {
    const [notes, setNotes] = useState("");
    const [validationError, setValidationError] = useState("");
    const { showSuccess, showError } = useToast();
    const [updateOrderStatus, { isLoading }] = useUpdateOrderStatusMutation();

    const currentLabel = getStatusConfig(currentStatus).label;
    const targetLabel = getStatusConfig(targetStatus).label;
    const isCancellation = targetStatus === CANCELLED_STATUS;
    const isNotesRequired = targetStatus === WAITING_PARTS_STATUS;

    const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNotes(e.target.value);
        if (validationError) {
            setValidationError("");
        }
    };

    const handleConfirm = async () => {
        if (!validateTransitionNotes(targetStatus, notes)) {
            setValidationError("Las notas son requeridas para este cambio de estado.");
            return;
        }

        try {
            await updateOrderStatus({
                orderCode,
                status: targetStatus,
                notes: notes.trim() || undefined,
            }).unwrap();

            showSuccess("Estado actualizado correctamente");
            handleClose();
            onSuccess?.();
        } catch (error: unknown) {
            const apiError = error as { data?: { message?: string } };
            const message = apiError?.data?.message ?? "Error al actualizar el estado";
            showError(message);
        }
    };

    const handleClose = () => {
        setNotes("");
        setValidationError("");
        onClose();
    };

    const title = `De: ${currentLabel} → A: ${targetLabel}`;

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title={title}
            size="md"
            closeOnOverlayClick
            showCloseButton
            footer={
                <FooterContainer>
                    <Button variant="outline" onClick={handleClose} disabled={isLoading}>
                        Cancelar
                    </Button>
                    <Button
                        variant={isCancellation ? "danger" : "primary"}
                        onClick={handleConfirm}
                        loading={isLoading}
                        disabled={isLoading}
                    >
                        Confirmar
                    </Button>
                </FooterContainer>
            }
        >
            <ModalContent>
                <TextArea
                    label={isNotesRequired ? "Notas (requeridas)" : "Notas (opcional)"}
                    placeholder="Ingrese notas sobre este cambio de estado..."
                    value={notes}
                    onChange={handleNotesChange}
                    maxLength={NOTES_MAX_LENGTH}
                    rows={4}
                    resize="vertical"
                    fullWidth
                    error={validationError}
                />
                {validationError && !notes.trim() && (
                    <ValidationError>{validationError}</ValidationError>
                )}
            </ModalContent>
        </Modal>
    );
};
