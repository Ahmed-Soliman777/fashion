import { redirect } from "next/navigation";
import { getCurrentUser } from "./getCurrentUser";
import { prisma } from "@/lib/prisma";
export async function requireAdmin() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    redirect("/signin");
  }

  const user = await prisma.user.findUnique({
    where: { id: currentUser.id },
    select: { role: true },
  });

  if (user?.role !== "ADMIN") {
    redirect('/account')
  }
}
