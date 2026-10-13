"use server";
import { prisma } from "@/lib/prisma";

export async function getOrderByStripeSession(stripeSessionId: string) {
  const order = await prisma.order.findUnique({
    where: {
      stripeSessionId,
    },
    select: {
      id: true,
      orderNumber: true,
    },
  });

  return order;
}
