"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import ArrowDown from "@/icons/arrow-down-black.svg";
import ArrowRight from "@/icons/arrow-right.svg";
import Check from "@/icons/checkmark.svg";
import * as Select from "@radix-ui/react-select";
import Modal from "./Modal";
import SiteForm from "./SiteForm";

type Props = {
  userId: string;
};

const SiteSelector = ({ userId }: Props) => {
  const [sites, setSites] = useState([]);
  const { data: session, status } = useSession();

  console.log({ session, status });

  useEffect(() => {
    const fetchSites = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/sites`, {
          headers: {
            Authorization: `Bearer ${session?.user.access_token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch sites");
        }
        const data = await response.json();
        setSites(data);
      } catch (error) {
        console.error("Error fetching sites:", error);
      }
    };

    if (status === "authenticated") {
      fetchSites();
    }
  }, [status, session?.user.access_token]);

  console.log(sites);

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
                    value={site.id}
                    key={site.id}
                    className="flex cursor-pointer items-center justify-between truncate px-2 pb-3 text-dark-gray last:pb-0 hover:outline-none focus:outline-none data-[state=checked]:font-semibold"
                  >
                    <Select.ItemText className="text-body">
                      {site.name}
                    </Select.ItemText>
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

              <Modal
                title={"Create a new site"}
                buttonText={"Create a new site"}
                children={<SiteForm />}
                button={
                  <button className="flex items-center justify-between w-full p-2 rounded-2 bg-ghost-white text-dark-gray">
                    Create a new site
                    <Image
                      priority
                      src={ArrowRight}
                      alt="Arrow right"
                      width={15}
                      height={15}
                    />
                  </button>
                }
              />
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
