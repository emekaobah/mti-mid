import type { components } from "@/lib/api-types";

type SectorData = components["schemas"]["SectorData"];
type CountrySubmissionData = components["schemas"]["CountrySubmissionData"];
type OrganizationTypeData = components["schemas"]["OrganizationTypeData"];
type HsCodeData = components["schemas"]["HsCodeData"];

export const transformSectorData = (
  sectors: SectorData[] | undefined | null
): { key: string; value: number }[] => {
  if (!sectors || sectors.length === 0) return [];

  return sectors
    .filter(
      (sector): sector is SectorData & { sectorName: string; count: number } =>
        sector.sectorName != null && sector.count != null
    )
    .map((sector) => ({
      key: sector.sectorName,
      value: sector.count,
    }));
};

// Transform country data to chart format
export const transformCountryData = (
  countries: CountrySubmissionData[] | undefined | null
): { key: string; value: number }[] => {
  if (!countries || countries.length === 0) return [];

  return countries
    .filter(
      (
        country
      ): country is CountrySubmissionData & {
        countryName: string;
        submissionCount: number;
      } => country.countryName != null && country.submissionCount != null
    )
    .map((country) => ({
      key: country.countryName,
      value: country.submissionCount,
    }));
};

// Transform organization data to chart format
export const transformOrganizationData = (
  organizations: OrganizationTypeData[] | undefined | null
): { key: string; value: number }[] => {
  if (!organizations || organizations.length === 0) return [];

  return organizations
    .filter(
      (
        organization
      ): organization is OrganizationTypeData & {
        organizationTypeName: string;
        count: number;
      } =>
        organization.organizationTypeName != null && organization.count != null
    )
    .map((organization) => ({
      key: organization.organizationTypeName,
      value: organization.count,
    }));
};

// Transform HS codes data to table format
export const transformHsCodeData = (
  hsCodes: HsCodeData[] | undefined | null
): { key: string; value: number }[] => {
  if (!hsCodes || hsCodes.length === 0) return [];

  return hsCodes
    .filter(
      (
        hsCode
      ): hsCode is HsCodeData & {
        hsCode: string;
        count: number;
      } => hsCode.hsCode != null && hsCode.count != null
    )
    .map((hsCode) => ({
      key: hsCode.hsCode,
      value: hsCode.count,
    }));
};
