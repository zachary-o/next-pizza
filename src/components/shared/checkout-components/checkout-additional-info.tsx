import { Textarea } from "@/components/ui"
import React from "react"
import { FormInput } from "../form-components"
import { WhiteBlock } from "../white-block"

interface Props {
  className?: string
}

export const CheckoutAdditionalInfo: React.FC<Props> = ({ className }) => {
  return (
    <WhiteBlock title="3. Delivery Address">
      <div className="flex flex-col gap-5">
        <FormInput className="text-base" name="address" placeholder="Address" />
        <Textarea
          className="text-base"
          rows={5}
          name="comment"
          placeholder="Additinal info"
        />
      </div>
    </WhiteBlock>
  )
}
