"use client";
import Image from "next/image";
import * as React from "react";
import * as ToggleGroup from "@radix-ui/react-toggle-group";

type Props = {
  updateView: (value: string) => void,
  views: {
    text: string;
    icon?: string;
    position?: string;
  }[];
};

const ViewSwitcher = ({ views, updateView }: Props) => {
  const [value, setValue] = React.useState('List');
  console.log(value, 'viewswitcher')
  return (
    <ToggleGroup.Root
      className="inline-flex overflow-hidden transition border rounded-2 border-card-border"
      type="single"
      aria-label="Text alignment"
      value={value}
      onValueChange={(value) => {
        if (value) setValue(value);
        updateView(value)
      }}
    >
      {views.map((view, index) => (
        <div key={index} className="flex cursor-pointer">
          <ToggleGroup.Item
            className="inline-flex grow items-center gap-2 px-3 py-2 transition data-[state=on]:pointer-events-none data-[state=on]:bg-white data-[state=on]:shadow-switcher"
            value={view.text}
          >
            {view.icon && (
              <Image
                priority
                src={require(`../../../public/assets/icons/${view.icon}.svg`)}
                alt={`${view.text} icon`}
                width={15}
                height={15}
              />
            )}

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
