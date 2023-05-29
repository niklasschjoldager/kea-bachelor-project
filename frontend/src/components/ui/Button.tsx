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
      className="px-3 h-10 text-white rounded-2 bg-dark-gray text-body"
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
};

export default Button;
