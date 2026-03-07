export interface PagedResultDto<T> {
    items: T[];
    totalCount: number;
    pageSize: number;
    pageIndex: number;
}

export interface PaginationParams {
    skipCount: number;
    maxResultCount: number;
    sorting?: string | null;
}