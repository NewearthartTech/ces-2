import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { pagenumber, contentnumber } = req.query;
  const contentToSkip = (Number(pagenumber as string) - 1) * Number(contentnumber as string);
  const workPostings = await prisma.workPosting.findMany({
    skip: contentToSkip,
    take: Number(contentnumber as string),
  });
  return res.status(200).json(workPostings);
}
