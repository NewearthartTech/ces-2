import { Approval, PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse<Approval>) {
  const { method } = req;
  const prisma = new PrismaClient();
  if (method === "POST") {
    const { body } = req;

    const approval = await prisma.approval.create({
      data: {
        ...body,
        id: undefined,
      },
    });

    return res.status(200).json(approval);
  }
}
