import React, { ButtonHTMLAttributes } from "react"

type ButtonVariant = "primary" | "outline"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: ButtonVariant;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    fullWidth?: boolean;
    paddingX?: string
}

const variants: Record<ButtonVariant, string> = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary-hover',
    outline: 'border border-border bg-transparent text-foreground hover:bg-surface'
}

const Button = ({
    children,
    variant = "primary",
    leftIcon,
    rightIcon,
    fullWidth = false,
    paddingX = "px-4",
    className = "",
    ...props
}: ButtonProps) => {
    return (
        <button className={`${paddingX} inline-flex h-12 items-center justify-center gap-2 rounded-lg px-5 font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer ${fullWidth ? "w-full" : "w-fit"}`} {...props}>
            {
                leftIcon && (
                    <span className="flex items-center">
                        {leftIcon}
                    </span>
                )
            }
            <span>{children}</span>
            {
                rightIcon && (
                    <span className="flex items-center">
                        {rightIcon}
                    </span>
                )
            }
        </button>
    )
}

export default Button