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
      <Select.Trigger className="rounded-2 bg-ghost-white py-[6px] px-3 text-dark-gray text-body flex items-center justify-between w-40 truncate group focus:outline-none">
        <Select.Value placeholder="Selected Site" className="" />
        <Select.Icon className="group-aria-expanded:rotate-180 ">
          <Image priority src={ArrowDown} alt="Arrow down" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          align="start"
          position="popper"
          className="overflow-hidden bg-white rounded-2 border-[1px] border-card-border shadow-card w-[275px] will-change-[opacity,transform] data-[side=bottom]:animate-slideUpAndFade"
        >
          <Select.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white cursor-default rotate-180">
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
                    className="text-dark-gray px-2 pb-3 last:pb-0 cursor-pointer flex justify-between items-center hover:outline-none focus:outline-none truncate data-[state=checked]:font-semibold"
                  >
                    <Select.ItemText className="text-body">{site}</Select.ItemText>
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
                className="flex justify-between p-2 text-dark-gray bg-ghost-white rounded-2"
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
          <Select.ScrollDownButton className="flex items-center justify-center h-[25px] bg-white cursor-default">
            <Image priority src={ArrowDown} alt="Arrow down" />
          </Select.ScrollDownButton>
          <Select.Arrow />
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};
export default SiteSelector;
