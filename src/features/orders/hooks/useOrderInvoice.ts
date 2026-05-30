import { useLazyGetOrderInvoiceQuery } from "../services/invoiceApi";

/**
 * Hook para obtener la factura de una orden.
 * Usa lazy query para disparar manualmente (al abrir modal).
 */
export function useOrderInvoice(orderCode: string) {
    const [trigger, { data, isLoading, error, isFetching }] = useLazyGetOrderInvoiceQuery();

    const fetchInvoice = () => {
        if (orderCode) {
            trigger({ orderCode });
        }
    };

    return {
        data: data ?? null,
        isLoading: isLoading || isFetching,
        error,
        fetchInvoice,
    };
}
