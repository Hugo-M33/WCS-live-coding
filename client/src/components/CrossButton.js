import useWilder from "../hooks/useWilder";

const CrossButton = ({children, className,  ...props}) => {
    const {pending} = useWilder()
    return (
        <button type={"reset"} className={`button ${className}`} {...props}>{pending ? "..." : children}</button>
    )
}

export default CrossButton