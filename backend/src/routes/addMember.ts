import express from 'express';
import { PrismaClient } from '@prisma/client';
import { familyMemberSchema } from '../validators/types.ts';

const memberRouter = express.Router();
const prisma = new PrismaClient();

memberRouter.post('/api/family-members', async (req, res): Promise<any> => {
  const parseResult = familyMemberSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({ errors: parseResult.error.errors });
  }
  const familyMemberData = parseResult.data;
  try {
    const familyMember = await prisma.familyMember.create({
      data: {
        ...familyMemberData,
        dob: new Date(familyMemberData.dob),
      }
    });
    return res.status(201).json({ message: 'Family member added', familyMemberId: familyMember.id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error adding family member' });
  }
});

export default memberRouter;