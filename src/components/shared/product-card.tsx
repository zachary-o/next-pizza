import Link from "next/link"
import React from "react"
import { Title } from "./title"
import { Button } from "../ui"
import { Plus } from "lucide-react"

interface Props {
  id: number
  name: string
  price: number
  imageUrl: string
  className?: string
}

export const ProductCard: React.FC<Props> = ({
  id,
  name,
  price,
  imageUrl,
  className,
}) => {
  return (
    <div className={className}>
      <Link href={`/product/${id}`}>
        <div className="flex justify-center p-6 bg-secondary rounded-lg h-[260px]">
          <img className="w-[215px] h-[215px]" src={imageUrl} alt={name} />
        </div>

        <Title className="mb-1 mt-3 font-bold" text={name} size="sm" />
        <p className="text-sm text-gray-400">
          Chicken, mozzarella, cheddar, parmesan, cheese sauce, tomatos, alfredo
          sauce, garlic
        </p>

        <div className="flex justify-between items-center mt-4">
          <span className="text-[20px]">
            from <b>${price}</b>
          </span>

          <Button className="text-base font-bold" variant="secondary">
            <Plus className="mt-1" size={20} />
            Add
          </Button>
        </div>
      </Link>
    </div>
  )
}
