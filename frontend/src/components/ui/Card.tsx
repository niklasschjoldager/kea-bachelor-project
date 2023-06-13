import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Card = ({ children }: Props) => {
  return (
    <div className="rounded-sm flex flex-col gap-6 overflow-y-auto border-[1px] border-card-border bg-white p-6 shadow-card">
      {children}
    </div>
  );
};

export default Card;
