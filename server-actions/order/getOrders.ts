import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "../auth/getCurrentUser";
export async function getOrders() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

    const orders = await prisma.order.findMany({
      where: {
        userId: currentUser.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        orderNumber: true,
        status: true,
        paymentMethod: true,
        paymentStatus: true,
        createdAt: true,
        subtotal: true,
        shipping: true,
        tax: true,
        total: true,
        items: {
          select: {
            quantity: true,
            product: {
              select: {
                images: {
                  select: {
                    imageUrl: true,
                  },
                  take: 1,
                },
              },
            },
          },
        },
      },
    });

    return orders.map((order) => ({
      id: order.id,
      orderNumber: order.orderNumber,

      status: order.status,
      PaymentStatus: order.paymentStatus,
      PaymentMethod: order.paymentMethod,

      createdAt: order.createdAt,

      subtotal: Number(order.subtotal),
      shipping: Number(order.shipping),
      tax: Number(order.tax),
      total: Number(order.total),

      totalItems: order.items.reduce((total, item) => total + item.quantity, 0),

      image: order.items[0]?.product?.images[0]?.imageUrl ?? "",
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
}
