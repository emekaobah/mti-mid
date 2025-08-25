"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CountryData {
  country: string;
  code: string;
  responses: number;
  percentage: number;
}

interface TopParticipatingCountriesProps {
  data: CountryData[];
}

export default function TopParticipatingCountries({
  data,
}: TopParticipatingCountriesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          📊 Top Participating Countries
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.slice(0, 5).map((country, index) => (
            <div
              key={country.code}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">
                  {country.code === "KE" && "🇰🇪"}
                  {country.code === "GH" && "🇬🇭"}
                  {country.code === "ZA" && "🇿🇦"}
                  {country.code === "UG" && "🇺🇬"}
                  {country.code === "TZ" && "🇹🇿"}
                  {country.code === "CM" && "🇨🇲"}
                  {country.code === "EG" && "🇪🇬"}
                  {country.code === "OT" && "🌍"}
                </span>
                <span className="font-medium">{country.country}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-24 bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${country.percentage}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium w-8 text-right">
                  {country.percentage}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
