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
import { toast } from "sonner";

// Extend Window interface for custom validation function
declare global {
  interface Window {
    validateSubtypes?: () => Promise<boolean>;
  }
}

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
    reValidateMode: "onChange",
    defaultValues: {
      tradeDirection:
        (urlTradeDirection as "buy_from_nigeria" | "sell_to_nigeria") ||
        "buy_from_nigeria",
      organizationType: "",
      otherOrganization: "",
      organizationSubtypes: [],
      importGoods: [],
      exportGoods: [],
      importServices: [],
      exportServices: [],
      // Add default values for contact info fields to prevent undefined errors
      name: "",
      company: "",
      city: "",
      phone: "",
      gender: undefined,
      contactMethod: [],
      consent: false,
    },
  });

  const { trigger, watch, setValue } = methods;
  const tradeDirection = watch("tradeDirection");

  // Update form when URL changes
  useEffect(() => {
    if (urlTradeDirection && urlTradeDirection !== tradeDirection) {
      setValue(
        "tradeDirection",
        urlTradeDirection as "buy_from_nigeria" | "sell_to_nigeria",
        { shouldValidate: false, shouldDirty: true }
      );
    }
  }, [urlTradeDirection, setValue]); // Removed tradeDirection from dependencies

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
        fieldsToValidate = ["tradeDirection", "organizationType"];
        // Always include subtypes in validation - the Zod schema will handle the conditional logic
        fieldsToValidate.push("organizationSubtypes");
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
        fieldsToValidate = ["name", "company", "city", "phone"];
        break;
      case 4: // Review & Submit
        fieldsToValidate = ["consent"];
        break;
      default:
        return true;
    }

    // For respondent details step, add custom validation for subtypes
    if (currentStep === 0) {
      const currentOrgType = watch("organizationType");
      if (currentOrgType) {
        // Call the custom validation function from the component
        if (typeof window.validateSubtypes === "function") {
          const isValid = await window.validateSubtypes();
          if (!isValid) {
            return false;
          }
        }
      }
    }

    // For import/export steps, ensure at least one item is selected
    if (currentStep === 1 && tradeDirection === "buy_from_nigeria") {
      // Import step - check if at least one good OR service is selected
      const importGoods = watch("importGoods");
      const importServices = watch("importServices");
      // Validation fails if BOTH goods AND services are empty
      if (
        (!importGoods || importGoods.length === 0) &&
        (!importServices || importServices.length === 0)
      ) {
        return false;
      }
    }

    if (currentStep === 2 && tradeDirection === "sell_to_nigeria") {
      // Export step - check if at least one good OR service is selected
      const exportGoods = watch("exportGoods");
      const exportServices = watch("exportServices");
      // Validation fails if BOTH goods AND services are empty
      if (
        (!exportGoods || exportGoods.length === 0) &&
        (!exportServices || exportServices.length === 0)
      ) {
        return false;
      }
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
    // Check if consent is given
    if (!data.consent) {
      setSubmissionMessage({
        type: "error",
        message: "You must consent to data use before submitting the form.",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmissionMessage(null);

    try {
      // Transform form data to match API schema
      const transformedData: CreateTradeInterestRequest = {
        orgId: data.organizationType,
        tradeType: data.tradeDirection === "buy_from_nigeria" ? 1 : 2, // 1 for import, 2 for export
        notes: "", // Optional field, can be added later if needed
        consent: data.consent, // Include consent value from form
        contact: {
          fullName: data.name,
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
                    : 3,
                standardsAndCerts: item.standards || null,
                regulatoryAuthority: item.authority || null,
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

      // Submit to backend
      await createTradeInterestMutation.mutateAsync(transformedData);

      // Show success message on the review step
      setSubmissionMessage({
        type: "success",
        message:
          "Your trade interest has been successfully submitted! We'll get back to you soon.",
      });

      // Show toast notification
      toast.success("Form submitted successfully!", {
        description:
          "Your trade interest has been submitted. Redirecting in 3 seconds...",
        duration: 4000,
      });

      // Clear draft after successful submission
      localStorage.removeItem("mti-form-draft");

      // Redirect after 3 seconds instead of immediately
      setTimeout(() => {
        // Reset form and redirect to first step
        methods.reset();
        setCurrentStep(0);
        setSubmissionMessage(null);
      }, 3000);
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

      // Show error toast
      toast.error("Submission failed", {
        description: errorMessage,
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Updated render logic
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return <RespondentDetails key={tradeDirection} />;
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
        return (
          <>
            <ReviewSection />
            {/* Render submission message in the designated container */}
            {submissionMessage && (
              <div
                className={`mt-6 p-4 rounded-lg ${
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
          </>
        );
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
        </div>

        <div className="space-y-8">
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
                <form onSubmit={methods.handleSubmit(onSubmit)}>
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
                </form>
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
        </div>
      </div>
    </FormProvider>
  );
}
