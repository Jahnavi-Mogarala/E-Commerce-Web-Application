import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const password = await bcrypt.hash('password123', 10)

  // Users
  const users = [
    { name: 'hseniv', email: 'hseniv@example.com', password, role: 'CUSTOMER' },
    { name: 'dumku', email: 'dumku@example.com', password, role: 'CUSTOMER' },
    { name: 'kutty', email: 'kutty@example.com', password, role: 'CUSTOMER' },
    { name: 'Admin', email: 'admin@example.com', password, role: 'ADMIN' },
  ]

  for (const u of users) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: u,
    })
  }

  // Categories
  const category1 = await prisma.category.upsert({
    where: { name: 'Electronics' },
    update: {},
    create: { name: 'Electronics', description: 'Gadgets and devices' }
  })

  const category2 = await prisma.category.upsert({
    where: { name: 'Fashion' },
    update: {},
    create: { name: 'Fashion', description: 'Clothing and apparel' }
  })

  // Products
  const products = [
    {
      name: 'Quantum Laptop Pro',
      description: 'The most advanced laptop for developers.',
      price: 1999.99,
      categoryId: category1.id,
      stock: 50,
      images: JSON.stringify(['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80']),
    },
    {
      name: 'Wireless Earbuds X',
      description: 'Noise-cancelling premium sound.',
      price: 199.99,
      categoryId: category1.id,
      stock: 100,
      images: JSON.stringify(['https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80']),
    },
    {
      name: 'Neon Cyber Jacket',
      description: 'Futuristic streetwear for the bold.',
      price: 129.99,
      categoryId: category2.id,
      stock: 25,
      images: JSON.stringify(['https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80']),
    }
  ]

  for (const p of products) {
    await prisma.product.create({ data: p })
  }

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
