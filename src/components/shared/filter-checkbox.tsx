import React from "react";
import { Checkbox } from "../ui";

export interface FilterCheckboxProps {
  text: string;
  value: string;
  endAdornment?: React.ReactNode;
  onCheckedChange?: (checked: boolean) => void;
  checked?: boolean;
  name?: string;
}

export const FilterCheckbox: React.FC<FilterCheckboxProps> = ({
  text,
  value,
  endAdornment,
  onCheckedChange,
  checked,
  name,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        className="rounded-[8px] w-6 h-6"
        onCheckedChange={onCheckedChange}
        checked={checked}
        value={value}
        id={`checkbox-${String(name)}-${String(value)}`}
      />
      <label
        className="leading-none cursor-pointer flex-1"
        htmlFor={`checkbox-${String(name)}-${String(value)}`}
      >
        {text}
      </label>
      {endAdornment}
    </div>
  );
};
