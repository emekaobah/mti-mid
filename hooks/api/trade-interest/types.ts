export interface SectorCount {
  sectorId: string;
  sectorName: string;
  count: number;
}
export interface ProductChart {
  productName: string;
  count: number;
}
export interface OrgChart {
  organizationType: string;
  count: number;
}
export interface OrgBreakdown {
  totalRequests: number;
  organizations: [
    {
      organizationType: string;
      count: number;
    }
  ];
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
