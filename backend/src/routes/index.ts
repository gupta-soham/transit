import express from 'express';
import memberRouter from './addMember';
import userRouter from './userRoutes';
import travelRouter from './travelRoutes';

const rootRouter = express.Router();

rootRouter.use("/user", userRouter);
rootRouter.use("/add", memberRouter);
rootRouter.use("/travel", travelRouter);

export default rootRouter;