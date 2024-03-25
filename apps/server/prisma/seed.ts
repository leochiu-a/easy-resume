import { GroupLayout, GroupType, PrismaClient } from '@prisma/client';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';

// initialize Prisma Client
const prisma = new PrismaClient();

const roundsOfHashing = 10;

async function main() {
  const user = await prisma.user.upsert({
    where: { email: 'leo@gmail.com' },
    update: {},
    create: {
      name: 'Leo',
      email: 'leo@gmail.com',
      password: await bcrypt.hash('password1234', roundsOfHashing),
    },
  });

  await prisma.resume.upsert({
    where: { id: uuid() },
    update: {},
    create: {
      username: 'Leo Chiu',
      wantedJob: 'Senior Frontend Engineer',
      avatarUrl: 'https://github.com/shadcn.png',
      city: 'Taipei',
      phone: '09123456789',
      email: 'leo@gmail.com',
      intro:
        '我是一位熱愛學習與探索的人，喜歡挑戰自己並且樂於接受新的挑戰。我擁有堅強的自學能力和團隊合作精神，樂於與他人分享知識與經驗。在工作中，我注重細節，勇於承擔責任，並且樂於面對挑戰，不斷追求提升自己。我希望能夠在未來的工作中，發揮自己的潛力，並且與團隊一起努力，共同成長與進步。',
      userId: user.id,
      socialLinks: {
        create: [
          {
            name: 'GitHub',
            url: 'https://github.com/leochiu-a',
          },
          {
            name: 'Medium',
            url: 'https://medium.com/@airwaves',
          },
        ],
      },
      groups: {
        create: [
          {
            title: '工作經歷',
            type: GroupType.EmploymentHistory,
            layout: GroupLayout.Complex,
            fields: {
              create: [
                {
                  field1: 'Frontend Engineer',
                  field2: 'Hahow',
                  field3: 'Taipei',
                  timeline: {
                    create: { from: '2020-10-01T00:00:00+08:00', to: null },
                  },
                  description: `
                    - 使用 Vue3 和 TypeScript 作為開發框架和語言。
                    <br/>
                    - 使用以及封裝 Echarts 完成複雜的數據展示。
                    <br/>
                    - 使用類 JSONForm 方案解決表單自動生成，相互依賴，以及實時更新的功能。
                    <br/>
                    - 支持多種複雜交互，拖動，縮放，快捷鍵，回滾，重做等功能。
                    <br/>
                    - 使用多種第三方庫實現高級功能 - cropper.js （圖片裁剪），html2canvas（截圖），qrcode.js （二維碼生成）等等。
                  `,
                },
              ],
            },
          },
          {
            title: '專業技能',
            type: GroupType.Skills,
            layout: GroupLayout.Simple,
            fields: {
              create: [
                {
                  field1: 'React',
                  timeline: {
                    create: { from: '2020-10-01T00:00:00+08:00', to: null },
                  },
                  description: `
                    - 使用 Vue3 以及週邊工具：Vite、Vue-Router、Pinia 以及 Element-Plus 進行 Web 開發
                    <br/>
                    - 使用 React 以及週邊工具；Redux, React-Router, Mobx 進行 Web 開發
                  `,
                },
                {
                  field1: 'NestJS',
                  timeline: {
                    create: { from: '2020-10-01T00:00:00+08:00', to: null },
                  },
                  description: `
                    - 使用 Vue3 以及週邊工具：Vite、Vue-Router、Pinia 以及 Element-Plus 進行 Web 開發
                    <br/>
                    - 使用 React 以及週邊工具；Redux, React-Router, Mobx 進行 Web 開發
                  `,
                },
                {
                  field1: 'TypeScript',
                  timeline: {
                    create: { from: '2020-10-01T00:00:00+08:00', to: null },
                  },
                  description: `
                    - 使用 Vue3 以及週邊工具：Vite、Vue-Router、Pinia 以及 Element-Plus 進行 Web 開發
                    <br/>
                    - 使用 React 以及週邊工具；Redux, React-Router, Mobx 進行 Web 開發
                  `,
                },
              ],
            },
          },
          {
            title: '教育經歷',
            type: GroupType.Education,
            layout: GroupLayout.Complex,
            fields: {
              create: [
                {
                  field1: 'NCU',
                  field2: 'Master degree',
                  field3: '資訊工程',
                  timeline: {
                    create: {
                      from: '2018-07-01T00:00:00+08:00',
                      to: '2020-07-01T00:00:00+08:00',
                    },
                  },
                  description: '',
                },
              ],
            },
          },
          {
            title: '個人專案',
            type: GroupType.Custom,
            layout: GroupLayout.Simple,
            fields: {
              create: [
                {
                  field1: 'Easy Resume',
                  timeline: {
                    create: {
                      from: '2018-07-01T00:00:00+08:00',
                      to: '2020-07-01T00:00:00+08:00',
                    },
                  },
                  description: '',
                },
              ],
            },
          },
          {
            title: '證書',
            type: GroupType.Custom,
            layout: GroupLayout.Simple,
            fields: {
              create: [
                {
                  field1: 'CET-4',
                  timeline: { create: { from: null, to: null } },
                  description: '',
                },
                {
                  field1: 'CET-6',
                  timeline: { create: { from: null, to: null } },
                  description: '',
                },
                {
                  field1: 'PMP',
                  timeline: { create: { from: null, to: null } },
                  description: '',
                },
              ],
            },
          },
        ],
      },
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
