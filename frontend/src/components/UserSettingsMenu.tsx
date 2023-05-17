"use client";
import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import UserIcon from './UserIcon';
import Image from 'next/image';
import ArrowDown from '../assets/icons/arrow-down-paynes.svg';

type Props = {
    userInitials: string
}

const UserSettingsMenu = ({ userInitials }: Props) => (
    <div >
        <DropdownMenu.Root align="right"
        >
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
                    className="bg-white rounded-2 border-[1px] border-card-border shadow-card mt-2 will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade"
                    align="end">
                    <DropdownMenu.Label />
                    <DropdownMenu.Item
                        className="text-dark-gray cursor-pointer w-40 p-4 hover:outline-none">
                        Log out
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    </div>
);

export default UserSettingsMenu;