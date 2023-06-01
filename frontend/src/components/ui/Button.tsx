import React from "react";

type Props = {
  buttonText: string;
  onClick?: () => void;
  type?: "submit";
};

const Button = ({ buttonText, onClick, type }: Props) => {
  return (
    <button
      type={type}
      className="rounded-sm h-10 bg-dark-gray px-3 text-body text-white"
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
};

export default Button;
