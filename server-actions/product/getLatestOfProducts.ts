import { prisma } from "@/lib/prisma";

export async function getLatestOfProducts() {
  try {
    const products = await prisma.product.findMany({
      take: 10,
      include: {
        images: {
          take: 1,
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    return products.map((product) => ({
      ...product,
      price: Number(product.price),
    }));
  } catch (error) {
    console.error("Failed to fetch latest products:", error);

    return [];
  }
}
