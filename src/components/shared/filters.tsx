"use client";

import { useFilterIngredients } from "@/hooks/useFilterIngredients";
import React, { useState } from "react";
import { Input, RangeSlider } from "../ui";
import { CheckboxFiltersGroup } from "./checkbox-filters-group";
import { FilterCheckbox } from "./filter-checkbox";
import { Title } from "./title";

interface Props {
  className?: string;
}

interface PriceRange {
  priceFrom?: number;
  priceTo?: number;
}

export const Filters: React.FC<Props> = ({ className }) => {
  const { ingredients, loading, selectedIds, handleAddId } =
    useFilterIngredients();
  const [price, setPrice] = useState<PriceRange>({
    priceFrom: 0,
    priceTo: 100,
  });

  const items = ingredients.map((ingredient) => ({
    text: ingredient.name,
    value: String(ingredient.id),
  }));

  return (
    <div className={className}>
      <Title text="Filters" size="sm" className="mb-5 font-bold" />

      <div className="flex flex-col gap-4">
        <FilterCheckbox
          name="can_be_combined"
          text="Can be combined"
          value="1"
        />
        <FilterCheckbox name="new" text="New" value="2" />
      </div>

      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Price from - to:</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={100}
            value={String(price.priceFrom)}
          />
          <Input
            type="number"
            min={10}
            max={100}
            placeholder="100"
            value={String(price.priceTo)}
          />
        </div>

        <RangeSlider min={0} max={100} step={5} value={[0, 100]} />
      </div>
      <CheckboxFiltersGroup
        className="mt-5"
        title="Ingridients"
        limit={6}
        loading={loading}
        defaultItems={items.slice(0, 6)}
        items={items}
        onClickCheckbox={handleAddId}
        selectedIds={selectedIds}
        name="ingredients"
      />
    </div>
  );
};
