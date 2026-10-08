"use client"
import { deleteProducts } from '@/server-actions/product/deleteProducts'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { FaTrashAlt } from 'react-icons/fa'

interface DeleteProductButtonProps {
    productId: string
}

const DeleteProductButton = ({
    productId
}: DeleteProductButtonProps) => {

    const router = useRouter()

    const [isDeleting, setIsDeleting] = useState(false)

    async function handleDelete() {
        const confirmed = window.confirm("Are you sure to delete this product?")

        if (!confirmed) {
            return
        }

        try {
            setIsDeleting(true)

            const res = await deleteProducts(productId)

            if (!res.success) {
                return toast.error(res.message)
            }

            toast.success(res.message)

            router.refresh()
        } catch (error) {
            console.error(error)
            toast.error("Something went wrong.")
        } finally {
            setIsDeleting(false)
        }
    }
    return (
        <button
            onClick={handleDelete}
            disabled={isDeleting}
            className='rounded-lg p-2 text-destructive transition hover:bg-destructive/10 disabled:cursor-not-allowed disabled:opacity-50'
        >
            {
                isDeleting ? "Deleting..." : <FaTrashAlt className="text-destructive" />
            }
        </button>
    )
}

export default DeleteProductButton