"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { User } from "@prisma/client"
import { signOut } from "next-auth/react"
import React from "react"
import { FormProvider, useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { Button } from "../ui"
import { FormInput } from "./form-components"
import {
    formSignUpSchema,
    TFormSignUpValues,
} from "./modals/auth-modal/forms/schemas"
import { Title } from "./title"

interface Props {
  data: User
}

export const ProfileForm: React.FC<Props> = ({ data }) => {
  const form = useForm({
    resolver: zodResolver(formSignUpSchema),
    defaultValues: {
      fullName: data.fullName,
      email: data.email,
      password: "",
      comfirmPassword: "",
    },
  })

  const onSubmit = async (data: TFormSignUpValues) => {
    try {
      await updateUserInfo({
        email: data.email,
        fullname: data.fullName,
        password: data.password,
      })

      toast.success("Info has been updates", { icon: "✅" })
    } catch (error) {
      return toast.error("Failed to updated the info", { icon: "❌" })
    }
  }

  const onClickSignOut = () => {
    signOut({
      callbackUrl: "/",
    })
  }
  return (
    <div className="mx-10">
      <Title className="font-bold mt-10" size="md" text="Personal info" />
      <FormProvider {...form}>
        <form
          className="flex flex-col gap-5 w-96 mt-10"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormInput name="email" label="Email" required />
          <FormInput name="fullName" label="Full name" required />
          <FormInput
            name="password"
            label="New password"
            type="password"
            required
          />
          <FormInput
            name="confirmPassword"
            label="Confirm password"
            type="password"
            required
          />

          <Button
            className="text-base mt-10"
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            Save
          </Button>
          <Button
            className="text-base"
            variant="secondary"
            type="button"
            disabled={form.formState.isSubmitting}
            onClick={onClickSignOut}
          >
            Sign out
          </Button>
        </form>
      </FormProvider>
    </div>
  )
}
