"use client";
import React, { useState } from "react";

type Props = {
  navElements: string[];
};

const NavigationList = ({ navElements }: Props) => {
  const [active, setActive] = useState("Events");
  return (
    <ul className="flex gap-4">
      {navElements.map((navElement) => {
        return (
          <li
            key={navElement}
            onClick={() => setActive(navElement)}
            className={`${
              active == navElement && "active border-b-[3px] border-b-dark-gray"
            } cursor-pointer px-3 pb-4 text-dark-gray`}
          >
            {navElement}
          </li>
        );
      })}
    </ul>
  );
};
export default NavigationList;
