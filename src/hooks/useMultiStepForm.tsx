import {
  addressInfoSchema,
  personalInfoSchema,
  professionalInfoSchema,
  type Step,
  type StepFormData,
} from "@/types";
import { Briefcase, User, MapPinHouse } from "lucide-react";
import { useState } from "react";

export default function useMultiStepForm() {
  const stepSchemas = [
    personalInfoSchema,
    addressInfoSchema,
    professionalInfoSchema,
  ];

  const steps: Step[] = [
    { id: "personal", name: "Personal Info", icon: User },
    { id: "address", name: "Address Info", icon: MapPinHouse },
    { id: "professional", name: "Professional Info", icon: Briefcase },
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<StepFormData>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  /* Return the schema for the surrent step */
  const getCurrentStepSchema = () => stepSchemas[currentStep];

  // Go to Next Step
  const goToNextStep = () => {
    if (!isLastStep) setCurrentStep((prev) => prev + 1);
  };

  // Go to Prev Step
  const goToPrevStep = () => {
    if (!isFirstStep) setCurrentStep((prev) => prev - 1);
  };

  // Update form data with old and new data
  const updateFormData = (newData: Partial<StepFormData>) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  // Submit from
  const submitForm = (data: StepFormData) => {
    console.log("Final Form Data :", data);
    setIsSubmitted(true);
  };

  // Reset Form
  const resetForm = () => {
    setCurrentStep(0);
    setFormData({});
    setIsSubmitted(false);
  };

  return {
    steps,
    currentStep,
    formData,
    isSubmitted,
    isFirstStep,
    isLastStep,

    getCurrentStepSchema,
    goToNextStep,
    goToPrevStep,
    updateFormData,
    submitForm,
    resetForm,
  };
}
