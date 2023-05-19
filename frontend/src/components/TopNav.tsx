"use client";

import React from "react";
import Image from "next/image";
import Logo from "@/icons/logo.svg";
import UserSettingsMenu from "@/components/UserSettingsMenu";
import SiteSelector from "@/components/SiteSelector";
import NavigationList from "@/components/NavigationList";
import { useSession } from "next-auth/react";

type Props = {
  sites: string[];
};

const TopNav = ({ sites }: Props) => {
  const { data: session } = useSession();
  const navElements = [
    { name: "Events", href: "/events" },
    { name: "Integration", href: "/integration" },
  ];

  return (
    <div className="w-full border-b-[1px] border-b-card-border bg-white px-5 pt-5 shadow-card">
      <div className="flex justify-between mb-8">
        <div className="flex gap-4">
          <Image priority src={Logo} alt="Logo" height={30} />
          <SiteSelector sites={sites} />
        </div>
        {session?.user?.name ? (
          <UserSettingsMenu userInitials="SM" />
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div>
        <NavigationList navElements={navElements} />
      </div>
    </div>
  );
};

export default TopNav;
