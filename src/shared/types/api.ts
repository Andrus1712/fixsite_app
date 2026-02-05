export interface StandardResponse<T> {
    success: boolean;
    status: number;
    message: string;
    data: T;
    errors: any;
    path?: string;
    timestamp?: string;
    pagination: {
        page: number;
        limit: number;
        totalPages: number;
        total: number;
    };
}
