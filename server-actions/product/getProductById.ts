import { prisma } from "@/lib/prisma";

export default async function getProductById(productId: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        images: {
          orderBy: {
            createdAt: "asc",
          },
        },
        sizes: {
          orderBy: {
            createdAt: "asc",
          },
        },
        colors: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    if (!product) {
      return null;
    }

    return {
      ...product,
      price: Number(product.price),
    };
  } catch (error) {
    console.error("Failed to fetch data: ", error);
    return null;
  }
}
