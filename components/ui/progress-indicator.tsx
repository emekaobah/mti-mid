"use client";

import { CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: string;
  name: string;
  description?: string;
  conditional?: boolean; // NEW: Flag for conditional steps
}

interface ProgressIndicatorProps {
  steps: Step[];
  currentStep: number;
  className?: string;
}

export function ProgressIndicator({
  steps,
  currentStep,
  className,
}: ProgressIndicatorProps) {
  return (
    <div className={cn("w-full", className)}>
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
          <span>
            Step {currentStep + 1} of {steps.length}
          </span>
          <span>
            {Math.round(((currentStep + 1) / steps.length) * 100)}% complete
          </span>
        </div>
        <div className="w-full bg-secondary rounded-full h-2">
          <div
            className="bg-[#074318] h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Step indicators */}
      <nav aria-label="Progress" className="mb-6">
        {/* Desktop version */}
        <ol className="hidden lg:flex items-start justify-between relative">
          {/* Connecting line background */}
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-muted-foreground/25" />
          <div
            className="absolute top-5 left-0 h-0.5 bg-[#074318] transition-all duration-300 ease-out"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          />

          {steps.map((step, index) => (
            <li
              key={step.id}
              className="flex flex-col items-center relative z-10"
            >
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors bg-background",
                  index < currentStep
                    ? "border-[#074318] bg-[#074318] text-white"
                    : index === currentStep
                    ? "border-[#074318] bg-[#074318] text-white"
                    : "border-muted-foreground/25 bg-background text-muted-foreground"
                )}
              >
                {index < currentStep ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <span className="text-sm font-medium">{index + 1}</span>
                )}
              </div>
              <div className="mt-3 text-center max-w-[120px]">
                <p
                  className={cn(
                    "text-sm font-medium leading-tight",
                    index <= currentStep
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {step.name}
                </p>
                {step.description && (
                  <p className="text-xs text-muted-foreground mt-1 leading-tight">
                    {step.description}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>

        {/* Tablet version */}
        <ol className="hidden md:flex lg:hidden items-start justify-between relative">
          {/* Connecting line background */}
          <div className="absolute top-4 left-0 right-0 h-0.5 bg-muted-foreground/25" />
          <div
            className="absolute top-4 left-0 h-0.5 bg-[#074318] transition-all duration-300 ease-out"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          />

          {steps.map((step, index) => (
            <li
              key={step.id}
              className="flex flex-col items-center relative z-10"
            >
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors bg-background",
                  index < currentStep
                    ? "border-[#074318] bg-[#074318] text-white"
                    : index === currentStep
                    ? "border-[#074318] bg-[#074318] text-white"
                    : "border-muted-foreground/25 bg-background text-muted-foreground"
                )}
              >
                {index < currentStep ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <span className="text-xs font-medium">{index + 1}</span>
                )}
              </div>
              <div className="mt-2 text-center max-w-[100px]">
                <p
                  className={cn(
                    "text-xs font-medium leading-tight",
                    index <= currentStep
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {step.name}
                </p>
              </div>
            </li>
          ))}
        </ol>

        {/* Mobile version */}
        <div className="md:hidden">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors",
                  "border-[#074318] bg-[#074318] text-white"
                )}
              >
                <span className="text-sm font-medium">{currentStep + 1}</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground leading-tight">
                  {steps[currentStep].name}
                </p>
                {steps[currentStep].description && (
                  <p className="text-xs text-muted-foreground mt-1 leading-tight">
                    {steps[currentStep].description}
                  </p>
                )}
              </div>
            </div>
            <div className="text-sm text-muted-foreground font-medium">
              {currentStep + 1} of {steps.length}
            </div>
          </div>

          {/* Mobile step dots */}
          <div className="flex justify-center space-x-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={cn(
                  "h-2 w-2 rounded-full transition-colors duration-300",
                  index <= currentStep
                    ? "bg-[#074318]"
                    : "bg-muted-foreground/25"
                )}
              />
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}
