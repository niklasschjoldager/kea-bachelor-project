import React from "react";
import Image from "next/image";
import Logo from "@/icons/logo.svg";
import UserSettingsMenu from "@/components/UserSettingsMenu";
import SiteSelector from "@/components/SiteSelector";
import NavigationList from "@/components/NavigationList";

type Props = {
  sites: string[];
  navElements: string[];
};

const TopNav = ({ sites, navElements }: Props) => {
  return (
    <div className="w-full border-b-[1px] border-b-card-border bg-white pt-5 px-5 shadow-card">
      <div className="flex justify-between mb-8">
        <div className="flex gap-4">
          <Image
            priority
            src={Logo}
            alt="Logo"
            height={30}
          />
          <SiteSelector sites={sites} />
        </div>
        <UserSettingsMenu userInitials="SM" />
      </div>
      <div>
        <NavigationList navElements={navElements} />
      </div>
    </div>
  );
};

export default TopNav;
