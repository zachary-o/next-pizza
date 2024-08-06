"use client";

import { cn } from "@/lib/utils";
import { Category } from "@prisma/client";
import React from "react";
import { useCategoryStore } from "../../store/category";

interface Props {
  categories: Category[]
  className?: string;
}

export const Categories: React.FC<Props> = ({ categories, className }) => {
  const categoryActiveId = useCategoryStore((state) => state.activeId);

  return (
    <div
      className={cn("inline-flex gap-1 bg-gray-50 p-1 rounded-2xl", className)}
    >
      {categories.map((category) => (
        <a
          className={cn(
            "flex items-center font-bold h-11 rounded-2xl px-5",
            categoryActiveId === category.id &&
              "bg-white shadow-md shadow-gray-200 text-primary"
          )}
          key={category.id}
          href={`/#${category.name}`}
        >
          <button>{category.name}</button>
        </a>
      ))}
    </div>
  );
};
