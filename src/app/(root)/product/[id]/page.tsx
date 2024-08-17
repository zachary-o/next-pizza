import { Container, ProductForm } from "@/components/shared";
import { notFound } from "next/navigation";
import React from "react";
import { prisma } from "../../../../../prisma/prisma-client";

interface Props {
  params: { id: string };
}

const ProductPage: React.FC<Props> = async ({ params: { id } }) => {

  const product = await prisma.product.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      ingredients: true,
      category: {
        include: {
          products: {
            include: {
              productOptions: true,
            },
          },
        },
      },
      productOptions: true,
    },
  });

  if (!product) {
    return notFound();
  }

  return (
    <Container className="flex flex-col my-10">
      <ProductForm product={product}/>
    </Container>
  );
};

export default ProductPage;
