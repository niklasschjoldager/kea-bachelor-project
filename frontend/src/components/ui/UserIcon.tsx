import React from "react";

type Props = {
  userInitials: string;
};

const UserIcon = ({ userInitials }: Props) => {
  return (
    <div className="flex items-center justify-center w-10 h-10 leading-4 text-white rounded-full bg-paynes-gray">
      {userInitials}
    </div>
  );
};

export default UserIcon;
