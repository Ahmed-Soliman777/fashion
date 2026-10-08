import { Category, ProductType, Size } from "@/app/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/server-actions/auth/require-admin";
import { uploadImages } from "@/services/uploadImages";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await requireAdmin();

    const formData = await req.formData();

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = Number(formData.get("price"));
    const stock = Number(formData.get("stock"));
    const category = formData.get("category") as Category;
    const productType = formData.get("productType") as ProductType;
    const bestSeller = formData.get("bestSeller") === "true";
    const sizes = formData.getAll("sizes") as Size[];
    const colors = formData.getAll("colors").map(
      (color) =>
        JSON.parse(color as string) as {
          name: string;
          value: string;
        },
    );

    const images = formData.getAll("images") as File[];

    const imageUrls = await uploadImages(images);

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        category,
        productType,
        bestSeller,
        stock,

        images: {
          create: imageUrls.map((image) => ({
            imageUrl: image.imageUrl,
            publicId: image.publicId,
          })),
        },

        sizes: {
          create: sizes.map((size) => ({
            size,
          })),
        },

        colors: {
          create: colors.map((color) => ({
            name: color.name,
            value: color.value,
          })),
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Product created successfully.",
        productId: product.id,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong.",
      },
      { status: 500 },
    );
  }
}
