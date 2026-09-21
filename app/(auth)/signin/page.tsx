"use client"

import FrontendLayout from '@/components/layouts/FrontendLayout'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { FcGoogle } from 'react-icons/fc'
import z from 'zod'

const signInSchema = z.object({
    email: z.email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long."),
})

type SignUpFormValues = z.infer<typeof signInSchema>

const page = () => {

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignUpFormValues>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit = async (data: SignUpFormValues) => {
        console.log(data)
    }

    return (
        <FrontendLayout>
            <section className="flex min-h-[70vh] items-center justify-center py-16">
                <div className="max-w-md w-full">
                    {/* header */}
                    <div className="text-center">

                        <h2 className="text-3xl font-bold text-foreground">
                            Welcome Back
                        </h2>

                        <p className="mt-3 text-muted-foreground">
                            Join us and start shopping your favorite styles.
                        </p>
                    </div>

                    {/* form */}
                    <form
                        className="space-y-5 mt-8"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <Input
                            label='Email Address'
                            placeholder='john@mail.com'
                            type='text'
                            {...register("email")}
                            error={errors.email?.message}
                        />
                        <Input
                            label='Password'
                            placeholder='Create a password'
                            type='text'
                            {...register("password")}
                            error={errors.password?.message}
                        />

                        <Button
                            fullWidth={true}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Signing In..." : "Sign In"}
                        </Button>

                        <Button
                            leftIcon={<FcGoogle size={18} />}
                            type='button'
                            fullWidth
                            variant='outline'
                        >
                            Continue with google
                        </Button>
                    </form>

                    <p className="mt-8 text-center text-sm text-muted-foreground">
                        Don not have an account?{' '}
                        <Link
                            href={'/signup'}
                        >
                            Create Account
                        </Link>
                    </p>
                </div>
            </section>
        </FrontendLayout>
    )
}

export default page