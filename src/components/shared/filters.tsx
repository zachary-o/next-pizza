"use client";

import React from "react";
import { Title } from "./title";
import { FilterCheckbox } from "./filter-checkbox";
import { Input, RangeSlider } from "../ui";
import { CheckboxFiltersGroup } from "./checkbox-filters-group";

interface Props {
  className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
  return (
    <div className={className}>
      <Title text="Filters" size="sm" className="mb-5 font-bold" />

      <div className="flex flex-col gap-4">
        <FilterCheckbox text="Can be combined" value="1" />
        <FilterCheckbox text="New" value="2" />
      </div>

      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Price from - to:</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={100}
            defaultValue={0}
          />
          <Input type="number" min={10} max={100} placeholder="100" />
        </div>

        <RangeSlider min={0} max={100} step={5} value={[0, 100]} />
      </div>
      <CheckboxFiltersGroup
        className="mt-5"
        title="Ingridients"
        limit={6}
        defaultItems={[
          {
            text: "Red onions",
            value: "1",
          },
          {
            text: "Cheese sauce",
            value: "2",
          },
          {
            text: "Garlic",
            value: "3",
          },
          {
            text: "Mozzarella",
            value: "4",
          },
          {
            text: "Gherkins",
            value: "5",
          },
          {
            text: "Tomatos",
            value: "6",
          },
        ]}
        items={[
          {
            text: "Red onions",
            value: "1",
          },
          {
            text: "Cheese sauce",
            value: "2",
          },
          {
            text: "Garlic",
            value: "3",
          },
          {
            text: "Mozzarella",
            value: "4",
          },
          {
            text: "Gherkins",
            value: "5",
          },
          {
            text: "Tomatos",
            value: "6",
          },
        ]}
      />
    </div>
  );
};
