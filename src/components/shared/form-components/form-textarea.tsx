"use client";

import React from "react";
import { RequiredSymbol } from "../required-symbol";
import { Textarea } from "@/components/ui";
import { ClearButton } from "../clear-button";
import { ErrorText } from "../error-text";
import { useFormContext } from "react-hook-form";

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
}

export const FormTextarea: React.FC<Props> = ({
  name,
  label,
  required,
  className,
  ...props
}) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const value = watch(name);
  const errorText = errors?.[name]?.message as string;

  const onClickClearInput = () => {
    setValue(name, "", { shouldValidate: true });
  };

  return (
    <div className={className}>
      <p className="font-medium mb-2">
        {label} {required && <RequiredSymbol />}
      </p>
      <div className="relative">
        <Textarea className="h-12 text-md" {...props} {...register(name)} />
        {value && <ClearButton onClick={onClickClearInput} />}
      </div>
      {errorText && <ErrorText text={errorText} />}
    </div>
  );
};
