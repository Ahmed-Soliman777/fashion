"use client"

import { useCartStore } from "@/store/cart-store"

const CartComponent = () => {

    const { totalItems } = useCartStore()

    if (totalItems() === 0) {
        return null
    }

    return (
        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[11px] font-semibold text-white">
            {
                totalItems()
            }
        </span>
    )
}

export default CartComponent