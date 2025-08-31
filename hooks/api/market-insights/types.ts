export interface Sector {
  sectorId: string;
  sectorName: string;
  count: number;
  percentage: number;
}

export interface SectorsResponse {
  sectors: Sector[];
}
