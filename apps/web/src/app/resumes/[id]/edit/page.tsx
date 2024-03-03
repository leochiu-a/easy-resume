"use client"

import {
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
  useWatch,
} from "react-hook-form"
import { faPencil } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { Textarea } from "@/components/ui/textarea"
import { Typography } from "@/components/ui/typography"
import { FieldVariants, Resume, SectionType } from "@/types/resume"

import { BasicInformation } from "./_components/BasicInfomation"
import { EditableSection } from "./_components/EditableSection"
import ResumePreviewer from "./_components/ResumePreviewer"
import SocialLinksSection from "./_components/SocialLinksSection"

const defaultResume: Resume = {
  resumeTitle: "My Resume",
  wantedJobTitle: "Senior Frontend Engineer",
  username: "Leo",
  avatarUrl: "https://github.com/shadcn.png",
  city: "Taipei",
  phone: "09123456789",
  email: "leo@mail.mail",
  intro:
    "我是一位熱愛學習與探索的人，喜歡挑戰自己並且樂於接受新的挑戰。我擁有堅強的自學能力和團隊合作精神，樂於與他人分享知識與經驗。在工作中，我注重細節，勇於承擔責任，並且樂於面對挑戰，不斷追求提升自己。我希望能夠在未來的工作中，發揮自己的潛力，並且與團隊一起努力，共同成長與進步。",
  socialLinks: [
    { label: "GitHub", url: "@leochiu-a" },
    { label: "Medium", url: "@airwaves" },
  ],
  resumeSections: [
    {
      sectionType: SectionType.EmploymentHistory,
      variant: FieldVariants.ComplexFieldsSection,
      title: "工作經歷",
      fields: [
        {
          field1: "Frontend Engineer",
          field2: "Hahow",
          field3: "Taipei",
          timeline: { from: "2020/10/01", to: null },
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
    {
      sectionType: SectionType.Skills,
      variant: FieldVariants.SimpleFieldsSection,
      title: "專業技能",
      fields: [
        {
          field: "React",
          timeline: { from: "2020/10/01", to: null },
          description: `
            - 使用 Vue3 以及週邊工具：Vite、Vue-Router、Pinia 以及 Element-Plus 進行 Web 開發
            <br/>
            - 使用 React 以及週邊工具；Redux, React-Router, Mobx 進行 Web 開發
          `,
        },
        {
          field: "NestJS",
          timeline: { from: "2020/10/01", to: null },
          description: `
            - 使用 Vue3 以及週邊工具：Vite、Vue-Router、Pinia 以及 Element-Plus 進行 Web 開發
            <br/>
            - 使用 React 以及週邊工具；Redux, React-Router, Mobx 進行 Web 開發
          `,
        },
        {
          field: "TypeScript",
          timeline: { from: "2020/10/01", to: null },
          description: `
            - 使用 Vue3 以及週邊工具：Vite、Vue-Router、Pinia 以及 Element-Plus 進行 Web 開發
            <br/>
            - 使用 React 以及週邊工具；Redux, React-Router, Mobx 進行 Web 開發
          `,
        },
      ],
    },
    {
      sectionType: SectionType.Education,
      variant: FieldVariants.ComplexFieldsSection,
      title: "教育經歷",
      fields: [
        {
          field1: "NCU",
          field2: "Master degree",
          field3: "資訊工程",
          timeline: { from: "2018/07/01", to: "2020/07/01" },
          description: "",
        },
      ],
    },
    {
      sectionType: SectionType.Custom,
      variant: FieldVariants.SimpleFieldsSection,
      title: "個人專案",
      fields: [
        {
          field: "Easy Resume",
          timeline: { from: "2018/07/01", to: "2020/07/01" },
          description: "",
        },
      ],
    },
    {
      sectionType: SectionType.Custom,
      variant: FieldVariants.SimpleFieldsSection,
      title: "證書",
      fields: [
        { field: "CET-4", timeline: null, description: "" },
        { field: "CET-6", timeline: null, description: "" },
        { field: "PMP", timeline: null, description: "" },
      ],
    },
  ],
}

/**
 * 編輯履歷
 */
export default function EditResumePage() {
  const formMethods = useForm<Resume>({
    defaultValues: defaultResume,
  })
  const { control, handleSubmit, register } = formMethods
  const resumeTitle = useWatch({ control, name: "resumeTitle" })
  const { fields } = useFieldArray({ control, name: "resumeSections" })

  const onSubmit: SubmitHandler<Resume> = (data) => {
    console.log(data)
  }

  return (
    <FormProvider {...formMethods}>
      <form className="flex" onSubmit={handleSubmit(onSubmit)}>
        <div className="w-1/2 p-12">
          <div className="flex justify-center text-lg">
            <div className="group flex items-center">
              <input
                className="absolute size-full"
                {...register("resumeTitle")}
              />
              <div className="invisible">{resumeTitle}</div>
              <FontAwesomeIcon
                icon={faPencil}
                className="ml-2 size-4 opacity-0 transition duration-300 group-hover:opacity-100"
              />
            </div>
          </div>

          <div className="mt-12">
            <BasicInformation />

            <SocialLinksSection />

            {/* 工作經歷 */}
            <EditableSection
              description="展示你的相關經驗（過去十年）。如果可能的話，使用條目列出你的成就 -
      使用數字/事實（例如：通過執行 Z 達到了 X，由 Y 測量）。"
              sectionType={SectionType.EmploymentHistory}
            />
            {/* 專業技能 */}
            <EditableSection
              description="選擇五個重要的技能，展示你符合該職位。確保它們與職位描述中提到的關鍵技能相匹配"
              sectionType={SectionType.Skills}
            />
            {/* 教育經歷 */}
            <EditableSection
              description="在履歷中展示多元化的教育背景，概括了您的學習和背景將為工作帶來的價值。"
              sectionType={SectionType.Education}
            />

            {fields.map(
              (field, index) =>
                field.sectionType === SectionType.Custom && (
                  <EditableSection key={index} index={index} />
                ),
            )}

            <Typography variant="h4">個人簡介</Typography>
            <div className="mb-8 mt-4 space-y-4">
              <Textarea />
            </div>
          </div>
        </div>
        <div className="sticky top-0 h-screen w-1/2 overflow-auto bg-slate-200">
          <div className="m-8 overflow-hidden rounded-lg">
            <ResumePreviewer />
          </div>
        </div>
      </form>
    </FormProvider>
  )
}
