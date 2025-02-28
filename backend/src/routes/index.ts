import express from 'express';
import memberRouter from './addMember';
import userRouter from './userRoutes';

const rootRouter = express.Router();

rootRouter.use("/user", userRouter);
rootRouter.use("/add", memberRouter);

export default rootRouter;