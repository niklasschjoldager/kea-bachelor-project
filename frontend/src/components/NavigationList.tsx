"use client";
import React, { useState } from 'react';

type Props = {
    navElements: string[]
}

const NavigationList = ({ navElements }: Props) => {
    const [active, setActive] = useState("Events")
    return (
        <ul className="flex gap-4">
            {navElements.map(navElement => {
                return (
                    <li
                        onClick={() => setActive(navElement)}
                        className={`${active == navElement && 'active border-b-[3px] border-b-dark-gray'} text-dark-gray px-3 pb-4 cursor-pointer`}
                    >
                        {navElement}
                    </li>
                )

            })}
        </ul>)

}
export default NavigationList;