"use client";

import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { ProgressIndicator } from "@/components/ui/progress-indicator";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCreateTradeInterest } from "@/hooks/api/trade-interest/use-create-trade-interest";
import type { CreateTradeInterestRequest } from "@/hooks/api/shared/types";
import { useSearchParams } from "next/navigation";

// Import existing components
import RespondentDetails, {
  respondentDetailsSchema,
  tradeDirectionSchema,
} from "./respondent-details";
import ImportGoods, { importGoodsSchema } from "./import-goods";
import ImportServices, { importServicesSchema } from "./import-services";
import ExportGoods, { exportGoodsSchema } from "./export-goods";
import ExportServices, { exportServicesSchema } from "./export-services";
import ContactInfo, { contactInfoSchema } from "./contact-info";
import ReviewSection from "./review-section";

// Combined schemas for validation
const importRequirementsSchema = z.object({
  ...importGoodsSchema.shape,
  ...importServicesSchema.shape,
});

const exportCapabilitiesSchema = z.object({
  ...exportGoodsSchema.shape,
  ...exportServicesSchema.shape,
});

// Updated combined schema with trade direction
const fullFormSchema = z.object({
  ...tradeDirectionSchema.shape,
  ...respondentDetailsSchema.shape,
  ...importRequirementsSchema.shape,
  ...exportCapabilitiesSchema.shape,
  ...contactInfoSchema.shape,
});

type FullFormType = z.infer<typeof fullFormSchema>;

const steps = [
  {
    id: "respondent-details",
    name: "Organization Details",
  },
  {
    id: "import-requirements",
    name: "Import Requirements",
    conditional: true, // NEW: This step is conditional
  },
  {
    id: "export-capabilities",
    name: "Export Capabilities",
    conditional: true, // NEW: This step is conditional
  },
  {
    id: "contact-information",
    name: "Contact Information",
  },
  {
    id: "review",
    name: "Review & Submit",
  },
];

export default function MultistepFormWrapper() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const searchParams = useSearchParams();
  const createTradeInterestMutation = useCreateTradeInterest();

  // Get trade direction from URL query parameter
  const urlTradeDirection = searchParams.get("tradeDirection");

  const methods = useForm<FullFormType>({
    resolver: zodResolver(fullFormSchema),
    mode: "onChange",
    defaultValues: {
      tradeDirection:
        (urlTradeDirection as "buy_from_nigeria" | "sell_to_nigeria") ||
        "buy_from_nigeria",
      importGoods: [],
      exportGoods: [],
      importServices: [],
      exportServices: [],
    },
  });

  const { trigger, getValues, watch, setValue } = methods;
  const tradeDirection = watch("tradeDirection");

  // Update form when URL changes
  useEffect(() => {
    if (urlTradeDirection && urlTradeDirection !== tradeDirection) {
      setValue(
        "tradeDirection",
        urlTradeDirection as "buy_from_nigeria" | "sell_to_nigeria"
      );
    }
  }, [urlTradeDirection, tradeDirection, setValue]);

  // NEW: Get filtered steps based on trade direction
  const getFilteredSteps = () => {
    if (!tradeDirection) return steps;

    return steps.filter((step) => {
      if (step.id === "import-requirements") {
        return tradeDirection === "buy_from_nigeria";
      }
      if (step.id === "export-capabilities") {
        return tradeDirection === "sell_to_nigeria";
      }
      return true;
    });
  };

  const filteredSteps = getFilteredSteps();

  // NEW: Map current step to filtered steps
  const getCurrentFilteredStep = () => {
    const currentStepId = steps[currentStep].id;
    return filteredSteps.findIndex((step) => step.id === currentStepId);
  };

  const currentFilteredStep = getCurrentFilteredStep();

  const validateCurrentStep = async (): Promise<boolean> => {
    let fieldsToValidate: (keyof FullFormType)[] = [];

    switch (currentStep) {
      case 0: // Respondent Details (now includes trade direction)
        fieldsToValidate = ["tradeDirection", "organizationType", "country"];
        break;
      case 1: // Import Requirements (conditional)
        if (tradeDirection === "buy_from_nigeria") {
          fieldsToValidate = ["importGoods", "importServices"];
        }
        break;
      case 2: // Export Capabilities (conditional)
        if (tradeDirection === "sell_to_nigeria") {
          fieldsToValidate = ["exportGoods", "exportServices"];
        }
        break;
      case 3: // Contact Information
        fieldsToValidate = ["name", "company", "city", "country", "email"];
        break;
      default:
        return true;
    }

    return await trigger(fieldsToValidate);
  };

  // Updated navigation logic
  const handleNext = async () => {
    const isValid = await validateCurrentStep();
    if (isValid && currentStep < steps.length - 1) {
      // Clear any previous submission messages
      setSubmissionMessage(null);

      // Find next available step
      let nextStep = currentStep + 1;
      while (nextStep < steps.length) {
        const nextStepId = steps[nextStep].id;
        if (
          nextStepId === "import-requirements" &&
          tradeDirection !== "buy_from_nigeria"
        ) {
          nextStep++;
          continue;
        }
        if (
          nextStepId === "export-capabilities" &&
          tradeDirection !== "sell_to_nigeria"
        ) {
          nextStep++;
          continue;
        }
        break;
      }
      setCurrentStep(nextStep);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      // Clear any previous submission messages
      setSubmissionMessage(null);

      // Find previous available step
      let prevStep = currentStep - 1;
      while (prevStep >= 0) {
        const prevStepId = steps[prevStep].id;
        if (
          prevStepId === "import-requirements" &&
          tradeDirection !== "buy_from_nigeria"
        ) {
          prevStep--;
          continue;
        }
        if (
          prevStepId === "export-capabilities" &&
          tradeDirection !== "sell_to_nigeria"
        ) {
          prevStep--;
          continue;
        }
        break;
      }
      setCurrentStep(prevStep);
    }
  };

  const onSubmit = async (data: FullFormType) => {
    setIsSubmitting(true);
    setSubmissionMessage(null);

    try {
      // Transform form data to match API schema
      const transformedData: CreateTradeInterestRequest = {
        countryCode: data.country,
        orgId: data.organizationType,
        tradeType: data.tradeDirection === "buy_from_nigeria" ? 1 : 2, // 1 for import, 2 for export
        notes: "", // Optional field, can be added later if needed
        contact: {
          fullName: data.name,
          email: data.email,
          phone: data.phone || null,
          gender:
            data.gender === "Male"
              ? 1
              : data.gender === "Female"
              ? 2
              : undefined,
          channel: 1, // Default to email (1), can be made configurable
          company: data.company || null,
          city: data.city || null,
          countryCode: data.country,
        },
        goodsItems:
          data.tradeDirection === "buy_from_nigeria"
            ? data.importGoods?.map((item) => ({
                sectorId: item.sector || null,
                productId: item.productId || null,
                productName: item.product || null,
                hsCode: item.hsCode || null,
                quantity: item.quantity ? parseFloat(item.quantity) : null,
                unitCode: item.unit || null,
                frequency:
                  item.frequency === "Monthly"
                    ? 1
                    : item.frequency === "Quarterly"
                    ? 2
                    : 3, // 1=Monthly, 2=Quarterly, 3=Annually
                standardsAndCerts: item.standards || null,
                regulatoryAuthority: item.authority || null,
              })) || null
            : data.exportGoods?.map((item) => ({
                sectorId: item.sector || null,
                productId: null, // Export goods don't have productId
                productName: item.product || null,
                hsCode: item.hsCode || null,
                quantity: item.quantity ? parseFloat(item.quantity) : null,
                unitCode: item.unit || null,
                frequency:
                  item.frequency === "Monthly"
                    ? 1
                    : item.frequency === "Quarterly"
                    ? 2
                    : 3,
                standardsAndCerts: null, // Export goods don't have standards
                regulatoryAuthority: null, // Export goods don't have authority
              })) || null,
        serviceItems:
          data.tradeDirection === "buy_from_nigeria"
            ? data.importServices?.map((item) => ({
                serviceSectorId: item.sector,
                description: item.description || null,
              })) || null
            : data.exportServices?.map((item) => ({
                serviceSectorId: item.sector,
                description: item.description || null,
              })) || null,
      };

      console.log("Transformed data for API:", transformedData);

      // Submit to backend
      const response = await createTradeInterestMutation.mutateAsync(
        transformedData
      );

      console.log("API Response:", response);

      setSubmissionMessage({
        type: "success",
        message:
          "Your trade interest has been successfully submitted! We'll get back to you soon.",
      });

      // Clear draft after successful submission
      localStorage.removeItem("mti-form-draft");

      // Reset form after successful submission
      methods.reset();
      setCurrentStep(0);
    } catch (error: unknown) {
      console.error("Submission error:", error);

      // Try to extract more specific error message from the API response
      let errorMessage =
        "Failed to submit your trade interest. Please try again or contact support if the problem persists.";

      if (error && typeof error === "object" && "response" in error) {
        const apiError = error as {
          response?: { data?: { message?: string } };
        };
        if (apiError.response?.data?.message) {
          errorMessage = apiError.response.data.message;
        }
      } else if (error && typeof error === "object" && "message" in error) {
        const errorWithMessage = error as { message: string };
        errorMessage = errorWithMessage.message;
      }

      setSubmissionMessage({
        type: "error",
        message: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Updated render logic
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return <RespondentDetails />;
      case 1:
        // Only show import if user selected buy_from_nigeria
        if (tradeDirection === "buy_from_nigeria") {
          return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              <div className="space-y-8">
                <ImportGoods />
              </div>
              <div className="space-y-8">
                <ImportServices />
              </div>
            </div>
          );
        }
        // Skip to next step if not applicable
        return null;
      case 2:
        // Only show export if user selected sell_to_nigeria
        if (tradeDirection === "sell_to_nigeria") {
          return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              <div className="space-y-8">
                <ExportGoods />
              </div>
              <div className="space-y-8">
                <ExportServices />
              </div>
            </div>
          );
        }
        // Skip to next step if not applicable
        return null;
      case 3:
        return <ContactInfo />;
      case 4:
        return <ReviewSection />;
      default:
        return null;
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="w-full  mx-auto bg-card rounded-lg  ">
        <div className="p-6 sm:p-8">
          <ProgressIndicator
            steps={filteredSteps} // Use filtered steps
            currentStep={currentFilteredStep} // Use filtered step index
            className="mb-8"
          />

          {/* Submission Message */}
          {submissionMessage && (
            <div
              className={`mb-6 p-4 rounded-lg ${
                submissionMessage.type === "success"
                  ? "bg-green-50 border border-green-200 text-green-800"
                  : "bg-red-50 border border-red-200 text-red-800"
              }`}
            >
              <p className="font-medium">
                {submissionMessage.type === "success" ? "Success!" : "Error"}
              </p>
              <p className="text-sm mt-1">{submissionMessage.message}</p>
            </div>
          )}
        </div>

        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
          <div className="px-6 sm:px-8">
            <div className="pb-8">{renderCurrentStep()}</div>
          </div>

          {/* Navigation Controls */}
          <div className="px-6 sm:px-8 py-6 border-t bg-muted/20">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="flex items-center justify-center space-x-2 rounded-full h-12 w-full max-w-[240px]"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Previous</span>
              </Button>

              {currentStep === steps.length - 1 ? (
                <Button
                  type="submit"
                  disabled={
                    isSubmitting || createTradeInterestMutation.isPending
                  }
                  className="flex items-center justify-center space-x-2 rounded-full h-12 w-full max-w-[240px] bg-[#074318] hover:bg-[#074318]/90 text-white"
                >
                  {isSubmitting || createTradeInterestMutation.isPending
                    ? "Submitting..."
                    : "Submit Form"}
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center justify-center space-x-2 rounded-full h-12 w-full max-w-[240px] bg-[#074318] hover:bg-[#074318]/90 text-white"
                >
                  <span>Next</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>
    </FormProvider>
  );
}
