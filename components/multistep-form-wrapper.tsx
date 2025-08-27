"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { ProgressIndicator } from "@/components/ui/progress-indicator";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

  const methods = useForm<FullFormType>({
    resolver: zodResolver(fullFormSchema),
    mode: "onChange",
    defaultValues: {
      tradeDirection: "buy_from_nigeria", // Default to import
      importGoods: [],
      exportGoods: [],
      importServices: [],
      exportServices: [],
    },
  });

  const { trigger, getValues, watch } = methods;
  const tradeDirection = watch("tradeDirection");

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
    try {
      console.log("Form submitted:", data);
      // TODO: Send data to backend or API

      // Clear draft after successful submission
      localStorage.removeItem("mti-form-draft");
    } catch (error) {
      console.error("Submission error:", error);
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
            <div className="space-y-8">
              <ImportGoods />
              <ImportServices />
            </div>
          );
        }
        // Skip to next step if not applicable
        return null;
      case 2:
        // Only show export if user selected sell_to_nigeria
        if (tradeDirection === "sell_to_nigeria") {
          return (
            <div className="space-y-8">
              <ExportGoods />
              <ExportServices />
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
                  disabled={isSubmitting}
                  className="flex items-center justify-center space-x-2 rounded-full h-12 w-full max-w-[240px] bg-[#074318] hover:bg-[#074318]/90 text-white"
                >
                  {isSubmitting ? "Submitting..." : "Submit Form"}
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
