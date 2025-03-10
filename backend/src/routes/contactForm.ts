import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// Handle form submission
router.post("/contact", async (req, res) => {
    try {
        const { firstName, lastName, country, industry, companyName, companyWebsite, companyEmail, phone, message } = req.body;

        const newContact = await prisma.contact.create({
            data: {
                firstName,
                lastName,
                country,
                industry,
                companyName,
                companyWebsite,
                companyEmail,
                phone,
                message,
            },
        });

        res.status(201).json({ success: true, data: newContact });
    } catch (error) {
        console.error("Error saving contact:", error);
        res.status(500).json({ success: false, message: "Something went wrong" });
    }
});

export default router;
