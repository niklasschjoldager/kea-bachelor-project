import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Card = ({ children }: Props) => {
  return (
    <div className="bg-white border rounded-sm border-card-border shadow-card flex flex-col gap-6 overflow-y-auto overflow-x-hidden">
      {children}
    </div>
  );
};

export default Card;
