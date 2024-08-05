"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Product } from "@prisma/client";
import React from "react";
import { ChoosePizzaForm } from "../choose-pizza-form";
import { useRouter } from "next/navigation";

interface Props {
  product: Product;
  className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();

  

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          "p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden",
          className
        )}
      >
        <ChoosePizzaForm
          imageUrl={product.imageUrl}
          name={product.name}
          ingredients={[]}
          handleAddOnClick={() => {}}
        />
      </DialogContent>
    </Dialog>
  );
};
