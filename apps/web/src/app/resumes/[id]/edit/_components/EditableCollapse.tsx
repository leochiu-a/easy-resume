import { FC, PropsWithChildren } from "react"
import { faChevronDown, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Tooltip } from "@/components/ui/tooltip"
import { Typography } from "@/components/ui/typography"

interface EditableCollapseProps {
  title: string | null
  subtitle: string | null
  onRemove: () => void
}

const EditableCollapse: FC<PropsWithChildren<EditableCollapseProps>> = ({
  title,
  subtitle,
  onRemove,
  children,
}) => {
  return (
    <Collapsible className="hover:border-primary group min-h-[6rem] cursor-pointer rounded-md border px-5 py-4">
      <CollapsibleTrigger asChild>
        <div className="flex h-[4rem] w-full items-center justify-between">
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
                <Typography variant="p" affects="removePMargin">
                  {subtitle}
                </Typography>
              </>
            )}
          </div>

          <FontAwesomeIcon icon={faChevronDown} />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>{children}</CollapsibleContent>

      <Tooltip title="刪除">
        <button
          className="absolute -right-8 top-8 font-medium opacity-0 transition duration-100 group-hover:opacity-100"
          onClick={onRemove}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </Tooltip>
    </Collapsible>
  )
}

export { EditableCollapse }
