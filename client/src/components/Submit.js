import useWilder from "../hooks/useWilder";

const Submit = ({children, className, ...props}) => {
    const {pending} = useWilder()
    return (
        <button disabled={pending} type={"submit"} className={`button ${className}`} {...props}>{pending ? "Loading..." : children}</button>
    )
}

export default Submit