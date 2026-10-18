import { prisma } from "@/lib/prisma";
import { requireAdmin } from "../auth/require-admin";

export async function getAdminOrders(orderId: number) {
  try {
    await requireAdmin();

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            phone: true,
          },
        },

        address: true,

        items: {
          include: {
            product: {
              include: {
                images: {
                  take: 1,
                },
              },
            },
          },
        },
      },
    });

    if (!order) {
      return null;
    }

    return {
      id: order.id,
      orderNumber: order.orderNumber,

      createdAt: order.createdAt,

      status: order.status,

      paymentStatus: order.paymentStatus,
      paymentMethod: order.paymentMethod,

      subtotal: order.subtotal,
      shipping: order.shipping,
      tax: Number(order.tax),
      total: Number(order.total),

      customer: {
        name: order.user.name,
        email: order.user.email,
        phone: order.user.phone,
      },

      address: {
        firstName: order.address.firstName,
        lastName: order.address.lastName,
        street: order.address.street,
        city: order.address.city,
        state: order.address.state,
        country: order.address.county,
        phone: order.address.phone,
      },

      items: order.items.map((item) => ({
        id: item.id,

        productId: item.productId,
        name: item.product?.name,
        image: item.product?.images[0].imageUrl ?? "",

        quantity: item.quantity,
        size: item.size,

        price: Number(item.price),
      })),
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}
