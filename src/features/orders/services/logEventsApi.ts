import { baseApi } from "../../../shared/store/baseApi";
import type { StandardResponse } from "../../../shared/types/api";
import type { LogEvent } from "../models/LogEventModel";

export const logEventsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createLogEvent: builder.mutation<LogEvent, LogEvent>({
            query: (logEvent) => ({
                url: "log-events/create",
                method: "POST",
                body: logEvent,
            }),
            transformResponse: (response: StandardResponse<LogEvent>) => response.data,
        }),
        getLogEventsByOrderId: builder.query<LogEvent[], { order_id: string }>({
            query: ({ order_id }) => ({
                url: `log-events/${order_id}`,
                method: "GET",
            }),
            transformResponse: (response: StandardResponse<LogEvent[]>) => response.data,
        }),
    }),
});

export const { useCreateLogEventMutation, useGetLogEventsByOrderIdQuery } = logEventsApi;