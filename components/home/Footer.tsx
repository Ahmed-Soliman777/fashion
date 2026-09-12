import Link from "next/link"

const Footer = () => {
    return (
        <footer className="mt-16 flex flex-col items-center justify-center gap-4 border-t border-border pt-8 text-sm text-muted-foreground md:flex-row">

            <p>
                &copy; {new Date().getFullYear()} Fashion. All rights reserved.
            </p>

            <div className="flex gap-6">
                <Link
                    href={'/terms'}
                >
                    Terms
                </Link>
                <Link
                    href={'/privacy-policy'}
                >
                    Privacy Policy
                </Link>
                <Link
                    href={'/cookies'}
                >
                    Cookies
                </Link>
            </div>

        </footer>
    )
}

export default Footer