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
    <div className="relative bg-ghost-white px-3 pb-3 pt-11">
      <pre className="overflow-x-auto ">{children}</pre>
      <div
        className="absolute right-0 top-0 flex h-8 w-8 cursor-pointer items-center justify-center bg-slate-gray transition hover:bg-paynes-gray"
        onClick={(event) => copy(event)}
      >
        <Image
          priority
          src={CopyIcon}
          alt="Copy icon"
          width={20}
          className="pointer-events-none transition"
        />
        <div
          className={`${
            showTooltip ? "opacity-100" : "opacity-0"
          } rounded-sm pointer-events-none absolute top-10 bg-dark-gray px-2 py-1 text-white transition-opacity after:absolute after:-top-1 after:left-1/2 after:h-2 after:w-2 after:-translate-x-1/2 after:rotate-45 after:bg-dark-gray`}
        >
          Copied!
        </div>
      </div>
    </div>
  );
};

export default CodeBlock;
