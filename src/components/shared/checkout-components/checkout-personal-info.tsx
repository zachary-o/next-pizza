import React from "react"
import { FormInput } from "../form-components"
import { WhiteBlock } from "../white-block"

interface Props {
  className?: string
}

export const CheckoutPersonalInfo: React.FC<Props> = ({ className }) => {
  return (
    <WhiteBlock title="2. Personal Info">
      <div className="grid grid-cols-2 gap-5">
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
        <FormInput className="text-base" name="email" placeholder="E-mail" />
        <FormInput className="text-base" name="phone" placeholder="Phone" />
      </div>
    </WhiteBlock>
  )
}
