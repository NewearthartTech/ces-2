import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { body } = req;
    const listing = await prisma.workPosting.upsert({
      where: { id: body.id as string },
      create: body,
      update: body,
    });
    res.json(listing);
  }
}
