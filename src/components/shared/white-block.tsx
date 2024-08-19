import { cn } from "@/lib/utils"
import React, { PropsWithChildren, ReactNode } from "react"
import { Title } from "./title"

interface Props {
  endAdornment?: ReactNode
  title?: string
  contentClassName?: string
  className?: string
}

export const WhiteBlock: React.FC<PropsWithChildren<Props>> = ({
  endAdornment,
  title,
  contentClassName,
  children,
  className,
}) => {
  return (
    <div className={cn("bg-white rounded-3xl", className)}>
      {title && (
        <div className="flex items-center justify-between p-5 px-7 border-b border-gray-100">
          <Title className="font-bold" size="sm" text={title} />
          {endAdornment}
        </div>
      )}
      <div className={cn("px-5 py-4", contentClassName)}>{children}</div>
    </div>
  )
}
