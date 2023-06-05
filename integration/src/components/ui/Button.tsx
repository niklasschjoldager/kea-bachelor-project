type Props = {
  buttonText: string;
  onClick?: () => void;
  type?: "submit";
  state?: "disabled" | "enabled";
};

const Button = ({ buttonText, onClick, type, state }: Props) => {
  return (
    <button
      type={type}
      className={`px-3 h-10 text-white rounded-2 text-button ${state == "disabled" ? "bg-dark-gray-faded cursor-default" : "bg-dark-gray"}`}
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
};

export default Button;
