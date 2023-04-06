import { Approval, PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse<Approval | null>) {
  const { method } = req;
  const { id } = req.query;

  if (method === "GET") {
    const approval = await prisma.approval.findMany({
      where: {
        applicantId: id as string,
      },
    });
    if (approval[0]) return res.status(200).json(approval[0]);
    else return res.status(404).end();
  }
}
