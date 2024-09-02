import { registerUser } from "@/app/actions";
import { FormInput } from "@/components/shared/form-components";
import { Button } from "@/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { formSignUpSchema, TFormSignUpValues } from "./schemas";

interface Props {
  onClose?: VoidFunction;
}

export const SignUpForm: React.FC<Props> = ({ onClose }) => {
  const form = useForm<TFormSignUpValues>({
    resolver: zodResolver(formSignUpSchema),
    defaultValues: {
      email: "",
      fullName: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: TFormSignUpValues) => {
    try {
      await registerUser({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
      });

      toast.error("You successfully signed up 📝. Please confirm your email", {
        icon: "✅",
      });

      onClose?.();
    } catch (error) {
      return toast.error("Incorrect email or passwod", {
        icon: "❌",
      });
    }
  };

  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormInput name="email" label="Email" required />
        <FormInput name="fullName" label="Full Name" required />
        <FormInput name="password" label="Password" type="password" required />
        <FormInput
          name="confirmPassword"
          label="Confirm password"
          type="password"
          required
        />

        <Button
          className="h-12 text-base"
          type="submit"
          loading={form.formState.isSubmitting}
        >
          Sign up
        </Button>
      </form>
    </FormProvider>
  );
};
