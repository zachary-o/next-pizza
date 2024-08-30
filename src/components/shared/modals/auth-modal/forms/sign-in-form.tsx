import React from "react"
import { FormProvider, useForm } from "react-hook-form"
import { formSignInSchema, TFormSignInValues } from "./schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { Title } from "@/components/shared/title"
import { FormInput } from "@/components/shared/form-components"
import { Button } from "@/components/ui"
import toast from "react-hot-toast"
import { signIn } from "next-auth/react"

interface Props {
  onClose?: VoidFunction
}

export const SignInForm: React.FC<Props> = ({ onClose }) => {
  const form = useForm<TFormSignInValues>({
    resolver: zodResolver(formSignInSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const onSubmit = async (data: TFormSignInValues) => {
    try {
      const resp = await signIn("credentials", {
        ...data,
        redirect: false
      })

      if (!resp?.ok) {
        throw Error
      }

      toast.success("Successfully signed in", {icon: "✅"})
      onClose?.()
    } catch (error) {
      console.error("[SIGN IN] Error: ", error)
      toast.error("Failed to sign in", { icon: "❌" })
    }
  }

  return <FormProvider {...form}>
    <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="flex justify-between items-center">
        <div className="mr-2">
          <Title className="font-bold" text="Account Sign in" size="md" />
          <p className="text-gray-400">Enter your email to sign in</p>
        </div>
        <img width={60} height={60} src="/assets/images/phone-icon.png" alt="phone-icon" />
      </div>

      <FormInput name="email" label="Email" required />
      <FormInput name="password" label="Password" type="password" required />

      <Button className="h-12 text-base" type="submit" loading={form.formState.isSubmitting}>
        Sign in
      </Button>
    </form>
  </FormProvider>
}
