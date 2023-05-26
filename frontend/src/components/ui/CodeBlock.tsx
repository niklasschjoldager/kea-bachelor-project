import Image from "next/image";
import CopyIcon from "@/icons/copy.svg"
import { ReactNode, useState } from "react";

type Props = {
    children: ReactNode;
}

const CodeBlock = ({ children }: Props) => {

    const [showTooltip, setShowTooltip] = useState(false);

    const copy = (event: React.MouseEvent<Element, MouseEvent>) => {
        const target = event.target as Element;
        let textElm = target.parentElement?.querySelector("pre");

        // Copy the text inside the text field
        navigator.clipboard.writeText(textElm?.innerText || "");

        // Show tooltip
        setShowTooltip(true)
        setTimeout(() => {
            setShowTooltip(false)
        }, 1000);
    }

    return (
        <div className="bg-ghost-white p-3 relative">
            <pre>
                {children}
            </pre>
            <div className="bg-slate-gray w-8 h-8 absolute top-0 right-0 flex justify-center items-center cursor-pointer hover:bg-paynes-gray transition"
                onClick={(event) => copy(event)}>
                <Image
                    priority
                    src={CopyIcon}
                    alt="Copy icon"
                    width={20}
                    className="pointer-events-none transition"
                />
                <div className={`${showTooltip ? 'opacity-100' : 'opacity-0'} absolute bg-dark-gray rounded-2 py-1 px-2 text-white pointer-events-none top-10 transition-opacity after:w-2 after:h-2 after:bg-dark-gray after:absolute after:-top-1 after:left-1/2 after:rotate-45 after:-translate-x-1/2`}>
                    Copied!
                </div>
            </div>
        </div>

    )
}

export default CodeBlock;