import express from 'express';
import { onboardingSchema } from '../validators/types.ts';
import { PrismaClient } from '@prisma/client';

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
        return res.status(201).json({ message: 'successfully saved information', userId: userUpdate.id });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error saving user details' });
    }
});

export default userRouter;
