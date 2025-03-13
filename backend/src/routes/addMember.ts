import express from 'express';
import { PrismaClient } from '@prisma/client';
import { familyMemberSchema } from '../validators/types';

const memberRouter = express.Router();
const prisma = new PrismaClient();


/**
 * @swagger
 * components:
 *   schemas:
 *     FamilyMemberRequest:
 *       type: object
 *       required:
 *         - userId
 *         - name
 *         - dob
 *         - gender
 *       properties:
 *         userId:
 *           type: string
 *           description: The ID of the user who is adding the family member.
 *           example: "1234567890"
 *         name:
 *           type: string
 *           description: Name of the family member.
 *           example: "John Doe"
 *         dob:
 *           type: string
 *           format: date
 *           description: Date of birth in YYYY-MM-DD format.
 *           example: "1990-05-15"
 *         gender:
 *           type: string
 *           enum: [male, female, other]
 *           description: Gender of the family member.
 *           example: "male"
 *         phoneNumber:
 *           type: string
 *           description: Phone number of the family member (optional).
 *           example: "9876543210"
 *         email:
 *           type: string
 *           format: email
 *           description: Email address of the family member (optional).
 *           example: "johndoe@example.com"
 *         passport:
 *           type: string
 *           description: Passport number (optional).
 *           example: "A1234567"
 *
 *     FamilyMemberResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Family member added"
 *         familyMemberId:
 *           type: string
 *           example: "abc123"
 *
 * /api/add/family-members:
 *   post:
 *     summary: Add a family member
 *     description: Adds a new family member associated with a user.
 *     tags:
 *       - Family Members
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/FamilyMemberRequest"
 *     responses:
 *       "201":
 *         description: Family member added successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/FamilyMemberResponse"
 *       "400":
 *         description: Validation error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       message:
 *                         type: string
 *                         example: "Date of birth cannot be in the future"
 *       "404":
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User not found"
 *       "500":
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Server error adding family member"
 */




memberRouter.post('/family-members', async (req, res): Promise<any> => {
  const parseResult = familyMemberSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({ errors: parseResult.error.errors });
  }

  const { userId, ...familyDetails } = parseResult.data;

  // Fetch the user's details from the database
  const user = await prisma.user.findUnique({
    where: { id: userId, emailVerified: true },
    select: { email: true, phoneNumber: true },
  });

  if (!user) throw new Error("User not found");

  // Assign default values if phone or email are not provided
  const phoneNumber = familyDetails.phoneNumber || user.phoneNumber;
  const email = familyDetails.email || user.email;

  try {
    const familyMember = await prisma.familyMember.create({
      data: {
        user: { connect: { id: userId } },
        ...familyDetails, phoneNumber, email,
      }
    });

    return res.status(201).json({ message: 'Family member added', familyMemberId: familyMember.id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error adding family member' });
  }
});

export default memberRouter;