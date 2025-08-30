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
export type EmailVerificationRequest =
  components["schemas"]["EmailVerificationRequest"];
