import express from 'express';
import { PrismaClient } from '@prisma/client';
import { familyMemberSchema } from '../validators/types';

const memberRouter = express.Router();
const prisma = new PrismaClient();

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