import React from "react";
import { prisma } from "../../../../../../prisma/prisma-client";
import { notFound } from "next/navigation";
import { ChooseProductModal, Container, ProductImage, Title } from "@/components/shared";
import { GroupVariants } from "@/components/shared/group-variants";

interface Props {
  params: { id: string };
}

const ProductModalPage: React.FC<Props> = async ({ params: { id } }) => {
  const product = await prisma.product.findFirst({
    where: {
      id: Number(id)
    },
    include: {
      ingredients: true,
      productOptions: true
    }
   });

  if (!product) {
    return notFound();
  }

  return (
    <ChooseProductModal product={product} />
  );
};

export default ProductModalPage;
