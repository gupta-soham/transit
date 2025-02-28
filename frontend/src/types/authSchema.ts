import { z } from "zod";
import { isValidPhoneNumber } from "libphonenumber-js";

const genderOptions = ["male", "female", "non-binary", "prefer not to say"] as const;

export const ResetPasswordSchema = z.
  object({
    password: z
      .string() // check if it is string type
      .min(8, { message: "Password must be at least 8 characters long" }) // checks for character length
      .max(20, { message: "Password must be at most 20 characters long" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(20, { message: "Password must be at most 20 characters long" }),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const ForgotPasswordSchema = z.
  object({
    email: z
      .string()
      .email({ message: "Invalid type" })
      .min(1, { message: "Email is required" }),
  });

export const ChangePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, { message: "Current password is required" }),
    newPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(20, { message: "Password must be at most 20 characters long" }),
    confirmNewPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(20, { message: "Password must be at most 20 characters long" }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });

export const OnboardingSchema = z.
  object({
    userId: z.string(),
    // YYYY-MM-DD => ISO 8601 date format
    dob: z.coerce.date({ required_error: "Date of birth is required", invalid_type_error: "Invalid date format" })
      .max(new Date(), { message: "Date of birth cannot be in the future" })
      .min(new Date("1920-01-01"), { message: "Date of birth is too far in the past" }),
    gender: z.enum(genderOptions, { message: "Invalid gender selection" }),
    phoneNumber: z // Example: +919899998898
      .string()
      .refine((val) => isValidPhoneNumber(val), {
        message: "Invalid phone number",
      })
      .optional(),
    passport: z.string().regex(/^[a-zA-Z0-9]+$/, {
      message: "Passport number must contain only alphanumeric characters",
    }).optional(),
  });