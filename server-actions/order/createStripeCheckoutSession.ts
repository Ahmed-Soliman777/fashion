"use server"

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "../auth/getCurrentUser";
import { stripe } from "@/lib/stripe";

interface CreateStripeCheckoutSessionInput {
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
}

export async function createStripeCheckoutSession(
  data: CreateStripeCheckoutSessionInput,
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return {
        success: false,
        message: "Please login first.",
      };
    }

    if (data.cartItems.length === 0) {
      return {
        success: false,
        message: "Your cart is empty.",
      };
    }

    const productIds = [
      ...new Set(data.cartItems.map((item) => item.productId)),
    ];

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

    const lineItems = data.cartItems.map((item) => {
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
        quantity: item.quantity,
        price_data: {
          currency: "usd",
          unit_amount: Math.round(price * 100),
          product_data: {
            name: product.name,
          },
        },
      };
    });

    const tax = subtotal * 0.05;

    const stripeLineItems = [
      ...lineItems,
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: Math.round(tax * 100),
          product_data: {
            name: "Tax",
          },
        },
      },
    ];

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: stripeLineItems,
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout`,
      metadata: {
        appName: "Fashion",
        userId: currentUser.id,
        shippingAddress: JSON.stringify(data.shippingAddress),
        cartItems: JSON.stringify(data.cartItems),
      },
    });

    return {
      success: true,
      url: session.url,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Unable to create Stripe checkout session.",
    };
  }
}
