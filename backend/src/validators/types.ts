import { isValidPhoneNumber } from "libphonenumber-js";
import { z } from "zod";

const genderOptions = ["male", "female", "transgender"] as const;

const LoginSchema = z.object({
    email: z
        .string()
        .email({ message: "Invalid email address" })
        .min(1, { message: "Email is required" }),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .max(20, { message: "Password must be at most 20 characters long" }),
})


const paymentMethodSchema = z.object({
    cardHolder: z.string(),
    cardType: z.string(), // could be refined to enum values
    last4: z.string().length(4),
    expiryMonth: z.number().int().min(1).max(12),
    expiryYear: z.number().int().min(new Date().getFullYear()),
    token: z.string().optional(),
    userId: z.string(),
});

const familyMemberSchema = z.object({
    userId: z.string(),
    name: z.string(),
    // YYYY-MM-DD => ISO 8601 date format
    dob: z.coerce.date({ required_error: "Date of birth is required", invalid_type_error: "Invalid date format" })
        .max(new Date(), { message: "Date of birth cannot be in the future" })
        .min(new Date("1900-01-01"), { message: "Date of birth is too far in the past" }),
    gender: z.enum(genderOptions, { message: "Invalid gender selection" }),
    phoneNumber: z
        .string()
        .refine((val) => isValidPhoneNumber("+91" + val) || isValidPhoneNumber(val), {
            message: "Invalid phone number"
        }).optional(),
    email: z.string().email({ message: "Invalid email address" }).optional(),
    passport: z.string().regex(/^[a-zA-Z0-9]+$/, {
        message: "Passport number must contain only alphanumeric characters",
    }).optional(),

});

const onboardingSchema = z.object({
    userId: z.string(),
    // YYYY-MM-DD => ISO 8601 date format
    dob: z.coerce.date({ required_error: "Date of birth is required", invalid_type_error: "Invalid date format" })
        .max(new Date(), { message: "Date of birth cannot be in the future" })
        .min(new Date("1920-01-01"), { message: "Date of birth is too far in the past" }),
    gender: z.enum(genderOptions, { message: "Invalid gender selection" }),
    phoneNumber: z
        .string()
        .refine((val) => isValidPhoneNumber("+91" + val) || isValidPhoneNumber(val), {
            message: "Invalid phone number"
        }),
    passport: z.string().regex(/^[a-zA-Z0-9]+$/, {
        message: "Passport number must contain only alphanumeric characters",
    }).optional(),
});

const phoneLoginSchema = z.object({
    phoneNumber: z
        .string()
        .refine((val) => isValidPhoneNumber("+91" + val) || isValidPhoneNumber(val), {
            message: "Invalid phone number"
        }),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .max(20, { message: "Password must be at most 20 characters long" }),
});

export { LoginSchema, familyMemberSchema, paymentMethodSchema, onboardingSchema, phoneLoginSchema };  