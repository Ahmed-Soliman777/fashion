"use client"

import Input from '../ui/Input'
import Button from '../ui/Button'
import { getProfile } from '@/server-actions/user/getProfile'
import z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { updateProfile } from '@/server-actions/user/updateProfile'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

interface EditProfileFormProps {
    userProfile: Awaited<ReturnType<typeof getProfile>>
}

export const editProfileSchema = z.object({
    name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name is too long."),
    phone: z.string().trim().min(10, "Please enter a valid phone number.").max(20, "Phone number is too long."),
    email: z.email(),
    firstName: z.string().trim().min(2, "First name is required"),
    lastName: z.string().trim().min(2, "Last name is required"),
    country: z.string().trim().min(2, "Country is required"),
    state: z.string().trim().min(2, "State is required"),
    city: z.string().trim().min(2, "City is required"),
    postalCode: z.string().trim().optional(),
    street: z.string().trim().min(5, "street is required")
})

export type EditProfileFormValues = z.infer<typeof editProfileSchema>

const EditProfileForm = ({ userProfile }: EditProfileFormProps) => {

    const router = useRouter()

    const address = userProfile?.addresses[0]

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<EditProfileFormValues>({
        resolver: zodResolver(editProfileSchema),
        defaultValues: {
            name: userProfile?.name ?? "",
            phone: userProfile?.phone ?? "",
            email: userProfile?.email ?? "",

            firstName: address?.firstName ?? "",
            lastName: address?.lastName ?? "",
            country: address?.county ?? "",
            city: address?.city ?? "",
            state: address?.state ?? "",
            postalCode: address?.postalCode ?? "",
            street: address?.street ?? "",

        }
    })

    async function onSubmit(data: EditProfileFormValues) {
        // console.log(data)
        const result = await updateProfile(data)

        if (!result.success) {
            return toast.error(result.message)
        }

        toast.success(result.message)

        router.refresh()
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-10 space-y-8">
            {/* personal information */}
            <div className="rounded-2xl border border-border p-6">
                <h2 className="text-xl font-semibold">
                    Personal Information
                </h2>

                <div className="mt-6 grid gap-5 md:grid-cols-2">
                    <Input
                        label="Full Name"
                        placeholder='John Doe'
                        {...register("name")}
                        error={errors.name?.message}
                    />

                    <Input
                        label="Phone Number"
                        placeholder='812 345 6789'
                        {...register("phone")}
                        error={errors.phone?.message}
                    />

                    <Input
                        label="First Name"
                        placeholder='John'
                        {...register("firstName")}
                        error={errors.firstName?.message}
                    />

                    <Input
                        label="Last Name"
                        placeholder='Doe'
                        {...register("lastName")}
                        error={errors.lastName?.message}
                    />

                    <div className="md:col-span-2">
                        <Input
                            label="Email"
                            placeholder='john@mail.com'
                            {...register("email")}
                            error={errors.email?.message}
                        />
                    </div>
                </div>
            </div>

            {/* shipping address */}
            <div className="rounded-2xl border border-border p-6">
                <h2 className="text-xl font-semibold">
                    Shipping Address
                </h2>

                <div className="mt-6 grid gap-5 md:grid-cols-2">
                    <Input
                        label="Country"
                        {...register("country")}
                        error={errors.country?.message}
                    />

                    <Input
                        label="State"
                        {...register("state")}
                        error={errors.state?.message}
                    />

                    <Input
                        label="City"
                        {...register("city")}
                        error={errors.city?.message}
                    />

                    <Input
                        label="Postal Code"
                        {...register("postalCode")}
                        error={errors.postalCode?.message}
                    />

                    <div className="md:col-span-2">
                        <Input
                            variant='textarea'
                            label="Street Address"
                            {...register("street")}
                            error={errors.street?.message}
                        />
                    </div>
                </div>
            </div>

            <div className="flex justify-end">
                <Button disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
            </div>
        </form>
    )
}

export default EditProfileForm