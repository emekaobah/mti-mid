import type { components } from "@/lib/api-types";

// Shared types used across multiple hooks
export type TradeType = components["schemas"]["TradeType"];
export type CountryResponse = components["schemas"]["CountryResponse"];
export type SectorResponse = components["schemas"]["SectorResponse"];
export type ServiceSectorResponse =
  components["schemas"]["ServiceSectorResponse"];
export type ProductResponse = components["schemas"]["ProductResponse"];
export type ProductSearchResponse =
  components["schemas"]["ProductSearchResponse"];
export type OrganizationTypeResponse =
  components["schemas"]["OrganizationTypeResponse"];
export type TopCountriesInsight = components["schemas"]["TopCountriesInsight"];
export type TopSectorsInsight = components["schemas"]["TopSectorsInsight"];
export type PopularHsCodesInsight =
  components["schemas"]["PopularHsCodesInsight"];
export type TopBusinessTypesInsight =
  components["schemas"]["TopBusinessTypesInsight"];
export type TopOrganizationsInsight =
  components["schemas"]["TopOrganizationsInsight"];
export type CreateTradeInterestRequest =
  components["schemas"]["CreateTradeInterestRequest"];

export type EmailVerificationRequest2 =
  components["schemas"]["EmailVerificationRequest"];
export interface EmailVerificationRequest {
  email: string;
  countryCode: string;
}

export interface EmailVerificationResponse {
  success: boolean;
  code: string;
  message: string;
  email: string | null;
  userId: string | null;
  accessToken: string | null;
  tokenType: string | null;
  country: string | null;
}

// API Response wrapper types
export interface EmailVerificationResultResponse {
  succeeded?: boolean;
  code?: number;
  message?: string | null;
  data?: EmailVerificationResponse;
  pageMeta?: unknown;
  errors?: string[] | null;
}

// For request-email-link endpoint
export interface EmailVerificationResponseResponse {
  succeeded?: boolean;
  code?: number;
  message?: string | null;
  data?: EmailVerificationResponse;
  pageMeta?: unknown;
  errors?: string[] | null;
}

export interface AuthenticatedUser {
  email: string;
  userId: string;
  country: string;
  accessToken: string;
}
