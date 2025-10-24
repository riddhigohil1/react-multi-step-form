import type { StepFormData } from "@/types";
import AddressInfoStep from "./addressInfoStep";
import PersonaInfoStep from "./personaInfoStep";
import ProfessionalInfoStep from "./professionalInfoStep";
import ProgressStep from "./progressStep";
import { Card, CardContent, CardHeader } from "./ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useMultiStepForm from "@/hooks/useMultiStepForm";
import { useEffect } from "react";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function MultiStepForm() {
  const {
    currentStep,
    formData,
    isFirstStep,
    isLastStep,
    isSubmitted,
    steps,
    getCurrentStepSchema,
    goToNextStep,
    goToPrevStep,
    updateFormData,
    submitForm,
    resetForm,
  } = useMultiStepForm();
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    setValue,
    reset,
  } = useForm<StepFormData>({
    resolver: zodResolver(getCurrentStepSchema()),
    mode: "onChange",
    defaultValues: formData,
  });

  useEffect(() => {
    reset(formData);
  }, [currentStep, formData, reset]);

  const onNext = async (data: StepFormData) => {
    //Validation Check
    const isValid = await trigger();
    if (!isValid) return; // stop if validation fails

    const updatedData = { ...formData, ...data };
    updateFormData(updatedData);

    //Merge Current data with Prev Data

    if (isLastStep) {
      try {
        submitForm(updatedData);
      } catch (error) {
        console.log("Submission failed:", error);
      }
    } else {
      goToNextStep();
    }
  };

  return (
    <div className="min-h-full py-20 flex item-center justify-center align-middle">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <ProgressStep
            currentStep={currentStep}
            steps={steps}
            isSubmitted={isSubmitted}
          />
        </CardHeader>
        <CardContent className="space-y-6">
          {currentStep === 0 && (
            <PersonaInfoStep register={register} errors={errors} />
          )}
          {currentStep === 1 && (
            <AddressInfoStep register={register} errors={errors} />
          )}
          {currentStep === 2 && (
            <>
              {isSubmitted ? (
                <div className="space-y-4">
                  <div className="flex-4 itema-center">
                    <div className="text-xl">Registration Completed!</div>
                    <div className="text-sm">
                      Thank you for providing your information. We'll get back
                      to you soon with next step.
                    </div>
                    <div>
                      <a href="/">
                        <Button className="text-sm mt-6" variant="outline">
                          Submit Another Form
                        </Button>
                      </a>
                    </div>
                  </div>
                </div>
              ) : (
                <ProfessionalInfoStep
                  register={register}
                  errors={errors}
                  setValue={setValue}
                />
              )}
            </>
          )}

          {!isSubmitted && (
            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={goToPrevStep}
                disabled={isFirstStep}
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>
              <Button onClick={handleSubmit(onNext)}>
                {isLastStep ? "Submit" : "Next"}
                {!isLastStep && <ChevronRight className="w-4 h-4 ml-1" />}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
