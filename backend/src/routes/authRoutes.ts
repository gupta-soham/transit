import express from 'express';
import { ChangePasswordSchema, ForgotPasswordSchema, LoginSchema, SignupSchema } from '../validators/types.ts';
import { auth } from '../auth/auth.ts';

const authRouter = express.Router();

authRouter.post('/register/email', async (req, res) => {
    console.log("Register route hit", req.body);
    try {
        const validatedData = SignupSchema.parse(req.body);
        console.log("Data validated", validatedData);
        const response = await auth.api.signUpEmail({ body: validatedData });
        console.log("Registration successful", response);
        res.status(200).json(response);
    } catch (error) {
        console.error("Registration error", error);
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error });
        }
    }
});

authRouter.post('/login/email', async (req, res) => {
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

authRouter.post('/verify-email', async (req, res) => {
    try {
        const validatedData = LoginSchema.parse(req.body);
        const response = await auth.api.sendVerificationEmail({ body: validatedData });
        if (response) console.log("Verification Email Sent!");
        res.status(200).json(response);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error });
        }
    }
})

authRouter.post('/forgot', async (req, res) => {
    try {
        const validatedData = ForgotPasswordSchema.parse(req.body)
        const response = await auth.api.forgetPassword({ body: validatedData })
        res.status(200).json(response);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error });
        }
    }
})

authRouter.post('/change-password', async (req, res) => {
    try {
        const validatedData = ChangePasswordSchema.parse(req.body)
        const response = await auth.api.changePassword({ body: validatedData })
        res.status(200).json(response);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error });
        }
    }
})

export default authRouter;
