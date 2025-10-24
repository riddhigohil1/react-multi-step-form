import { z } from "zod";

export const personalInfoSchema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  email: z.email("Invalid email address"),
  phone: z.string().min(10, "Phone number is too short"),
});

export const addressInfoSchema = z.object({
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipcode: z.string().min(5, "Invalid Zipcode"),
  country: z.string().min(1, "Country is required"),
});

export const professionalInfoSchema = z.object({
  company: z.string().min(1, "Company name is required"),
  position: z.string().min(1, "Position is required"),
  experience: z.enum(["0-2", "3-5", "6-10", "10+"]),
  industry: z.string().min(1, "Industry is required"),
});

export type PersonalInfo = z.infer<typeof personalInfoSchema>;
export type AddressInfo = z.infer<typeof addressInfoSchema>;
export type ProfessioanlInfo = z.infer<typeof professionalInfoSchema>;

export type StepFormData = PersonalInfo | ProfessioanlInfo | AddressInfo;
export type AllFormData = PersonalInfo & ProfessioanlInfo & AddressInfo;

export interface Step {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}
