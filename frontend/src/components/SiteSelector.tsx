"use client";
import React from "react";
import Image from "next/image";
import ArrowDown from "@/icons/arrow-down-black.svg";
import ArrowRight from "@/icons/arrow-right.svg";
import Check from "@/icons/checkmark.svg";
import * as Select from "@radix-ui/react-select";

type Props = {
  sites: string[];
};

const SiteSelector = ({ sites }: Props) => {
  return (
    <Select.Root>
      <Select.Trigger className="group flex w-40 items-center justify-between truncate rounded-2 bg-ghost-white px-3 py-[6px] text-body text-dark-gray focus:outline-none">
        <Select.Value placeholder="Selected Site" className="" />
        <Select.Icon className="group-aria-expanded:rotate-180 ">
          <Image priority src={ArrowDown} alt="Arrow down" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          align="start"
          position="popper"
          className="w-[275px] overflow-hidden rounded-2 border-[1px] border-card-border bg-white shadow-card will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade"
        >
          <Select.ScrollUpButton className="flex h-[25px] rotate-180 cursor-default items-center justify-center bg-white">
            <Image priority src={ArrowDown} alt="Arrow down" />
          </Select.ScrollUpButton>
          <Select.Viewport>
            <Select.Group className="px-2 py-3">
              <Select.Label className="px-2 py-0 pb-3 text-label text-dark-gray opacity-60 last:pb-0">
                Sites
              </Select.Label>
              {sites.map((site) => {
                return (
                  <Select.Item
                    value={site}
                    key={site}
                    className="flex cursor-pointer items-center justify-between truncate px-2 pb-3 text-dark-gray last:pb-0 hover:outline-none focus:outline-none data-[state=checked]:font-semibold"
                  >
                    <Select.ItemText>{site}</Select.ItemText>
                    <Select.ItemIndicator>
                      <Image
                        priority
                        src={Check}
                        alt="Check"
                        width={13}
                        height={13}
                      />
                    </Select.ItemIndicator>
                  </Select.Item>
                );
              })}
              <a
                href="#"
                className="flex justify-between p-2 rounded-2 bg-ghost-white text-dark-gray"
              >
                Create a new site
                <Image
                  priority
                  src={ArrowRight}
                  alt="Arrow right"
                  width={15}
                  height={15}
                />
              </a>
            </Select.Group>

            <Select.Separator />
          </Select.Viewport>
          <Select.ScrollDownButton className="flex h-[25px] cursor-default items-center justify-center bg-white">
            <Image priority src={ArrowDown} alt="Arrow down" />
          </Select.ScrollDownButton>
          <Select.Arrow />
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};
export default SiteSelector;
