import { PrismaClient } from '@prisma/client';
import { v4 as uuid } from 'uuid';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  await prisma.resume.upsert({
    where: { id: uuid() },
    update: {},
    create: {
      wantedJob: 'Senior Frontend Engineer',
      avatarUrl: 'https://github.com/shadcn.png',
      city: 'Taipei',
      phone: '09123456789',
      email: 'leo@gmail.com',
      intro:
        '我是一位熱愛學習與探索的人，喜歡挑戰自己並且樂於接受新的挑戰。我擁有堅強的自學能力和團隊合作精神，樂於與他人分享知識與經驗。在工作中，我注重細節，勇於承擔責任，並且樂於面對挑戰，不斷追求提升自己。我希望能夠在未來的工作中，發揮自己的潛力，並且與團隊一起努力，共同成長與進步。',
    },
  });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
