"use server";
import { EditProfileFormValues } from "@/components/user/EditProfileForm";
import { getCurrentUser } from "../auth/getCurrentUser";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateProfile(data: EditProfileFormValues) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: currentUser.id },
        data: {
          name: data.name,
          phone: data.phone,
        },
      });

      const defaultAddress = await tx.address.findFirst({
        where: {
          id: currentUser.id,
          isDefault: true,
        },
      });

      if (defaultAddress) {
        await tx.address.update({
          where: { id: defaultAddress.id },
          data: {
            firstName: data.firstName,
            lastName: data.lastName,
            phone: data.phone,
            street: data.street,
            city: data.city,
            state: data.state,
            country: data.country,
            postalCode: data.postalCode,
          },
        });
      } else {
        await tx.address.create({
          data: {
            firstName: data.firstName,
            lastName: data.lastName,
            phone: data.phone,
            street: data.street,
            city: data.city,
            state: data.state,
            county: data.country,
            postalCode: data.postalCode,
            isDefault: true,
            userId: currentUser.id,
          },
        });
      }
    });

    revalidatePath("/account");
    revalidatePath("/account/edit");

    return {
      success: true,
      message: "Profile updated successfully.",
    };
  } catch (error) {
    console.error("Failed to update profile:", error);

    return {
      success: false,
      message: "Failed to update profile.",
    };
  }
}
