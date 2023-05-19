import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Card = ({ children }: Props) => {
  return (
    <div className="flex flex-col gap-5 rounded-2 border-[1px] border-card-border bg-white p-6 shadow-card">
      {children}
    </div>
  );
};

export default Card;
