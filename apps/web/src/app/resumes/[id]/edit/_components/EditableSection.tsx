import { FC } from "react"
import {
  Controller,
  useFieldArray,
  useFormContext,
  useWatch,
} from "react-hook-form"
import { Plus } from "lucide-react"

import { Button } from "../../../../../components/ui/button"
import { Typography } from "../../../../../components/ui/typography"
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
    return null
  }

  if (isSimpleResumeSection(field)) {
    return field.field
  }

  if (field.field1.length === 0 && field.field2.length === 0) {
    return null
  }

  return `${field.field1} - ${field.field2}`
}

const formatSubtitle = (
  field: SimpleResumeSection | ComplexResumeSection | undefined,
) => {
  if (!field) {
    return null
  }

  if (isSimpleResumeSection(field)) {
    return ""
  }

  if (field.field3.length === 0 && !field.timeline) {
    return null
  }

  return `${field.field3} - ${field.timeline?.from ?? ''} - ${field.timeline?.to ?? "至今"}`
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
            <div className="mt-4 grid grid-cols-2 gap-4">
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
        <Plus className="mr-2 size-4" />
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
      <div className="mb-8 mt-4 space-y-4">
        <EmploymentHistoryCollapses resumeSectionsIndex={resumeSectionIndex} />
      </div>
    </>
  )
}

export { EditableSection }
