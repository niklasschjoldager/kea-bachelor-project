import React from 'react';

type Props = {
    userInitials: string
}

const UserIcon = ({ userInitials }: Props) => {
    return (
        <div className="rounded-full bg-paynes-gray w-10 h-10 text-white flex items-center justify-center leading-4">
            {userInitials}
        </div>
    )
}

export default UserIcon;