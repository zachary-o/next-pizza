import { cn } from "@/lib/utils"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import React from "react"
import { Button } from "../ui"
import { Title } from "./title"

interface Props {
  title: string
  text: string
  imageUrl?: string
  className?: string
}

export const InfoBlock: React.FC<Props> = ({
  title,
  text,
  imageUrl,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center w-[840px] gap-12",
        className
      )}
    >
      <div className="flex flex-col">
        <div className="w-[445px]">
          <Title className="font-extrabold" size="lg" text={title} />
          <p className="text-gray-400 text-lg">{text}</p>
        </div>

        <div className="flex gap-5 mt-11">
          <Link href="/">
            <Button className="gap-2" variant="outline">
              <ArrowLeft />
              Go to main
            </Button>
          </Link>
          <Button
            className="text-gray-500 border-gray-400 hover:bg-gray-50"
            variant="outline"
          >
            Refresh
          </Button>
        </div>
      </div>
      <img src={imageUrl} alt={title} width={300} />
    </div>
  )
}
