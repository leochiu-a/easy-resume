import { FC, PropsWithChildren } from "react"
import { ChevronDown, Trash2 } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Tooltip } from "@/components/ui/tooltip"
import { Typography } from "@/components/ui/typography"

interface EditableCollapseProps {
  title: string
  subtitle: string
  onRemove: () => void
}

const EditableCollapse: FC<PropsWithChildren<EditableCollapseProps>> = ({
  title,
  subtitle,
  onRemove,
  children,
}) => {
  return (
    <Collapsible className="border rounded-md min-h-[6rem] px-5 py-4 hover:border-primary cursor-pointer group">
      <CollapsibleTrigger asChild>
        <div className="flex justify-between items-center w-full h-[4rem]">
          <div>
            {!title && !subtitle ? (
              <Typography variant="p" className="font-semibold">
                (未命名)
              </Typography>
            ) : (
              <>
                <Typography variant="p" className="font-semibold">
                  {title}
                </Typography>
                <Typography variant="p" affects="removePMargin" className="">
                  {subtitle}
                </Typography>
              </>
            )}
          </div>

          <ChevronDown />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>{children}</CollapsibleContent>

      <Tooltip title="刪除">
        <button
          className="absolute top-8 -right-8 font-medium opacity-0 group-hover:opacity-100 transition duration-100"
          onClick={onRemove}
        >
          <Trash2 size={20} />
        </button>
      </Tooltip>
    </Collapsible>
  )
}

export { EditableCollapse }
