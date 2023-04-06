import { Approval, PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse<Approval | null>) {
  const { method } = req;
  const { id } = req.query;

  if (method === "GET") {
    const approval = await prisma.approval.findUnique({
      where: {
        id: id as string,
      },
    });
    if (approval) return res.status(200).json(approval);
    else return res.status(404).end();
  }
}
