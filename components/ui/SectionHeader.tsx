interface SectionHeaderProps {
    title: string,
    subTitle: string
}
const SectionHeader = ({
    title,
    subTitle
}: SectionHeaderProps) => {
    return (
        <div className="mx-auto text-center max-w-2xl py-8">

            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {title}
            </h2>

            <p className="mt-4 text-base leading-7 text-muted-foreground">
                {subTitle}
            </p>

        </div>
    )
}

export default SectionHeader