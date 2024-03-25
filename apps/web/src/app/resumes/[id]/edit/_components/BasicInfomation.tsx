import { FC } from "react"
import { Controller, useFormContext } from "react-hook-form"

import { Typography } from "@/components/ui/typography"

import { LabeledInputField } from "./LabeledInputField"
import { UploadImage } from "./UploadImage"

const BasicInformation: FC = () => {
  const { control } = useFormContext()

  return (
    <>
      <Typography variant="h4">基本訊息</Typography>
      <div className="mb-8 mt-4 grid grid-cols-2 gap-4">
        <Controller
          name="wantedJob"
          control={control}
          render={({ field }) => (
            <LabeledInputField
              label="職位名稱"
              placeholder="e.g. Senior Frontend Engineer"
              {...field}
            />
          )}
        />
        <Controller
          name="avatar"
          control={control}
          render={({ field }) => (
            <UploadImage onChange={field.onChange} value={field.value} />
          )}
        />

        <Controller
          name="username"
          control={control}
          render={({ field }) => <LabeledInputField label="姓名" {...field} />}
        />
        <Controller
          name="email"
          control={control}
          render={({ field }) => <LabeledInputField label="Email" {...field} />}
        />
        <Controller
          name="phone"
          control={control}
          render={({ field }) => <LabeledInputField label="手機" {...field} />}
        />
        <Controller
          name="city"
          control={control}
          render={({ field }) => <LabeledInputField label="城市" {...field} />}
        />
      </div>
    </>
  )
}

export { BasicInformation }
