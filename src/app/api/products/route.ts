import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    let where: any = {};

    if (category) {
      where.category = { name: category };
    }

    if (search) {
      where.OR = [
        { name: { contains: search } }, // SQLite doesn't support case-insensitive mode natively in contains for Prisma unless configured, but we'll use basic contains
        { description: { contains: search } }
      ];
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        category: true,
        reviews: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    // Assuming data contains: name, description, price, categoryId, images (array of strings), stock
    
    // In a real app, we would verify if the user is an ADMIN or SELLER here
    
    const product = await prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: parseFloat(data.price),
        categoryId: data.categoryId,
        images: JSON.stringify(data.images || []),
        stock: parseInt(data.stock || '0'),
      }
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
