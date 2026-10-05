import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "../auth/getCurrentUser";

export async function getProfile() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return null;
    }

    const user = await prisma.user.findUnique({
      where: { id: currentUser.id },
      include: {
        addresses: {
          where: {
            isDefault: true,
          },
          take: 1,
        },
      },
    });

    return user;
  } catch (error) {
    console.error("Failed to fetch profile:", error);
    return null;
  }
}
