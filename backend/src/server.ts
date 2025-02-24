import { toNodeHandler, fromNodeHeaders } from "better-auth/node";
import cors from "cors";
import express from "express";
import { auth } from "./auth/auth.ts";
import rootRouter from "./routes/index.ts";

const app = express();
const port = process.env.PORT || 8000;

app.all("/api/auth/*", toNodeHandler(auth));

// Mount express json middleware after Better Auth handler
// or only apply it to routes that don't interact with Better Auth
app.use(express.json());
app.use(cors());

app.use('/', rootRouter);

app.get("/api/me", async (req, res): Promise<any> => {
    try {
        const session = await auth.api.getSession({
            headers: fromNodeHeaders(req.headers),
        });
        if (!session) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        return res.json(session);
    } catch (error) {
        return res.status(500).json({ error: "Failed to fetch session" });
    }
});

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Express server with Prisma and Better Auth' });
});

app.listen(port, () => {
    console.log(`Better Auth app listening on port ${port}`);
});