import express from 'express';
import memberRouter from './addMember';
import authRouter from './authRoutes';
import paymentRouter from './savePayment';
import userRouter from './userRoutes';

const rootRouter = express.Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/add", memberRouter);
rootRouter.use("/save", paymentRouter);
rootRouter.use("/user", userRouter);

export default rootRouter;