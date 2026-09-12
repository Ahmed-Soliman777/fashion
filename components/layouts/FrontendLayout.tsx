import React from "react"
import Navbar from "../Navbar"
import Footer from "../home/Footer"

const FrontendLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Navbar />
            <div
                className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8"
            >
                {children}
            </div>
            <Footer />
        </>
    )
}

export default FrontendLayout