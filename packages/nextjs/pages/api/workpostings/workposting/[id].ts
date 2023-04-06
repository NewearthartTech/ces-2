import { PrismaClient, WorkPosting } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse<WorkPosting | null>) {
  const { method } = req;
  const { id } = req.query;

  if (method === "GET") {
    const workPosting = await prisma.workPosting.findUnique({
      where: {
        id: id as string,
      },
    });
    if (workPosting) return res.status(200).json(workPosting);
    else return res.status(404).end();
  }
}
