export interface SectorCount {
  sectorId: string;
  sectorName: string;
  count: number;
}

export interface PageMeta {
  [key: string]: unknown;
}

export interface ApiError {
  [key: string]: unknown;
}

export interface ApiResponse<T> {
  succeeded: boolean;
  code: number;
  message: string;
  data: T;
  pageMeta: PageMeta | null;
  errors: ApiError | null;
}
