"use client"

import React, { useEffect, useState } from "react"
import { useSet } from "react-use"
import { Input, RangeSlider } from "../ui"
import { CheckboxFiltersGroup } from "./checkbox-filters-group"
import { Title } from "./title"
import qs from "qs"
import { useRouter, useSearchParams } from "next/navigation"
import { useFilters, useIngredients, useQueryFilters } from "@/hooks"



interface Props {
  className?: string
}



export const Filters: React.FC<Props> = ({ className }) => {
  const {ingredients, loading} = useIngredients()
  const filters = useFilters()
  useQueryFilters(filters)

  

  const items = ingredients.map((ingredient) => ({
    text: ingredient.name,
    value: String(ingredient.id),
  }))

  const onPriceRange = (prices: number[]) => {
    filters.handleUpdatePriceRange("priceFrom", prices[0])
    filters.handleUpdatePriceRange("priceTo", prices[1])
  }


  return (
    <div className={className}>
      <Title text="Filters" size="sm" className="mb-5 font-bold" />

      <CheckboxFiltersGroup
        className="mb-5"
        name="pizzaTypes"
        title="Dough types"
        onClickCheckbox={filters.togglePizzaTypes}
        items={[
          { text: "Thin", value: "1" },
          { text: "Traditional", value: "2" },
        ]}
        selectedValues={filters.pizzaTypes}
      />

      <CheckboxFiltersGroup
        className="mb-5"
        name="sizes"
        title="Sizes"
        onClickCheckbox={filters.togglePizzaSizes}
        items={[
          { text: "20 cm", value: "20" },
          { text: "30 cm", value: "30" },
          { text: "40 cm", value: "40" },
        ]}
        selectedValues={filters.sizes}
      />

      <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
        <p className="font-bold mb-3">Price from - to:</p>
        <div className="flex gap-3 mb-5">
          <Input
            type="number"
            placeholder="0"
            min={0}
            max={100}
            value={String(filters.priceRange.priceFrom)}
            onChange={(event) =>
              filters.handleUpdatePriceRange("priceFrom", Number(event.target.value))
            }
          />
          <Input
            type="number"
            min={10}
            max={100}
            placeholder="100"
            value={String(filters.priceRange.priceTo)}
            onChange={(event) =>
              filters.handleUpdatePriceRange("priceTo", Number(event.target.value))
            }
          />
        </div>

        <RangeSlider
          min={0}
          max={100}
          step={5}
          value={[filters.priceRange.priceFrom || 0, filters.priceRange.priceTo || 100]}
          onValueChange={onPriceRange}
        />
      </div>
      <CheckboxFiltersGroup
        className="mt-5"
        title="Ingridients"
        limit={6}
        loading={loading}
        defaultItems={items.slice(0, 6)}
        items={items}
        onClickCheckbox={filters.toggleIngredients}
        selectedValues={filters.selectedIngredients}
        name="ingredients"
      />
    </div>
  )
}
