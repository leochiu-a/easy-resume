import { FC } from "react"
import {
  Controller,
  useFieldArray,
  useFormContext,
  useWatch,
} from "react-hook-form"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Typography } from "@/components/ui/typography"

import {
  ComplexResumeSection,
  Resume,
  SectionType,
  SimpleResumeSection,
} from "../page"

import { EditableCollapse } from "./EditableCollapse"
import { LabeledDatePickerField } from "./LabeledDatePickerField"
import { LabeledInputField } from "./LabeledInputField"

const isSimpleResumeSection = (
  field: SimpleResumeSection | ComplexResumeSection,
): field is SimpleResumeSection => {
  return "field" in field
}

const formatTitle = (
  field: SimpleResumeSection | ComplexResumeSection | undefined,
) => {
  if (!field) {
    return ""
  }

  if (isSimpleResumeSection(field)) {
    return field.field
  }

  return `${field.field1} - ${field.field2}`
}

const formatSubtitle = (
  field: SimpleResumeSection | ComplexResumeSection | undefined,
) => {
  if (!field) {
    return ""
  }

  if (isSimpleResumeSection(field)) {
    return ""
  }

  return `${field.field3} - ${field.timeline?.from} - ${field.timeline?.to ?? "至今"}`
}

const EmploymentHistoryCollapses: FC<{ resumeSectionsIndex: number }> = ({
  resumeSectionsIndex,
}) => {
  const { control } = useFormContext<Resume>()
  const { fields, remove, append } = useFieldArray({
    control,
    name: `resumeSections.${resumeSectionsIndex}.fields`,
  })
  const resumeFields = useWatch({
    control,
    name: `resumeSections.${resumeSectionsIndex}.fields`,
  })

  return (
    <>
      <div className="space-y-4">
        {fields.map((field, index) => (
          <EditableCollapse
            key={field.id}
            title={formatTitle(resumeFields[index])}
            subtitle={formatSubtitle(resumeFields[index])}
            onRemove={() => remove(index)}
          >
            <div className="grid grid-cols-2 mt-4 gap-4">
              <Controller
                control={control}
                name={`resumeSections.${resumeSectionsIndex}.fields.${index}.field1`}
                render={({ field }) => (
                  <LabeledInputField label="職位" {...field} />
                )}
              />
              <Controller
                control={control}
                name={`resumeSections.${resumeSectionsIndex}.fields.${index}.field2`}
                render={({ field }) => (
                  <LabeledInputField label="公司" {...field} />
                )}
              />
              <Controller
                control={control}
                name={`resumeSections.${resumeSectionsIndex}.fields.${index}.field3`}
                render={({ field }) => (
                  <LabeledInputField label="城市" {...field} />
                )}
              />
              <Controller
                control={control}
                name={`resumeSections.${resumeSectionsIndex}.fields.${index}.timeline`}
                render={({ field }) => {
                  console.log(field)
                  return (
                    <LabeledDatePickerField
                      label="開始&結束時間"
                      switchText="在職"
                      onChange={field.onChange}
                      value={field.value}
                    />
                  )
                }}
              />
            </div>

            <div className="mt-4">
              <Controller
                control={control}
                name={`resumeSections.${resumeSectionsIndex}.fields.${index}.description`}
                render={({ field }) => (
                  <LabeledInputField label="描述" {...field} />
                )}
              />
            </div>
          </EditableCollapse>
        ))}
      </div>
      <Button
        variant="ghost"
        onClick={() =>
          append({
            field1: "",
            field2: "",
            field3: "",
            timeline: null,
            description: "",
          })
        }
      >
        <Plus className="mr-2 h-4 w-4" />
        新增內容
      </Button>
    </>
  )
}

interface EditableSectionProps {
  description?: string
  sectionType?: SectionType
  index?: number
}

const EditableSection: FC<EditableSectionProps> = ({
  description,
  sectionType,
  index,
}) => {
  const { control } = useFormContext<Resume>()
  const { fields } = useFieldArray({ control, name: "resumeSections" })

  const resumeSectionIndex = index
    ? index
    : fields.findIndex((field) => field.sectionType === sectionType)

  const title = useWatch({
    control,
    name: `resumeSections.${resumeSectionIndex}.title`,
  })

  return (
    <>
      <Typography variant="h4">{title}</Typography>
      {description && (
        <Typography variant="p" affects="removePMargin">
          {description}
        </Typography>
      )}
      <div className="space-y-4 mt-4 mb-8">
        <EmploymentHistoryCollapses resumeSectionsIndex={resumeSectionIndex} />
      </div>
    </>
  )
}

export { EditableSection }
