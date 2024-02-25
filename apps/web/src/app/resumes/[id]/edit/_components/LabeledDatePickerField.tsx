import { forwardRef, useCallback, useState } from "react"

import { MonthPicker } from "../../../../../components/ui/MonthPicker"
import { Switch } from "../../../../../components/ui/switch"

interface LabeledDatePickerFieldProps {
  label: string
  switchText: string
  value: {
    from: string | null
    to: string | null
  } | null
  onChange: (value: { from: string | null; to: string | null }) => void
}

const LabeledDatePickerField = forwardRef<
  HTMLElement,
  LabeledDatePickerFieldProps
>(({ label, switchText, onChange, value }) => {
  const [checked, setChecked] = useState(false)

  const handleCheckedChange = useCallback(
    (checked: boolean) => {
      if (checked) {
        onChange?.({ from: value?.from ?? null, to: null })
      }
      setChecked(checked)
    },
    [onChange, value?.from],
  )

  const handleChangeFromMonth = useCallback(
    (date: Date) => {
      onChange?.({ from: date.toISOString(), to: value?.to ?? null })
    },
    [onChange, value?.to],
  )

  const handleChangeToMonth = useCallback(
    (date: Date) => {
      onChange?.({ from: value?.from ?? null, to: date.toISOString() })
    },
    [onChange, value?.from],
  )

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <div>{label}</div>
        <div className="flex gap-1">
          <Switch checked={checked} onCheckedChange={handleCheckedChange} />
          {switchText}
        </div>
      </div>

      <div className="flex gap-2">
        <MonthPicker
          onMonthChange={handleChangeFromMonth}
          placeholder="開始月份"
          value={value?.from}
        />
        {!checked && (
          <MonthPicker
            onMonthChange={handleChangeToMonth}
            placeholder="結束月份"
            value={value?.to}
          />
        )}
      </div>
    </div>
  )
})
LabeledDatePickerField.displayName = "LabeledDatePickerField"

export { LabeledDatePickerField }
