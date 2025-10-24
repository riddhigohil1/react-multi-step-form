import type { StepFormData } from "@/types";
import type { useForm } from "react-hook-form";
import FromField from "./formField";

interface addressProps {
  register: ReturnType<typeof useForm<StepFormData>>["register"];
  errors: Record<string, { message?: string }>;
}

export default function AddressInfoStep({ register, errors }: addressProps) {
  return (
    <div className="space-y-4">
      <FromField
        id="address"
        label="Address"
        register={register}
        errors={errors}
      />
      <div className="grid grid-cols-2 gap-4">
        <FromField id="city" label="City" register={register} errors={errors} />
        <FromField
          id="state"
          label="State"
          register={register}
          errors={errors}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <FromField
          id="zipcode"
          label="Zipcode"
          register={register}
          errors={errors}
        />

        <FromField
          id="country"
          label="Country"
          register={register}
          errors={errors}
        />
      </div>
    </div>
  );
}
