import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "../auth/getCurrentUser";

export async function getOrder(orderNumber: string) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return null;
    }

    const order = await prisma.order.findUnique({
      where: {
        orderNumber,
        userId: currentUser.id,
      },
      include: {
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
      paymentMethod: order.paymentMethod,
      PaymentStatus: order.paymentStatus,

      subtotal: Number(order.subtotal),
      shipping: Number(order.shipping),
      tax: Number(order.tax),
      total: Number(order.total),

      address: {
        firstName: order.address.firstName,
        lastName: order.address.lastName,
        phone: order.address.phone,
        street: order.address.street,
        city: order.address.city,
        state: order.address.state,
        country: order.address.county,
      },

      items: order.items.map((item) => ({
        id: item.id,
        productId: item.productId,
        name: item.product?.name,
        image: item.product?.images[0].imageUrl ?? "",
        quantity: item.quantity,
        size: item.size,
        color: item.color,
        price: Number(item.price),
      })),
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}
