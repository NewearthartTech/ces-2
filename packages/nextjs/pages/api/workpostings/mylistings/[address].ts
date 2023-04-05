import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { address } = req.query;
  const myListings = await prisma.workPosting.findMany({
    where: { walletAddress: address as string },
  });
  return res.status(200).json(myListings);
}
