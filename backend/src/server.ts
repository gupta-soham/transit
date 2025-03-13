import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import express from "express";
import { auth } from "./auth/auth";
import { setupSwagger } from "./swagger";
import rootRouter from "./routes/index";

const app = express();
const port = process.env.PORT || 8000;

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
// app.use(cors());

// Mount express json middleware after Better Auth handler
// or only apply it to routes that don't interact with Better Auth
app.all("/api/auth/*", toNodeHandler(auth));
app.use(express.json());
setupSwagger(app);

app.use('/api', rootRouter);

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Express server with Prisma and Better Auth' });
    
});

app.listen(port, () => {
    console.log(`Better Auth app listening on port ${port}`);
    console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});
