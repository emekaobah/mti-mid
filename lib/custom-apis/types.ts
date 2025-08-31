export interface PageMeta {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalRecords: number;
}

export interface ApiResponse<T> {
  succeeded: boolean;
  code: number;
  message: string;
  data: T;
  pageMeta: PageMeta;
  errors: string[];
}

interface ApiErrorResponse {
  message: string;
}

export interface ApiError {
  response: {
    data: ApiErrorResponse;
    status?: number;
    statusText?: string;
  };
  message?: string;
  code?: string;
}

export interface verifyBvnResponse {
  bvn: string;
  valid: boolean;
}
