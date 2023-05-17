import React from 'react';

const UserIcon = ({ userInitials }) => {
    return (
        <div className="rounded-full bg-paynes-gray w-10 h-10 text-white flex items-center justify-center">
            {userInitials}
        </div>
    )
}

export default UserIcon;