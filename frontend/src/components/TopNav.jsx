import React from 'react';
import Image from 'next/image';
import Logo from '../assets/icons/logo.svg';
import UserSettingsMenu from './UserSettingsMenu';
import SiteSelector from './SiteSelector';
import NavigationList from './NavigationList';



const TopNav = ({ sites, navElements }) => (
    <div className="w-full border-b-2 border-b-paynes-gray bg-white pt-5 px-5">
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
)

export default TopNav;