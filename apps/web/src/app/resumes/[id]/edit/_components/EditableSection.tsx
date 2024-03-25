"use client"

import { FC } from "react"
import {
  Controller,
  useFieldArray,
  useFormContext,
  useWatch,
} from "react-hook-form"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import dayjs from "dayjs"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Typography } from "@/components/ui/typography"
import { Field, GroupLayout, GroupType, Resume } from "@/types/api/resumes"

import { EditableCollapse } from "./EditableCollapse"
import { LabeledDatePickerField } from "./LabeledDatePickerField"
import { LabeledInputField } from "./LabeledInputField"

const { Simple } = GroupLayout

const formatTitle = (field: Field | undefined, type: GroupLayout) => {
  if (!field) {
    return null
  }

  if (type === Simple) {
    return field.field1
  }

  if (field.field1.length === 0 && field.field2.length === 0) {
    return null
  }

  return `${field.field1} - ${field.field2}`
}

const formatSubtitle = (field: Field | undefined, type: GroupLayout) => {
  if (!field) {
    return null
  }

  if (type === Simple) {
    return ""
  }

  if (field.field3.length === 0 && !field.timeline) {
    return null
  }

  const from = field.timeline?.from
  const to = field.timeline?.to
  return `${field.field3} - ${from ? dayjs(from).format("YYYY/MM/DD") : ""} - ${to ? dayjs(to).format("YYYY/MM/DD") : "至今"}`
}

interface FormFieldsGroupProps {
  groupIndex: number
}

const FormFieldsGroup: FC<FormFieldsGroupProps> = ({ groupIndex }) => {
  const { control } = useFormContext<Resume>()
  const { fields, remove, append } = useFieldArray({
    control,
    name: `groups.${groupIndex}.fields`,
  })
  const groupLayout = useWatch({
    control,
    name: `groups.${groupIndex}.layout`,
  })
  const resumeFields = useWatch({
    control,
    name: `groups.${groupIndex}.fields`,
  })

  return (
    <>
      <div className="space-y-4">
        {fields.map((field, index) => (
          <EditableCollapse
            key={field.id}
            title={formatTitle(resumeFields[index], groupLayout)}
            subtitle={formatSubtitle(resumeFields[index], groupLayout)}
            onRemove={() => remove(index)}
          >
            <div className="mt-4 grid grid-cols-2 gap-4">
              {groupLayout === Simple ? (
                <Controller
                  control={control}
                  name={`groups.${groupIndex}.fields.${index}.field1`}
                  render={({ field }) => (
                    <LabeledInputField label="職位" {...field} />
                  )}
                />
              ) : (
                <>
                  <Controller
                    control={control}
                    name={`groups.${groupIndex}.fields.${index}.field1`}
                    render={({ field }) => (
                      <LabeledInputField label="職位" {...field} />
                    )}
                  />
                  <Controller
                    control={control}
                    name={`groups.${groupIndex}.fields.${index}.field2`}
                    render={({ field }) => (
                      <LabeledInputField label="公司" {...field} />
                    )}
                  />
                  <Controller
                    control={control}
                    name={`groups.${groupIndex}.fields.${index}.field3`}
                    render={({ field }) => (
                      <LabeledInputField label="城市" {...field} />
                    )}
                  />
                </>
              )}

              <Controller
                control={control}
                name={`groups.${groupIndex}.fields.${index}.timeline`}
                render={({ field }) => (
                  <LabeledDatePickerField
                    label="開始&結束時間"
                    switchText="在職"
                    onChange={field.onChange}
                    value={field.value}
                  />
                )}
              />
            </div>

            <div className="mt-4">
              <Controller
                control={control}
                name={`groups.${groupIndex}.fields.${index}.description`}
                render={({ field }) => (
                  <div className="space-y-2">
                    <div>描述</div>
                    <Textarea {...field} />
                  </div>
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
            timeline: { from: null, to: null },
            description: "",
          })
        }
      >
        <FontAwesomeIcon icon={faPlus} className="mr-2 size-4" />
        新增內容
      </Button>
    </>
  )
}

interface EditableSectionProps {
  description?: string
  groupType?: GroupType
  index?: number
}

const EditableSection: FC<EditableSectionProps> = ({
  description,
  groupType,
  index,
}) => {
  const { control } = useFormContext<Resume>()
  const { fields } = useFieldArray({ control, name: "groups" })

  const groupIndex = index
    ? index
    : fields.findIndex((field) => field.type === groupType)

  const title = useWatch({
    control,
    name: `groups.${groupIndex}.title`,
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
        <FormFieldsGroup groupIndex={groupIndex} />
      </div>
    </>
  )
}

export { EditableSection }
