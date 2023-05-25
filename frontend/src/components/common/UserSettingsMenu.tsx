"use client";
import React from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import UserIcon from "@/components/ui/UserIcon";
import Image from "next/image";
import ArrowDown from "@/icons/arrow-down-paynes.svg";
import { signOut } from "next-auth/react";

type Props = {
  userInitials: string;
};

const UserSettingsMenu = ({ userInitials }: Props) => {
  return (
    <div>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className="flex items-center gap-2 group focus:outline-none">
            <UserIcon userInitials={userInitials} />
            <div className="group-aria-expanded:rotate-180">
              <Image
                priority
                src={ArrowDown}
                alt="Arrow down"
                className="bg-white"
              />
            </div>
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className="mt-2 rounded-2 border-[1px] border-card-border bg-white shadow-card will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade"
            align="end"
          >
            <DropdownMenu.Label />
            <DropdownMenu.Item
              className="w-40 p-4 cursor-pointer text-dark-gray hover:outline-none"
              onClick={() => signOut()}
            >
              Log out
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
};

export default UserSettingsMenu;
