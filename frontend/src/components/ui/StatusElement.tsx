import { useState } from "react";

type Props = {
  status: string;
};

const StatusElement = ({ status }: Props) => {
  const [statusColor, setStatusColor] = useState("bg-pending");
  switch (status) {
    case "Success":
      setStatusColor("bg-success");
      break;
    case "Pending":
      setStatusColor("bg-pending");
      break;
    case "Failed":
      setStatusColor("bg-failed");
      break;
  }

  return (
    <div>
      <div
        className={`${statusColor} rounded-sm w-fit px-3 py-[1px] text-white`}
      >
        {status}
      </div>
    </div>
  );
};

export default StatusElement;
