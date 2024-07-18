import { _ingredients, categories, products } from "./constants"
import { prisma } from "./prisma-client"
import { hashSync } from "bcrypt"

const randomDecimal = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10
}

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
  })

  await prisma.category.createMany({
    data: categories 
  })

  await prisma.ingridient.createMany({
    data: _ingredients
  })

  await prisma.product.createMany({
    data: products
  })

  const pizza1 = await prisma.product.create({
    data: {
      name: "Pepperoni fresh",
      imageUrl: "https://robbreport.com/wp-content/uploads/2024/06/opener-w-Bugatti-3.jpg?w=1024",
      categoryId: 1,
      ingridients: {
        connect: _ingredients.slice(0, 5)
      }
    }
  })
  const pizza2 = await prisma.product.create({
    data: {
      name: "Cheese",
      imageUrl: "https://robbreport.com/wp-content/uploads/2023/08/1-2.jpg",
      categoryId: 1,
      ingridients: {
        connect: _ingredients.slice(5, 10)
      }
    }
  })
  const pizza3 = await prisma.product.create({
    data: {
      name: "Corizo fresh",
      imageUrl: "https://hips.hearstapps.com/hmg-prod/images/02-ss300p-3i4-front-1567703461.jpg",
      categoryId: 1,
      ingridients: {
        connect: _ingredients.slice(10, 40)
      }
    }
  })

  await prisma.productOption.createMany({
    data: []
  })
}

// erase data
async function down() {
    await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`
    await prisma.$executeRaw`TRUNCATE TABLE "Ingridient" RESTART IDENTITY CASCADE`
    await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`
    await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`
}

async function main() {
  try {
    await down()
    await up()
  } catch (error) {
    console.log("error", error)
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (error) => {
    console.log("error", error)
    await prisma.$disconnect()
    process.exit(1)
  })
