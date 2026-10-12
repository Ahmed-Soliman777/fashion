"use server"

import {
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
} from "@/app/generated/prisma/enums";
import { prisma } from "@/lib/prisma";

interface CreateOrderInput {
  userId: string;

  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  status?: OrderStatus;

  shippingAddress: {
    firstName: string;
    lastName: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    country: string;
  };

  cartItems: {
    productId: string;
    quantity: number;
    size: string;
    color: string;
  }[];

  stripeSessionId?: string | null;
}

export async function createOrder(data: CreateOrderInput) {
  const productIds = [...new Set(data.cartItems.map((item) => item.productId))];

  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds,
      },
    },
  });

  if (products.length !== productIds.length) {
    throw new Error("One or more products no longer exist.");
  }

  let subtotal = 0;

  const orderItems = data.cartItems.map((item) => {
    const product = products.find((p) => p.id === item.productId);

    if (!product) {
      throw new Error("Product not found.");
    }

    if (product.stock < item.quantity) {
      throw new Error(`${product.name} is out of stock.`);
    }

    const price = Number(product.price);

    subtotal += price * item.quantity;

    return {
      productId: product.id,
      quantity: item.quantity,
      price,
      size: item.size,
      color: item.color,
    };
  });

  const shipping = 0;
  const tax = subtotal * 0.05;
  const total = subtotal + shipping + tax;

  function generateOrderNumber() {
    const year = new Date().getFullYear();

    const random = Math.random().toString(36).substring(2, 8).toUpperCase();

    return `ORD-${year}-${random}`;
  }

  const order = await prisma.$transaction(async (tx) => {
    let address = await tx.address.findFirst({
      where: { userId: data.userId, isDefault: true },
    });
    if (!address) {
      address = await tx.address.create({
        data: {
          firstName: data.shippingAddress.firstName,
          lastName: data.shippingAddress.lastName,
          phone: data.shippingAddress.phone,
          street: data.shippingAddress.street,
          city: data.shippingAddress.city,
          state: data.shippingAddress.state,
          county: data.shippingAddress.country,
          isDefault: true,
          userId: data.userId,
        },
      });
    }

    for (const item of orderItems) {
      await tx.product.update({
        where: { id: item.productId },
        data: {
          stock: {
            decrement: item.quantity,
          },
        },
      });
    }

    const createOrder = await tx.order.create({
      data: {
        orderNumber: generateOrderNumber(),

        stripeSessionId: data.stripeSessionId,

        subtotal,
        shipping,
        tax,
        total,

        paymentMethod: data.paymentMethod,
        paymentStatus: data.paymentStatus,
        status: data.status ?? OrderStatus.PENDING,

        userId: data.userId,
        addressId: address.id,

        items: {
          create: orderItems,
        },
      },
    });
    return createOrder;
  });

  return order;
}
