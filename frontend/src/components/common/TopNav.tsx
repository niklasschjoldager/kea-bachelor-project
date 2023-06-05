"use client";

import React from "react";
import Image from "next/image";
import Logo from "@/icons/logo.svg";
import UserSettingsMenu from "@/components/common/UserSettingsMenu";
import NavigationList from "@/components/ui/NavigationList";
import { useSession } from "next-auth/react";

const TopNav = () => {
  const { data: session } = useSession();
  const navElements = [
    { name: "Events", href: "/dashboard/events" },
    { name: "Integration", href: "/dashboard/integration" },
  ];

  const name = session?.user?.name?.split(" ");
  const nameInitials = name ? `${name[0][0]}${name[name.length - 1][0]}` : "";

  return (
    <div className="w-full border-b-[1px] border-b-card-border bg-white px-5 pt-5 shadow-card">
      <div className="flex justify-between mb-8">
        <div className="flex gap-4">
          <Image priority src={Logo} alt="Logo" height={30} />
        </div>
        <UserSettingsMenu userInitials={nameInitials} />
      </div>
      <div>
        <NavigationList navElements={navElements} />
      </div>
    </div>
  );
};

export default TopNav;
