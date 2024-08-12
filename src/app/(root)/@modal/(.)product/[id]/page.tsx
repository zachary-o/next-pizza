import { ChooseProductModal } from "@/components/shared";
import { prisma } from "../../../../../../prisma/prisma-client";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: { id: string };
}

const ProductModalPage: React.FC<Props> = async ({ params: { id } }) => {
  const product = await prisma.product.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      ingredients: true,
      productOptions: true,
    },
  });

  if (!product) {
    return notFound();
  }

  return <ChooseProductModal product={product} />;
};

export default ProductModalPage;
