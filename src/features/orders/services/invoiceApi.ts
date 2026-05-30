import { baseApi } from "../../../shared/store/baseApi";
import type { StandardResponse } from "../../../shared/types/api";
import type { InvoiceData } from "../models/InvoiceModel";

export const invoiceApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getOrderInvoice: builder.query<InvoiceData, { orderCode: string }>({
            query: ({ orderCode }) => ({
                url: `invoices/order/${orderCode}`,
                method: "GET",
            }),
            transformResponse: (response: StandardResponse<InvoiceData>) => response.data,
        }),
    }),
});

export const { useGetOrderInvoiceQuery, useLazyGetOrderInvoiceQuery } = invoiceApi;
