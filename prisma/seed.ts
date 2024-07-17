import { _ingredients, categories, products } from "./constants"
import { prisma } from "./prisma-client"
import { hashSync } from "bcrypt"

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
