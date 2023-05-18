import React from "react";

type Props = {
  buttonText: string;
  type?: "submit";
};

const Button = ({ buttonText, type }: Props) => {
  return (
    <button
      type={type}
      className="px-3 py-2 text-white rounded-2 bg-dark-gray text-button"
    >
      {buttonText}
    </button>
  );
};

export default Button;
