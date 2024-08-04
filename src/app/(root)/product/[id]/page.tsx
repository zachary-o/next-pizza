import React from "react";
import { prisma } from "../../../../../prisma/prisma-client";
import { notFound } from "next/navigation";
import { Container, ProductImage, Title } from "@/components/shared";
import { GroupVariants } from "@/components/shared/group-variants";

interface Props {
  params: { id: string };
}

const ProductPage: React.FC<Props> = async ({ params: { id } }) => {
  const product = await prisma.product.findFirst({ where: { id: Number(id) } });

  if (!product) {
    return notFound();
  }

  return (
    <Container className="flex flex-col my-10">
      <div className="flex flex-1">
        <ProductImage className="" imageUrl={product.imageUrl} size={20} />

        <div className="w-[490px] bg-[#f7f6f5] p-7">
          <Title
            className="font-extrabold mb-1"
            text={product.name}
            size="md"
          />
          <p className="text-gray-400">Bzzzz</p>

          <GroupVariants
            selectedValue="2"
            items={[
              { name: "Small", value: "1" },
              { name: "Medium", value: "2" },
              { name: "Large", value: "3" },
            ]}
          />
        </div>
      </div>
    </Container>
  );
};

export default ProductPage;
