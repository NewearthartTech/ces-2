import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const applicant = await prisma.applicant.update({
    where: { id: id as string },
    data: {
      paid: true,
    },
  });
  res.json(applicant);
}
