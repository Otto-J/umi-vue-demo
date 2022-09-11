import type { UmiApiRequest, UmiApiResponse } from 'umi';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { signToken } from '@/utils/jwt';

const postReg = async (req: UmiApiRequest, res: UmiApiResponse) => {
  try {
    const prisma = new PrismaClient();
    console.log(req.body, 'req body');

    const user = await prisma.user.create({
      data: {
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 8),
        name: req.body.name,
        avatarUrl: req.body.avatarUrl,
      },
    });
    console.log(user, 'user');
    res
      .status(201)
      .setCookie('token', await signToken(user.id))
      .json({ ...user, passwordHash: undefined });
    await prisma.$disconnect();
  } catch (e: any) {
    console.log('catch e', e);
    res.status(500).json({
      result: false,
      message:
        typeof e.code === 'string'
          ? 'https://www.prisma.io/docs/reference/api-reference/error-reference#' +
            e.code.toLowerCase()
          : e,
    });
  }
};
export default async function (req: UmiApiRequest, res: UmiApiResponse) {
  switch (req.method) {
    case 'POST':
      await postReg(req, res);

      break;
    default:
      res.status(405).json({ error: 'Method not allowed' });
  }
}
