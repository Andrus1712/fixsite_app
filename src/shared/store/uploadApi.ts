import { baseApi } from './baseApi';

export const uploadApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        uploadMultiple: builder.mutation<
            { message: string; files: Array<{ filename: string; originalName: string; size: number; url: string }> },
            FormData
        >({
            query: (formData) => ({
                url: 'upload/multiple',
                method: 'POST',
                body: formData,
            }),
        }),
    }),
});

export const { useUploadMultipleMutation } = uploadApi;