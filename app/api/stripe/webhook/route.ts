import {
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
} from "@/app/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { createOrder } from "@/server-actions/order/createOrder";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();

  const signature = (await headers()).get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature." }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (error) {
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;

        if (session.payment_status !== "paid") {
          break;
        }

        const metadata = session.metadata;

        if (!metadata) {
          throw new Error("Missing metadata.");
        }

        if (metadata.appName !== "Fashion") {
          throw new Error("Invalid application metadata.");
        }

        const existingOrder = await prisma.order.findUnique({
          where: {
            stripeSessionId: session.id,
          },
        });

        if (existingOrder) {
          break;
        }

        await createOrder({
          userId: metadata.userId,

          paymentMethod: PaymentMethod.STRIPE,
          paymentStatus: PaymentStatus.PAID,
          status: OrderStatus.PENDING,

          stripeSessionId: session.id,

          shippingAddress: JSON.parse(metadata.shippingAddress),
          cartItems: JSON.parse(metadata.cartItems),
        });

        break;
      }
    }

    return NextResponse.json({ recieved: true });
  } catch (error) {
    console.error(error);

    return NextResponse.json({ error: "Webhook Error." }, { status: 500 });
  }
}
