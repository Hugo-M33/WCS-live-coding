import useWilder from "../hooks/useWilder";
import {ComponentWithChildren} from "../types/interfaces";
import {ButtonHTMLAttributes} from "react";

interface ICrossButtonProps extends ComponentWithChildren, Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
    className?: string
}

const CrossButton = ({children, className, ...props}: ICrossButtonProps) => {
    const {pending} = useWilder()
    return (
        <button type={"reset"} className={`button ${className}`} {...props}>{pending ? "..." : children}</button>
    )
}


export default CrossButton