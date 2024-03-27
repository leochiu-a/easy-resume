"use client"

import { useFieldArray, useFormContext, useWatch } from "react-hook-form"
import { faPencil } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { Textarea } from "@/components/ui/textarea"
import { Typography } from "@/components/ui/typography"
import { GroupType, Resume } from "@/types/api/resumes"

import { BasicInformation } from "./BasicInfomation"
import { EditableSection } from "./EditableSection"
import ResumePreviewer from "./ResumePreviewer"
import SocialLinksSection from "./SocialLinksSection"

const ResumeForm = () => {
  const { control, register } = useFormContext<Resume>()
  const resumeTitle = useWatch({ control, name: "resumeTitle" })
  const { fields } = useFieldArray({ control, name: "groups" })

  return (
    <div className="flex">
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

          <Typography variant="h4">個人簡介</Typography>
          <div className="mb-8 mt-4 space-y-4">
            <Textarea {...register("intro")} rows={5} />
          </div>

          <SocialLinksSection />

          {/* 工作經歷 */}
          <EditableSection
            description="展示你的相關經驗（過去十年）。如果可能的話，使用條目列出你的成就 -
      使用數字/事實（例如：通過執行 Z 達到了 X，由 Y 測量）。"
            groupType={GroupType.EmploymentHistory}
          />
          {/* 專業技能 */}
          <EditableSection
            description="選擇五個重要的技能，展示你符合該職位。確保它們與職位描述中提到的關鍵技能相匹配"
            groupType={GroupType.Skills}
          />
          {/* 教育經歷 */}
          <EditableSection
            description="在履歷中展示多元化的教育背景，概括了您的學習和背景將為工作帶來的價值。"
            groupType={GroupType.Education}
          />

          {fields.map(
            (field, index) =>
              field.type === GroupType.Custom && (
                <EditableSection key={index} index={index} />
              ),
          )}
        </div>
      </div>
      <div className="sticky top-0 h-screen w-1/2 overflow-auto bg-slate-200">
        <div className="m-8 overflow-hidden rounded-lg">
          <ResumePreviewer />
        </div>
      </div>
    </div>
  )
}

export { ResumeForm }
