import React from "react"
import { useForm } from "react-hook-form"
import { TFormSignInValues } from "./schemas"

interface Props {
  onClose?: VoidFunction
}

export const SigninForm: React.FC<Props> = ({ onClose }) => {
  const form = useForm<TFormSignInValues>({
    defaultValues: {
        email: "",
        password: ""
    }
  })

  return <form></form>
}
