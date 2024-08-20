import React from "react"
import { FormInput, FormTextarea } from "../form-components"
import { WhiteBlock } from "../white-block"
import { cn } from "@/lib/utils"

interface Props {
  loading?: boolean
  className?: string
}

export const CheckoutAdditionalInfo: React.FC<Props> = ({
  loading,
  className,
}) => {
  return (
    <WhiteBlock title="3. Delivery Address">
      <div
        className={cn(
          "flex flex-col gap-5",
          {
            "opacity-40 pointer-events-none": loading,
          },
          className
        )}
      >
        <FormInput className="text-base" name="address" placeholder="Address" />
        <FormTextarea
          className="text-base"
          rows={5}
          name="comment"
          placeholder="Additinal info"
        />
      </div>
    </WhiteBlock>
  )
}
