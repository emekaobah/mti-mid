"use client";

import { useFormContext } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  CheckCircle,
  Package,
  Briefcase,
  User,
  Mail,
  Globe,
} from "lucide-react";
import { useServiceSectors } from "@/hooks/api/catalog/use-service-sectors";
import { useOrganizationTypes } from "@/hooks/api/catalog/use-organization-types";

export default function ReviewSection() {
  const { watch, control } = useFormContext();
  const formData = watch();
  const tradeDirection = formData.tradeDirection;
  const { data: serviceSectorsData, isLoading: serviceSectorsLoading } =
    useServiceSectors();
  const { data: organizationTypesData, isLoading: organizationTypesLoading } =
    useOrganizationTypes();

  // Helper function to get sector name from ID
  const getSectorName = (sectorId: string) => {
    if (serviceSectorsLoading || !serviceSectorsData?.data) {
      return sectorId; // Return ID while loading
    }

    const sector = serviceSectorsData.data.find((s) => s.id === sectorId);
    return sector?.name || sectorId; // Fallback to ID if name not found
  };

  // Helper function to get organization type name from ID
  const getOrganizationTypeName = (orgTypeId: string) => {
    if (organizationTypesLoading || !organizationTypesData?.data) {
      return orgTypeId; // Return ID while loading
    }

    const orgType = organizationTypesData.data.find(
      (org) => org.id === orgTypeId
    );
    return orgType?.name || orgTypeId; // Fallback to ID if name not found
  };

  const formatCountry = (countryCode: string) => {
    const countryLabels: Record<string, string> = {
      NG: "Nigeria",
      ZA: "South Africa",
      KE: "Kenya",
      GH: "Ghana",
      CM: "Cameroon",
      UG: "Uganda",
      TZ: "Tanzania",
      ET: "Ethiopia",
      EG: "Egypt",
      MA: "Morocco",
      DZ: "Algeria",
      TN: "Tunisia",
      LY: "Libya",
      SD: "Sudan",
      TD: "Chad",
      NE: "Niger",
      ML: "Mali",
      BF: "Burkina Faso",
      CI: "Ivory Coast",
      SN: "Senegal",
      GN: "Guinea",
      SL: "Sierra Leone",
      LR: "Liberia",
      TG: "Togo",
      BJ: "Benin",
      GW: "Guinea-Bissau",
      CV: "Cape Verde",
      GM: "Gambia",
      MR: "Mauritania",
      DJ: "Djibouti",
      SO: "Somalia",
      ER: "Eritrea",
      CF: "Central African Republic",
      CG: "Republic of Congo",
      CD: "Democratic Republic of Congo",
      GA: "Gabon",
      GQ: "Equatorial Guinea",
      ST: "São Tomé and Príncipe",
      AO: "Angola",
      ZM: "Zambia",
      ZW: "Zimbabwe",
      BW: "Botswana",
      NA: "Namibia",
      SZ: "Eswatini",
      LS: "Lesotho",
      MG: "Madagascar",
      MU: "Mauritius",
      SC: "Seychelles",
      KM: "Comoros",
      BI: "Burundi",
      RW: "Rwanda",
      MW: "Malawi",
      MZ: "Mozambique",
    };
    return countryLabels[countryCode] || countryCode;
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-2">Review Your Information</h3>
        <p className="text-muted-foreground">
          Please review all the information you&rsquo;ve provided before
          submitting.
        </p>
      </div>

      {/* Organization Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>Organization Details</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Trade Direction
              </label>
              <p className="text-sm">
                {tradeDirection === "buy_from_nigeria" &&
                  "Buy from Nigeria (Import)"}
                {tradeDirection === "sell_to_nigeria" &&
                  "Sell to Nigeria (Export)"}
                {!tradeDirection && "Not specified"}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Organization Type
              </label>
              <p className="text-sm">
                {formData.organizationType
                  ? getOrganizationTypeName(formData.organizationType)
                  : "Not specified"}
              </p>
            </div>
            {formData.otherOrganization && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Other Organization
                </label>
                <p className="text-sm">{formData.otherOrganization}</p>
              </div>
            )}

            {formData.businessTypes && formData.businessTypes.length > 0 && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Business Types
                </label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {formData.businessTypes.map((type: string, index: number) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Conditional Import Requirements */}
      {tradeDirection === "buy_from_nigeria" &&
        (formData.importGoods?.length > 0 ||
          formData.importServices?.length > 0) && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Package className="h-5 w-5" />
                <span>Import Requirements</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.importGoods?.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Goods to Import</h4>
                  <div className="space-y-2">
                    {formData.importGoods.map(
                      (
                        good: {
                          sector: string;
                          product: string;
                          hsCode?: string;
                          quantity?: string;
                          unit?: string;
                          frequency?: string;
                        },
                        index: number
                      ) => (
                        <div
                          key={index}
                          className="border rounded p-3 bg-muted/50"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                            <div>
                              <strong>Sector:</strong> {good.sector}
                            </div>
                            <div>
                              <strong>Product:</strong> {good.product}
                            </div>
                            {good.hsCode && (
                              <div>
                                <strong>HS Code:</strong> {good.hsCode}
                              </div>
                            )}
                            {good.quantity && (
                              <div>
                                <strong>Quantity:</strong> {good.quantity}{" "}
                                {good.unit}
                              </div>
                            )}
                            {good.frequency && (
                              <div>
                                <strong>Frequency:</strong> {good.frequency}
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
              {formData.importServices?.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Services to Import</h4>
                  <div className="space-y-2">
                    {formData.importServices.map(
                      (
                        service: { sector: string; description: string },
                        index: number
                      ) => (
                        <div
                          key={index}
                          className="border rounded p-3 bg-muted/50"
                        >
                          <div className="text-sm">
                            <div>
                              <strong>Sector:</strong>{" "}
                              {getSectorName(service.sector)}
                            </div>
                            <div>
                              <strong>Description:</strong>{" "}
                              {service.description}
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

      {/* Conditional Export Capabilities */}
      {tradeDirection === "sell_to_nigeria" &&
        (formData.exportGoods?.length > 0 ||
          formData.exportServices?.length > 0) && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Briefcase className="h-5 w-5" />
                <span>Export Capabilities</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.exportGoods?.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Goods to Export</h4>
                  <div className="space-y-2">
                    {formData.exportGoods.map(
                      (
                        good: {
                          sector: string;
                          product: string;
                          hsCode?: string;
                          quantity?: string;
                          unit?: string;
                          frequency?: string;
                        },
                        index: number
                      ) => (
                        <div
                          key={index}
                          className="border rounded p-3 bg-muted/50"
                        >
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                            <div>
                              <strong>Sector:</strong> {good.sector}
                            </div>
                            <div>
                              <strong>Product:</strong> {good.product}
                            </div>
                            {good.hsCode && (
                              <div>
                                <strong>HS Code:</strong> {good.hsCode}
                              </div>
                            )}
                            {good.quantity && (
                              <div>
                                <strong>Quantity:</strong> {good.quantity}{" "}
                                {good.unit}
                              </div>
                            )}
                            {good.frequency && (
                              <div>
                                <strong>Frequency:</strong> {good.frequency}
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
              {formData.exportServices?.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Services to Export</h4>
                  <div className="space-y-2">
                    {formData.exportServices.map(
                      (
                        service: { sector: string; description: string },
                        index: number
                      ) => (
                        <div
                          key={index}
                          className="border rounded p-3 bg-muted/50"
                        >
                          <div className="text-sm">
                            <div>
                              <strong>Sector:</strong>{" "}
                              {getSectorName(service.sector)}
                            </div>
                            <div>
                              <strong>Description:</strong>{" "}
                              {service.description}
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Mail className="h-5 w-5" />
            <span>Contact Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Full Name
              </label>
              <p className="text-sm">{formData.name || "Not specified"}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                Company / Institution
              </label>
              <p className="text-sm">{formData.company || "Not specified"}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">
                City
              </label>
              <p className="text-sm">{formData.city || "Not specified"}</p>
            </div>

            {formData.phone && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Phone
                </label>
                <p className="text-sm">{formData.phone}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Additional Information */}
      {(formData.originCountry ||
        formData.userType ||
        formData.gender ||
        formData.contactMethod?.length > 0 ||
        formData.contactInfo) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="h-5 w-5" />
              <span>Additional Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.originCountry && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Country of Origin
                </label>
                <p className="text-sm">
                  {formatCountry(formData.originCountry)}
                </p>
              </div>
            )}
            {formData.userType && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  User Type
                </label>
                <p className="text-sm">{formData.userType}</p>
              </div>
            )}
            {formData.gender && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Gender
                </label>
                <p className="text-sm">{formData.gender}</p>
              </div>
            )}
            {formData.contactMethod?.length > 0 && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Preferred Contact Methods
                </label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {formData.contactMethod.map(
                    (method: string, index: number) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {method}
                      </Badge>
                    )
                  )}
                </div>
              </div>
            )}
            {formData.contactInfo && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Contact Information
                </label>
                <p className="text-sm">{formData.contactInfo}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Consent Checkbox */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5" />
            <span>Consent & Agreement</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <FormField
              control={control}
              name="consent"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-2">
                    <FormLabel className="text-sm font-medium cursor-pointer">
                      Consent to Data Use
                    </FormLabel>
                    <p className="text-sm text-muted-foreground">
                      By checking this box, you consent to the collection,
                      processing, storage, and disclosure of your personal data
                      to authorized third parties, solely for the purposes of
                      providing trade intelligence services, facilitating
                      communication, and ensuring compliance with applicable
                      regulations.
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Note: You may withdraw your consent at any time by
                      contacting the system administrator.
                    </p>
                  </div>
                </FormItem>
              )}
            />
            <FormMessage />
          </div>
        </CardContent>
      </Card>

      <div className="text-center p-6 bg-muted/50 rounded-lg">
        <p className="text-sm text-muted-foreground">
          By submitting this form, you confirm that all information provided is
          accurate and complete.
        </p>
      </div>
    </div>
  );
}
