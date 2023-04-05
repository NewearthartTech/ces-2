import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { applicantid } = req.query;
    const applicant = await prisma.applicant.findUnique({
      where: { id: applicantid as string },
    });
    res.json(applicant);
  } else if (req.method === "POST") {
    const { body } = req;
    const applicant = await prisma.applicant.upsert({
      where: { id: body.id as string },
      create: body,
      update: body,
    });
    res.json(applicant);
  }
}
