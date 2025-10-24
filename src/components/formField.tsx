import type { AllFormData, StepFormData } from "@/types";
import { Input } from "./ui/input";
import type { useForm } from "react-hook-form";
import { Label } from "./ui/label";

export default function FromField({
  id,
  label,
  register,
  errors,
  type = "text",
  maxLength,
}: {
  id: keyof AllFormData;
  label: string;
  register: ReturnType<typeof useForm<StepFormData>>["register"];
  errors: Record<string, { message?: string }>;
  type?: string;
  maxLength?: number;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type={type} maxLength={maxLength} {...register(id)} />

      {errors[id] && (
        <p className="text-sm text-destructive">{errors[id]?.message}</p>
      )}
    </div>
  );
}
