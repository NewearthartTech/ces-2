import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { body } = req;
    const listing = await prisma.workPosting.create({
      data: body,
    });
    res.json(listing);
  }
}
