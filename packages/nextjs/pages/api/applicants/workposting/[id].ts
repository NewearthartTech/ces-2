import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const applicants = await prisma.applicant.findMany({
    where: { workPostingId: id as string },
  });
  res.json(applicants);
}
