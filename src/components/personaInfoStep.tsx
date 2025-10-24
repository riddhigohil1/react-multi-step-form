import type { useForm } from "react-hook-form";
import FromField from "./formField";
import type { StepFormData } from "@/types";

interface personalProps {
  register: ReturnType<typeof useForm<StepFormData>>["register"];
  errors: Record<string, { message?: string }>;
}
export default function PersonaInfoStep({ register, errors }: personalProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <FromField
          id="firstName"
          label="First Name"
          register={register}
          errors={errors}
        />
        <FromField
          id="lastName"
          label="Last Name"
          register={register}
          errors={errors}
        />
      </div>

      <FromField
        id="email"
        label="Email Address"
        register={register}
        errors={errors}
        type="email"
      />

      <FromField
        id="phone"
        label="Phone Number"
        register={register}
        errors={errors}
        type="tel"
      />
    </div>
  );
}
