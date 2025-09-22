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

export interface TradeInterestQuery {
  tradeType: string | number;
  sectorId: string;
  serviceSectorId: string;
  countryCodes: string;
  hsCode: string;
}
export interface TradeInterestTable {
  tradeType?: string | number;
  sectorId?: string;
  serviceSectorId?: string;
  countryCodes?: string;
  hsCode?: string;
  organizationType?: string;
  productSearch?: string;
  page?: string | number;
  pageSize?: string | number;
}

export interface TradeSubmissions {
  tradeInterestId: string;
  organizationType: string;
  country: string;
  productName: string;
  hsCode: string;
  quantity: string | number;
  unit: string | number;
  frequency: string;
  standardsAndCerts: string;
  regulatoryAuthority: string;
  serviceName: string;
  description: string;
  productId: string;
  serviceId: string;
  otherProduct: string;
  otherService: string;
}
