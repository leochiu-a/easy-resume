import { FC } from "react"
import {
  Controller,
  useFieldArray,
  useFormContext,
  useWatch,
} from "react-hook-form"
import { Plus } from "lucide-react"

import { Button } from "../../../../../components/ui/button"
import { Input } from "../../../../../components/ui/input"
import { Typography } from "../../../../../components/ui/typography"
import { Resume } from "../page"

import { EditableCollapse } from "./EditableCollapse"

const SocialLinksSection: FC = () => {
  const { control } = useFormContext<Resume>()
  const { fields, append, remove } = useFieldArray({
    control,
    name: "socialLinks",
  })
  const socialLinks = useWatch({ control, name: "socialLinks" })

  return (
    <>
      <Typography variant="h4">Website & Social links</Typography>
      <Typography variant="p" affects="removePMargin">
        在以下區域填入任何連結或文字，請記得，對於工程師而言，一個出色的個人網站或
        Github 連結可以讓你的履歷更具吸引力。
      </Typography>
      <div className="space-y-4 mt-4 mb-8">
        {fields.map((field, index) => (
          <EditableCollapse
            key={field.id}
            title={socialLinks?.[index]?.label}
            subtitle={socialLinks?.[index]?.url}
            onRemove={() => remove(index)}
          >
            <div className="flex mt-4 gap-4">
              <Controller
                control={control}
                name={`socialLinks.${index}.label`}
                render={({ field }) => <Input placeholder="名稱" {...field} />}
              />
              <Controller
                control={control}
                name={`socialLinks.${index}.url`}
                render={({ field }) => <Input placeholder="連結" {...field} />}
              />
            </div>
          </EditableCollapse>
        ))}

        <Button variant="ghost" onClick={() => append({ label: "", url: "" })}>
          <Plus className="mr-2 h-4 w-4" />
          新增內容
        </Button>
      </div>
    </>
  )
}

export default SocialLinksSection
