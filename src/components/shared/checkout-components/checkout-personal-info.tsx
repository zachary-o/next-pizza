import React from "react"
import { FormInput } from "../form-components"
import { WhiteBlock } from "../white-block"
import { cn } from "@/lib/utils"

interface Props {
  loading?: boolean
  className?: string
}

export const CheckoutPersonalInfo: React.FC<Props> = ({
  loading,
  className,
}) => {
  return (
    <WhiteBlock title="2. Personal Info">
      <div
        className={cn(
          "grid grid-cols-2 gap-5",
          {
            "opacity-40 pointer-events-none": loading,
          },
          className
        )}
      >
        <FormInput
          className="text-base"
          name="firstName"
          placeholder="First Name"
        />
        <FormInput
          className="text-base"
          name="lastName"
          placeholder="Last Name"
        />
        <FormInput className="text-base" name="email" placeholder="Email" />
        <FormInput className="text-base" name="phone" placeholder="Phone" />
      </div>
    </WhiteBlock>
  )
}
