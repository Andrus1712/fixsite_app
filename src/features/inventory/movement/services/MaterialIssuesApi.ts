import { baseApi } from "../../../../shared/store/baseApi";
import type { MaterialIssueFormData } from "../schemas/material-issue.schema";

interface MaterialIssueResponse {
    success: boolean;
    message: string;
    data: any;
}

const MaterialIssuesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createMaterialIssue: builder.mutation<MaterialIssueResponse, MaterialIssueFormData>({
            query: (data) => ({
                url: `/material-issues/create`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ["Request"],
        }),
        submitMaterialIssue: builder.mutation<MaterialIssueResponse, number>({
            query: (id) => ({
                url: `/material-issues/submit/${id}`,
                method: 'PATCH',
            }),
            invalidatesTags: ["Request"],
        }),
        approveMaterialIssue: builder.mutation<MaterialIssueResponse, number>({
            query: (id) => ({
                url: `/material-issues/approve/${id}`,
                method: 'PATCH',
            }),
            invalidatesTags: ["Request", "Store"],
        }),
        rejectMaterialIssue: builder.mutation<MaterialIssueResponse, number>({
            query: (id) => ({
                url: `/material-issues/reject/${id}`,
                method: 'PATCH',
            }),
            invalidatesTags: ["Request"],
        }),
        cancelMaterialIssue: builder.mutation<MaterialIssueResponse, number>({
            query: (id) => ({
                url: `/material-issues/cancel/${id}`,
                method: 'PATCH',
            }),
            invalidatesTags: ["Request"],
        }),
    }),
});

export const {
    useCreateMaterialIssueMutation,
    useSubmitMaterialIssueMutation,
    useApproveMaterialIssueMutation,
    useRejectMaterialIssueMutation,
    useCancelMaterialIssueMutation,
} = MaterialIssuesApi;
