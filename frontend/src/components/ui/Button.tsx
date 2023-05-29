import React from "react";

type Props = {
  buttonText: string;
  type?: "submit";
};

const Button = ({ buttonText, type }: Props) => {
  return (
    <button
      type={type}
      className="px-3 h-10 text-white rounded-2 bg-dark-gray text-body"
    >
      {buttonText}
    </button>
  );
};

export default Button;
