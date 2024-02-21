import { FieldValues, useFormContext, useWatch } from "react-hook-form"

/**
 * 取得 react hook form 的表單值
 */
const useFormValues = <T extends FieldValues>() => {
  const { getValues } = useFormContext<T>()

  return {
    ...useWatch<T>(), // subscribe to form value updates
    ...getValues(), // always merge with latest form values
  }
}

export { useFormValues }
