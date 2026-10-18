import { prisma } from "@/lib/prisma";
import { requireAdmin } from "../auth/require-admin";

export async function getAllOrders() {
  try {
    await requireAdmin();

    const orders = await prisma.order.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
        _count: {
          select: {
            items: true,
          },
        },
      },
    });

    return orders.map((order) => ({
      id: order.id,
      orderNumber: order.orderNumber,

      customer: order.user.name ?? "Unknown Customer",

      totalItems: order._count.items,
      total: Number(order.total),
      paymentMethod: order.paymentMethod,
      paymentStatus: order.paymentStatus,
      status: order.status,

      createdAt: order.createdAt,
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
}
