import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { body } = req;
    const applicant = await prisma.applicant.create({
      data: body,
    });
    res.json(applicant);
  }
}
