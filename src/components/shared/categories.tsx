"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { useCategoryStore } from "../../../store/category";

interface Props {
  className?: string;
}

const categories = [
  { id: 1, name: "Pizzas" },
  { id: 2, name: "Combo" },
  { id: 3, name: "Snacks" },
  { id: 4, name: "Cocktails" },
  { id: 5, name: "Coffee" },
  { id: 6, name: "Beverages" },
  { id: 7, name: "Desserts" },
];

export const Categories: React.FC<Props> = ({ className }) => {
  const categoryActiveId = useCategoryStore((state) => state.activeId);
  console.log("categoryActiveId", categoryActiveId);

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
