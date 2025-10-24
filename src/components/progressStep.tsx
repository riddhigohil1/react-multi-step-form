import type { Step } from "@/types";
import { Check } from "lucide-react";

export default function ProgressStep({
  currentStep,
  steps,
  isSubmitted,
}: {
  currentStep: number;
  steps: Step[];
  isSubmitted: boolean;
}) {
  return (
    <div className="flex justify-between items-center">
      {steps.map((step, index) => {
        const Icon = step.icon;
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;
        const flexClsNm = index === steps.length - 1 ? "" : "flex-1";

        return (
          <div key={step.id} className={`flex items-center ${flexClsNm}`}>
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  isCompleted
                    ? "bg-primary text-primary-foreground "
                    : isCurrent
                    ? "bg-primary text-primary-foreground"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {isCompleted || isSubmitted ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <Icon className={`w-5 h-5`} />
                )}
              </div>

              <span className="text-xs mt-2 font-medium">{step.name}</span>
            </div>

            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-[2px] mx-2 transition-colors ${
                  isCompleted ? "bg-primary" : "bg-gray-200"
                }`}
              ></div>
            )}
          </div>
        );
      })}
    </div>
  );
}
