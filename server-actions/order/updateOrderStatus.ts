"use server";

import { OrderStatus } from "@/app/generated/prisma/enums";
import { prisma } from "@/lib/prisma";

interface UpdateOrderStatusProps {
  orderId: number;
  status: OrderStatus;
}

export async function updateOrderStatus({
  orderId,
  status,
}: UpdateOrderStatusProps) {
  try {
    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      return {
        success: false,
        message: "Order not found.",
      };
    }

    await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status,
      },
    });

    return {
      success: true,
      message: "Order status updated successfully.",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Unable to update order status.",
    };
  }
}
