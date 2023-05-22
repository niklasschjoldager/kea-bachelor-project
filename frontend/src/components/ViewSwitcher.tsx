"use client";
import Image from "next/image";
import * as React from "react";
import * as ToggleGroup from "@radix-ui/react-toggle-group";

type Props = {
  views: {
    text: string;
    icon: string;
    position: string;
  }[];
};

const ViewSwitcher = ({ views }: Props) => {
  return (
    <ToggleGroup.Root
      className="inline-flex overflow-hidden transition border rounded-2 border-card-border"
      type="single"
      defaultValue="left"
      aria-label="Text alignment"
    >
      {views.map((view, index) => (
        <div key={index} className="flex cursor-pointer">
          <ToggleGroup.Item
            className="inline-flex grow items-center gap-2 px-3 py-2 transition data-[state=on]:pointer-events-none data-[state=on]:bg-white data-[state=on]:shadow-switcher"
            value={view.position}
          >
            <Image
              priority
              src={require(`../../public/assets/icons/${view.icon}.svg`)}
              alt={`${view.text} icon`}
              width={15}
              height={15}
            />
            <span className="mt-[1px] text-button leading-none">
              {view.text}
            </span>
          </ToggleGroup.Item>
        </div>
      ))}
    </ToggleGroup.Root>
  );
};

export default ViewSwitcher;
