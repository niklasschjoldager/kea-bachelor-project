import { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

const Card = ({ children }: Props) => {
    return (
        <div className="bg-white border-[1px] rounded-2 border-card-border shadow-card flex flex-col gap-6 overflow-scroll">
            {children}
        </div>
    )
}

export default Card;
