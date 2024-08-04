"use client";

import { cn } from "@/lib/utils";
import React from "react";

type Variant = {
  name: string;
  value: string;
  disabled?: boolean;
};

interface Props {
  items: readonly Variant[];
  onClick?: (value: Variant["value"]) => void;
  selectedValue?: Variant["value"];
  className?: string;
}

export const GroupVariants: React.FC<Props> = ({
  items,
  onClick,
  selectedValue,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex justify-between bg-[#f3f3f7] rounded-3xl p-1 select-none",
        className
      )}
    >
      {items.map((item) => (
        <button
          className={cn(
            "flex items-center justify-center cursor-pointer h-[30px] px-5 flex-1 rounded-3xl transition-all duration-400 text-sm",
            {
              "bg-white shadow": item.value === selectedValue,
              "text-gray-500 opacity-50 pointer-events-none": item.disabled,
            }
          )}
          key={item.name}
          onClick={() => onClick?.(item.value)}
        >{item.name}</button>
      ))}
    </div>
  );
};
