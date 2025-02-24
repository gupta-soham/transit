import express from 'express';
import { paymentMethodSchema } from '../validators/types.ts';
import { PrismaClient } from '@prisma/client';

const paymentRouter = express.Router();
const prisma = new PrismaClient();

paymentRouter.post('/save-payment', async (req, res): Promise<any> => {
    const validatedData = paymentMethodSchema.parse(req.body);
    try {
        const paymentMethod = await prisma.paymentMethod.create({
            data: {
                ...validatedData,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        });
        return res.status(201).json({ message: 'Payment method saved', paymentMethodId: paymentMethod.id });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error saving payment method' });
    }
});

export default paymentRouter;
