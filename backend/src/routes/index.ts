import express from 'express';
import memberRouter from './addMember';
import userRouter from './userRoutes';
import travelRouter from './travelRoutes';
import contactRoutes from './contactForm'

const rootRouter = express.Router();

rootRouter.use("/user", userRouter);
rootRouter.use("/add", memberRouter);
rootRouter.use("/travel", travelRouter);
rootRouter.use("/form", contactRoutes);


export default rootRouter;