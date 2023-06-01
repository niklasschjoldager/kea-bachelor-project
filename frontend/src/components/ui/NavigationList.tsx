"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {
  navElements: { name: string; href: string }[];
};

const NavigationList = ({ navElements }: Props) => {
  const pathname = usePathname();

  console.log(pathname);

  return (
    <ul className="flex gap-4">
      {navElements.map(({ name, href }) => {
        return (
          <li
            key={name}
            className={`${
              pathname.startsWith(href) &&
              "active border-b-[3px] border-b-dark-gray"
            } cursor-pointer px-3 pb-4 text-dark-gray`}
          >
            <Link href={href}>{name}</Link>
          </li>
        );
      })}
    </ul>
  );
};
export default NavigationList;
