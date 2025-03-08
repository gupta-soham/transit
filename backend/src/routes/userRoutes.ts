import express from 'express';
import { LoginSchema, onboardingSchema, phoneLoginSchema } from '../validators/types.ts';
import { PrismaClient } from '@prisma/client';
import { auth } from '../auth/auth.ts';

const userRouter = express.Router();
const prisma = new PrismaClient();

userRouter.post('/onboarding', async (req, res): Promise<any> => {
    const { userId, ...userData } = onboardingSchema.parse(req.body);
    try {
        const userUpdate = await prisma.user.update({
            where: { id: userId, emailVerified: true },
            data: {
                ...userData,
                updatedAt: new Date(),
            }
        });
        console.log("User details saved successfully: ", userUpdate.email);
        return res.status(201).json({ message: 'Successfully saved information', userId: userUpdate.id });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error saving user details' });
    }
});

userRouter.get('/details', async (req, res): Promise<any> => {
    const userId = req.query.userId as string;
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId, emailVerified: true },
            select: {
                name: true,
                image: true,
                email: true,
                phoneNumber: true,
                dob: true,
                gender: true,
                passport: true,
            }
        })
        if (!user) return res.status(404).json({ error: 'User not found or email not verified' });

        return res.status(200).json({
            ...user,
            dob: user.dob ? user.dob.toISOString().split('T')[0] : null
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error fetching user details' });
    }
});

userRouter.post('/login/email', async (req, res) => {
    try {
        const validatedData = LoginSchema.parse(req.body);
        const response = await auth.api.signInEmail({ body: validatedData });
        res.status(200).json(response);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error });
        }
    }
});

userRouter.post('/login/phone', async (req, res) => {
    try {
        const validatedData = phoneLoginSchema.parse(req.body);
        const response = await auth.api.signInPhoneNumber({ body: validatedData });
        res.status(200).json(response);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error });
        }
    }
});

// userRouter.get('/login/google', async (req, res) => {
//     try {
//         const response = await auth.api.signInSocial({
//             body: {
//                 provider: "google",
//                 callbackURL: `${process.env.FRONTEND_URL}/dashboard`,
//             },
//         });
//         res.status(200).json(response);
//     } catch (error) {
//         if (error instanceof Error) {
//             res.status(400).json({ error: error.message });
//         } else {
//             res.status(400).json({ error });
//         }
//     }
// });

// userRouter.post('/verify-email', async (req, res) => {
//     try {
//         const validatedData = LoginSchema.parse(req.body);
//         const isVerified = await prisma.user.findUnique({
//             where: { email: validatedData.email },
//             select: { emailVerified: true }
//         })
//         if (isVerified?.emailVerified) {
//             res.status(200).json({ message: "Email is already verified" });
//         } else {
//             const response = await auth.api.sendVerificationEmail({ body: validatedData });
//             if (response) console.log("Verification Email Sent!");
//             res.status(200).json(response);
//         }
//     } catch (error) {
//         if (error instanceof Error) {
//             res.status(400).json({ error: error.message });
//         } else {
//             res.status(400).json({ error });
//         }
//     }
// })

export default userRouter;
