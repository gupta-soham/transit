import { z } from "zod";

const SignupSchema = z
    .object({
        name: z
            .string()
            .min(2, { message: "Minimum 2 characters are required" })
            .max(25, { message: "Maximum of 20 characters are allowed" }),
        email: z
            .string()
            .email({ message: "Invalid email address" })
            .min(1, { message: "Email is required" }),
        password: z
            .string()
            .min(8, { message: "Password must be at least 6 characters long" })
            .max(20, { message: "Password must be at most 20 characters long" }),
        image: z.string().optional(),
    })

const LoginSchema = z.object({
    email: z
        .string()
        .email({ message: "Invalid email" })
        .min(1, { message: "Email is required" }),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .max(20, { message: "Password must be at most 20 characters long" }),
})

const ForgotPasswordSchema = z.object({
    email: z
        .string()
        .email({ message: "Invalid type" })
        .min(1, { message: "Email is required" }),
})

const ChangePasswordSchema = z.object({
    currentPassword: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .max(20, { message: "Password must be at most 20 characters long" }),
    newPassword: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .max(20, { message: "Password must be at most 20 characters long" }),
    revokeOtherSessions: z.boolean().optional(),
});

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
    dob: z.string().refine(val => !isNaN(Date.parse(val)), { message: "Invalid date format" }),
    gender: z.string(),
    phone: z.string().optional(),
    email: z.string().email().optional(),
    passport: z.string().optional(),
});

export { SignupSchema, LoginSchema, ForgotPasswordSchema, ChangePasswordSchema, familyMemberSchema, paymentMethodSchema };  