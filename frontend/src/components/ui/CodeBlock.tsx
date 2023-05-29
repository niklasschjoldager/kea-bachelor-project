import Image from "next/image";
import CopyIcon from "@/icons/copy.svg";
import { ReactNode, useState } from "react";

type Props = {
  children: ReactNode;
};

const CodeBlock = ({ children }: Props) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const copy = (event: React.MouseEvent<Element, MouseEvent>) => {
    const target = event.target as Element;
    let textElm = target.parentElement?.querySelector("pre");

    // Copy the text inside the text field
    navigator.clipboard.writeText(textElm?.innerText || "");

    // Show tooltip
    setShowTooltip(true);
    setTimeout(() => {
      setShowTooltip(false);
    }, 1000);
  };

  return (
    <div className="relative px-3 pb-3 bg-ghost-white pt-11">
      <pre className="overflow-x-auto ">{children}</pre>
      <div
        className="absolute top-0 right-0 flex items-center justify-center w-8 h-8 transition cursor-pointer bg-slate-gray hover:bg-paynes-gray"
        onClick={(event) => copy(event)}
      >
        <Image
          priority
          src={CopyIcon}
          alt="Copy icon"
          width={20}
          className="transition pointer-events-none"
        />
        <div
          className={`${
            showTooltip ? "opacity-100" : "opacity-0"
          } pointer-events-none absolute top-10 rounded-2 bg-dark-gray px-2 py-1 text-white transition-opacity after:absolute after:-top-1 after:left-1/2 after:h-2 after:w-2 after:-translate-x-1/2 after:rotate-45 after:bg-dark-gray`}
        >
          Copied!
        </div>
      </div>
    </div>
  );
};

export default CodeBlock;
