/**
 * Configuración de estados de órdenes de servicio.
 * Single source of truth para labels, colores y acciones por estado.
 */

export interface StatusConfig {
    value: number;
    label: string;
    color: string;
}

export const ORDER_STATUS_CONFIG: Record<number, StatusConfig> = {
    1: { value: 1, label: 'Pendiente', color: 'gray400' },
    2: { value: 2, label: 'Asignada', color: 'primary' },
    3: { value: 3, label: 'En diagnóstico', color: 'accent' },
    4: { value: 4, label: 'En reparación', color: 'orange' },
    5: { value: 5, label: 'Completada', color: 'success' },
    6: { value: 6, label: 'Entregada', color: 'teal' },
    7: { value: 7, label: 'Cancelada', color: 'error' },
    8: { value: 8, label: 'Esperando repuestos', color: 'purple' },
};

const FALLBACK_STATUS_CONFIG: StatusConfig = {
    value: 0,
    label: 'Desconocido',
    color: 'gray400',
};

/**
 * Retorna la configuración de un estado dado.
 * Si el estado no existe en el mapa, retorna fallback con label "Desconocido".
 */
export function getStatusConfig(status: number): StatusConfig {
    return ORDER_STATUS_CONFIG[status] ?? FALLBACK_STATUS_CONFIG;
}

/** Statuses que permiten "Cancelar orden" (solo admin) */
const CANCELLABLE_STATUSES = new Set([2, 3, 4, 8]);

/**
 * Retorna las etiquetas de los botones de acción disponibles para un estado.
 * Incluye "Cancelar orden" para los estados elegibles.
 */
export function getActionsForStatus(status: number): string[] {
    const actions: string[] = [];

    switch (status) {
        case 2:
            actions.push('Iniciar diagnóstico');
            break;
        case 3:
            actions.push('Diagnóstico completado');
            break;
        case 4:
            actions.push('Esperando repuestos', 'Finalizar orden');
            break;
        case 5:
            actions.push('Marcar como entregado');
            break;
        case 8:
            actions.push('Continuar reparación');
            break;
        // PENDING (1), DELIVERED (6), CANCELLED (7): no actions
    }

    if (CANCELLABLE_STATUSES.has(status)) {
        actions.push('Cancelar orden');
    }

    return actions;
}

const DEFAULT_TRUNCATE_LIMIT = 300;

/**
 * Trunca un texto al límite indicado (default 300 chars).
 * Si excede el límite, retorna los primeros `limit` caracteres + "…".
 */
export function truncateNotes(text: string, limit: number = DEFAULT_TRUNCATE_LIMIT): string {
    if (text.length <= limit) {
        return text;
    }
    return text.slice(0, limit) + '…';
}

const WAITING_PARTS_STATUS = 8;

/**
 * Valida si las notas son válidas para una transición de estado.
 * Las notas son obligatorias (al menos 1 carácter no-whitespace) cuando
 * el estado destino es WAITING_PARTS (8).
 * Para cualquier otro estado destino, siempre es válido.
 */
export function validateTransitionNotes(targetStatus: number, notes: string): boolean {
    if (targetStatus !== WAITING_PARTS_STATUS) {
        return true;
    }
    return notes.trim().length > 0;
}
