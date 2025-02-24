import { PrismaClient } from '@prisma/client';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { phoneNumber } from 'better-auth/plugins';
import { Resend } from 'resend';

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY!);
export const auth = betterAuth({
    appName: "transit_auth",
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true,
        sendResetPassword: async ({ user, url }) => {
            await resend.emails.send({
                from: "Transit <onboarding@transt.co>",
                to: user.email,
                subject: "Reset your password",
                html: `Click the link to reset your password: ${url}`,
            });
        },
        resetPasswordTokenExpiresIn: 0.25, // 15 minutes
        requireEmailVerification: true,
        autoSignIn: true,
        minPasswordLength: 8,
        maxPasswordLength: 20,
    },

    emailVerification: {
        sendVerificationEmail: async ({ user, url, token }, request) => {
            await resend.emails.send({
                from: "Transit <onboarding@transt.co>",
                to: user.email,
                subject: "Verify your email address",
                text: `Click the link to verify your email: ${url}`,
            });
        },
    },


    // socialProviders: {
    //     google: {
    //         clientId: process.env.GOOGLE_CLIENT_ID!,
    //         clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    //         redirectUri: process.env.BETTER_AUTH_URL! + "/api/auth/callback/google"
    //     },
    // },

    plugins: [
        phoneNumber({
            // Function to send OTP code via SMS.
            sendOTP: async ({ phoneNumber, code }, request) => {
                // Replace this with your SMS provider's API call.
                // Example using Twilio (pseudo-code):
                // await twilioClient.messages.create({
                //   to: phoneNumber,
                //   from: process.env.TWILIO_PHONE,
                //   body: `Your OTP code is: ${code}`
                // });
                console.log(`Sending OTP ${code} to phone number ${phoneNumber}`);
            },
            // Optional configuration to allow phone number based sign up.
            signUpOnVerification: {
                getTempEmail: (phoneNumber) => `${phoneNumber}@my-site.com`,
                getTempName: (phoneNumber) => phoneNumber,
            },
            // Optional callback after successful phone number verification.
            callbackOnVerification: async ({ phoneNumber, user }, request) => {
                console.log(`Phone number ${phoneNumber} verified for user ${user.id}`);
            }
        })
    ]
});