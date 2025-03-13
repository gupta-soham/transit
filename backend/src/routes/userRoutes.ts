import express from 'express';
import { LoginSchema, onboardingSchema, OTPVerificationSchema, phoneLoginSchema, SignupSchema } from '../validators/types';
import { PrismaClient } from '@prisma/client';
import { auth } from '../auth/auth';

const userRouter = express.Router();
const prisma = new PrismaClient();


/**
 * @swagger
 * /api/user/onboarding:
 *   post:
 *     summary: Onboard a user by updating their profile.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "12345"
 *               dob:
 *                 type: string
 *                 format: date
 *                 example: "1995-08-20"
 *               gender:
 *                 type: string
 *                 enum: ["male", "female", "transgender"]
 *                 example: "male"
 *               phoneNumber:
 *                 type: string
 *                 example: "9876543210"
 *               passport:
 *                 type: string
 *                 example: "A1234567"
 *     responses:
 *       201:
 *         description: Successfully saved information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Successfully saved information"
 *                 userId:
 *                   type: string
 *                   example: "12345"
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */

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


/**
 * @swagger
 * /api/user/details:
 *   get:
 *     summary: Get user details
 *     description: Fetches details of a user by userId.
 *     tags: [User]
 *     parameters:
 *       - in: query
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: Successfully retrieved user details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 image:
 *                   type: string
 *                 email:
 *                   type: string
 *                 phoneNumber:
 *                   type: string
 *                 dob:
 *                   type: string
 *                   format: date
 *                 gender:
 *                   type: string
 *                 passport:
 *                   type: string
 *       404:
 *         description: User not found or email not verified
 *       500:
 *         description: Server error fetching user details
 */



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

/**
 * @swagger
 * components:
 *   schemas:
 *     SignupSchema:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           minLength: 3
 *           maxLength: 25
 *           example: "John Doe"
 *         email:
 *           type: string
 *           format: email
 *           example: "johndoe@example.com"
 *         password:
 *           type: string
 *           minLength: 8
 *           maxLength: 20
 *           example: "SecurePassword123"
 *         image:
 *           type: string
 *           format: uri
 *           example: "https://example.com/avatar.jpg"
 */

/**
 * @swagger
 * /api/user/register/email:
 *   post:
 *     summary: Register a new user with email & password
 *     description: Registers a new user and returns user details.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/SignupSchema"
 *     responses:
 *       200:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "123456"
 *                 email:
 *                   type: string
 *                   example: "johndoe@example.com"
 *                 name:
 *                   type: string
 *                   example: "John Doe"
 *       400:
 *         description: Bad request (validation error or user already exists)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Email is required"
 */

userRouter.post('/register/email', async (req, res): Promise<any> => {
    try {
        const validatedData = SignupSchema.parse(req.body);
        const response = await auth.api.signUpEmail({ body: validatedData, callbackURL: "" });
        return res.status(200).json(response);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: error.message });
        } else {
            return res.status(400).json({ error });
        }
    }
});


/**
 * @swagger
 * components:
 *   schemas:
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: The user's email address
 *           example: test@example.com
 *         password:
 *           type: string
 *           minLength: 8
 *           maxLength: 20
 *           description: The user's password
 *           example: password123
 *
 *     LoginResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           description: JWT token for authentication
 *           example: "eyJhbGciOiJIUzI1..."
 *         user:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               example: "12345"
 *             email:
 *               type: string
 *               example: "test@example.com"
 *
 * /api/user/login/email:
 *   post:
 *     summary: User login with email
 *     description: Authenticate user and return JWT token
 *     tags:
 *       - Authentication
 * 
 *     parameters:
 *       - in: header
 *         name: Content-Type
 *         required: true
 *         schema:
 *           type: string
 *           example: application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       "200":
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/LoginResponse"
 *       "400":
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid email address"
 */

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


/**
 * @swagger
 * /api/user/login/phone:
 *   post:
 *     summary: Login with Phone Number
 *     description: Allows users to log in using their phone number and password.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phoneNumber
 *               - password
 *             properties:
 *               phoneNumber:
 *                 type: string
 *                 example: "9876543210"
 *                 description: User's phone number
 *               password:
 *                 type: string
 *                 example: "yourPassword123"
 *                 description: User's password (8-20 characters)
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1..."
 *                 userId:
 *                   type: string
 *                   example: "62f15c123abc456d78e90f12"
 *       400:
 *         description: Invalid input or validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid phone number"
 */


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

userRouter.get('/login/google', async (req, res) => {
    try {
        const response = await auth.api.signInSocial({
            body: {
                provider: "google",
                callbackURL: `${process.env.FRONTEND_APP_URL}/dashboard`,
            },
        });
        res.status(200).json(response);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error });
        }
    }
});

userRouter.post('/verify-email', async (req, res) => {
    try {
        const validatedData = LoginSchema.parse(req.body);
        const isVerified = await prisma.user.findUnique({
            where: { email: validatedData.email },
            select: { emailVerified: true }
        })
        if (isVerified?.emailVerified) {
            res.status(200).json({ message: "Email is already verified" });
        } else {
            const response = await auth.api.sendVerificationEmail({ body: validatedData });
            if (response) console.log("Verification Email Sent!");
            res.status(200).json(response);
        }
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error });
        }
    }
});

userRouter.post('/send-otp', async (req, res) => {
    try {
        const validatedData = phoneLoginSchema.parse(req.body);
        const response = await auth.api.sendPhoneNumberOTP({ body: validatedData });
        res.status(200).json(response);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error });
        }
    }
});

userRouter.post('/verify-otp', async (req, res) => {
    try {
        const validatedData = OTPVerificationSchema.parse(req.body);
        const response = await auth.api.verifyPhoneNumber({
            body: validatedData,
            updatePhoneNumber: true,
            disableSession: true,
        });
        res.status(200).json(response);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error });
        }
    }
});

export default userRouter;
