import { hashSync } from "bcrypt";
import { _ingredients, categories, products } from "./constants";
import { prisma } from "./prisma-client";

const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

const generateProductItem = ({
  productId,
  pizzaType,
  size,
}: {
  productId: number;
  pizzaType?: 1 | 2;
  size?: 20 | 30 | 40;
}) => {
  return {
    productId,
    price: randomNumber(10, 40),
    pizzaType,
    size,
  };
};

// generate data
async function up() {
  await prisma.user.createMany({
    data: [
      {
        fullName: "User",
        email: "zalooааp_ka@test.com",
        password: hashSync("1212121212", 10),
        verified: new Date(),
        role: "USER",
      },
      {
        fullName: "User_Huyuser",
        email: "za_loop_ka@test.com",
        password: hashSync("12dd12121212", 10),
        verified: new Date(),
        role: "ADMIN",
      },
    ],
  });

  await prisma.category.createMany({
    data: categories,
  });

  await prisma.ingredient.createMany({
    data: _ingredients,
  });

  await prisma.product.createMany({
    data: products,
  });

  const pizza1 = await prisma.product.create({
    data: {
      name: "Pepperoni fresh",
      imageUrl:
        "https://media.dodostatic.net/image/r:233x233/11EE7D61304FAF5A98A6958F2BB2D260.webp",
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(0, 5),
      },
    },
  });
  const pizza2 = await prisma.product.create({
    data: {
      name: "Cheese",
      imageUrl:
        "https://media.dodostatic.net/image/r:233x233/11EE7D610CF7E265B7C72BE5AE757CA7.webp",
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(5, 10),
      },
    },
  });
  const pizza3 = await prisma.product.create({
    data: {
      name: "Corizo fresh",
      imageUrl:
        "https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp",
      categoryId: 1,
      ingredients: {
        connect: _ingredients.slice(10, 40),
      },
    },
  });

  await prisma.productOption.createMany({
    data: [
      // Pizza "Pepperoni fresh"
      generateProductItem({ productId: pizza1.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 40 }),

      // Pizza "Cheese"
      generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 30 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 40 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 20 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 40 }),

      // Pizza "Corizo fresh"
      generateProductItem({ productId: pizza3.id, pizzaType: 1, size: 20 }),
      generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 30 }),
      generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 40 }),

      // Other items
      generateProductItem({ productId: 1 }),
      generateProductItem({ productId: 2 }),
      generateProductItem({ productId: 3 }),
      generateProductItem({ productId: 4 }),
      generateProductItem({ productId: 5 }),
      generateProductItem({ productId: 6 }),
      generateProductItem({ productId: 7 }),
      generateProductItem({ productId: 8 }),
      generateProductItem({ productId: 9 }),
      generateProductItem({ productId: 10 }),
      generateProductItem({ productId: 11 }),
      generateProductItem({ productId: 12 }),
      generateProductItem({ productId: 13 }),
      generateProductItem({ productId: 14 }),
      generateProductItem({ productId: 15 }),
      generateProductItem({ productId: 16 }),
      generateProductItem({ productId: 17 }),
    ],
  });

  await prisma.cart.createMany({
    data: [
      {
        userId: 1,
        totalAmount: 0,
        token: "11111",
      },
      {
        userId: 2,
        totalAmount: 0,
        token: "11rrrr111",
      },
    ],
  });

  await prisma.cartItem.create({
    data: {
      productOptionId: 1,
      cartId: 1,
      quantity: 2,
      ingredients: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }],
      },
    },
  });

  await prisma.story.createMany({
    data: [
      {
        previewImageUrl:
          "https://i.ibb.co/gv9DMyk/8288c3920fe94fa82c1de10003e3cee743defc1aacb48effffea79f9dbc115ae.png",
      },
      {
        previewImageUrl:
          "https://i.ibb.co/6wpbG4F/72525e49add17f0e65271ddfc83114919580af69b1c46b4fcd7084879c37533a.png",
      },
      {
        previewImageUrl:
          "https://i.ibb.co/72QSX3d/819546d7cfd0cf39629ee1f95f4949211fc20f79e9e73306bb88be7c0f4aafd9.png",
      },
      {
        previewImageUrl:
          "https://i.ibb.co/cxJMhbq/a35853f69e93dc6e9e655f83c270214d54a0d1e31e4e47393917dc45ebf8a3b1.png",
      },
      {
        previewImageUrl:
          "https://i.ibb.co/nwz1Ct1/bccbf1c4a06f1473e3bbfb64f2185896d02779b9c3522b8b9d1695511b13078e.png",
      },
      {
        previewImageUrl:
          "https://i.ibb.co/jM5YzdR/cd0c686e9def6bf29efa319dda9f68f1b6c2b152bb3022ae9b38646d6e961ec9.png",
      },
    ],
  });

  await prisma.storyItem.createMany({
    data: [
      {
        storyId: 1,
        sourceUrl:
          "https://i.ibb.co/84NtqJq/3dd2786cf9d59f0e17855c22ad5fb175ff0ef45c919b00554ad8345b1c2c3762.png",
      },
      {
        storyId: 1,
        sourceUrl:
          "https://i.ibb.co/TWsLxDJ/93c8e57c4c9b20849bb44497c97a19922149b33232d5b4317f21d75b3f1943f3.png",
      },
      {
        storyId: 2,
        sourceUrl:
          "https://i.ibb.co/mbYznSY/b4ecf2ae51ab73a67e97b86ee6f487a2771df7d874e3c2a00a06829c088f07a6.png",
      },
      {
        storyId: 2,
        sourceUrl:
          "https://i.ibb.co/pzDtmVw/c76e268f89378076695d52a4393a406c21023e56c08ededf633ec7e004e64cc0.png",
      },
      {
        storyId: 3,
        sourceUrl:
          "https://i.ibb.co/Tqthkcd/cd256165116570e311c0ad9d546deeffa1ffc10def231364f33b0f0fad72ac5d.png",
      },
    ],
  });
}

// erase data
async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductOption" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Story" RESTART IDENTITY CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "StoryItem" RESTART IDENTITY CASCADE;`;
}

async function main() {
  try {
    await down();
    await up();
  } catch (error) {
    console.log("error", error);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.log("error", error);
    await prisma.$disconnect();
    process.exit(1);
  });
