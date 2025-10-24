import type { StepFormData } from "@/types";
import type { useForm } from "react-hook-form";
import FromField from "./formField";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useState } from "react";

interface professionalProps {
  register: ReturnType<typeof useForm<StepFormData>>["register"];
  errors: Record<string, { message?: string }>;
  setValue?: ReturnType<typeof useForm<StepFormData>>["setValue"];
}

export default function ProfessionalInfoStep({
  register,
  errors,
  setValue,
}: professionalProps) {
  const [experience, setExperience] = useState("");
  return (
    <div className="space-y-4">
      <FromField
        id="company"
        label="Company Name"
        register={register}
        errors={errors}
      />

      <FromField
        id="position"
        label="Position"
        register={register}
        errors={errors}
      />

      <div className="space-y-2">
        <Label htmlFor="experience">Years of experience</Label>
        <Select
          onValueChange={(value) => {
            setValue?.(
              "experience",
              value as Extract<
                StepFormData,
                { experience: string }
              >["experience"],
              { shouldValidate: true }
            );

            setExperience(value);
          }}
          value={experience}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select Experience" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="09">{experience}</SelectItem>
            <SelectItem value="0-2">0-2 Years</SelectItem>
            <SelectItem value="3-5">3-5 Years</SelectItem>
            <SelectItem value="6-10">6-10 Years</SelectItem>
            <SelectItem value="10+">10+ Years</SelectItem>
          </SelectContent>
        </Select>

        {errors.experience && (
          <p className="text-sm text-destructive">
            {errors.experience?.message}
          </p>
        )}
      </div>

      <FromField
        id="industry"
        label="Industry"
        register={register}
        errors={errors}
      />
    </div>
  );
}
