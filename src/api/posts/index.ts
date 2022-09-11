/* eslint-disable no-case-declarations */
import type { UmiApiRequest, UmiApiResponse } from 'umi';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '@/utils/jwt';

export default async function (req: UmiApiRequest, res: UmiApiResponse) {
  let prisma: PrismaClient;
  switch (req.method) {
    case 'GET':
      prisma = new PrismaClient();
      const allPosts = await prisma.post.findMany({
        include: { author: true },
        // todo 这里你没有隐藏 password
      });
      res.status(200).json(allPosts);
      await prisma.$disconnect();
      break;

    case 'POST':
      if (!req.cookies?.token) {
        return res.status(401).json({
          message: 'Unauthorized',
        });
      }

      const authorId = (await verifyToken(req.cookies.token)).id;
      console.log('req, cookie:', req.cookies.token);
      console.log('req, req body,', req.body);
      console.log('res, user', authorId);
      prisma = new PrismaClient();
      const newPost = await prisma.post.create({
        data: {
          title: req.body.title,
          content: req.body.content,
          createdAt: new Date(),
          authorId,
          tags: req.body.tags.join(','),
          imageUrl: req.body.imageUrl,
        },
      });
      console.log('res,new post', newPost);
      res.status(200).json(newPost);
      await prisma.$disconnect();
      break;
    default:
      res.status(405).json({ error: 'Method not allowed' });
  }
}
