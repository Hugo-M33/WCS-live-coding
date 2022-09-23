import useWilder from "../hooks/useWilder";
import {ButtonHTMLAttributes} from "react";
import {ComponentWithChildren} from "../types/interfaces";

interface ISubmitProps extends ComponentWithChildren, Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
    className?: string
}

const Submit = ({children, className, ...props}: ISubmitProps) => {
    const {pending} = useWilder()
    return (
        <button disabled={pending} type={"submit"}
                className={`button ${className}`} {...props}>{pending ? "Loading..." : children}</button>
    )
}

export default Submit