'use client';
import Image from 'next/image';
import * as React from 'react';
import * as ToggleGroup from '@radix-ui/react-toggle-group';

type Props = {
    views:
    {
        text: string,
        icon: string,
        position: string,
    }[]
}

const ViewSwitcher = ({ views }: Props) => {
    return (
        <ToggleGroup.Root
            className="border-card-border border rounded-2 inline-flex overflow-hidden transition"
            type="single"
            defaultValue="left"
            aria-label="Text alignment"
        >
            {views.map((view, index) => (
                <div key={index} className="cursor-pointer flex">
                    <ToggleGroup.Item className="data-[state=on]:bg-white data-[state=on]:shadow-switcher data-[state=on]:pointer-events-none px-3 py-2 inline-flex gap-2 items-center grow transition" value={view.position}>
                        <Image
                            priority
                            src={require(`../../public/assets/icons/${view.icon}.svg`)}
                            alt={`${view.text} icon`}
                            width={15}
                            height={15}
                        />
                    <span className="text-button leading-none mt-[1px]">{view.text}</span>
                    </ToggleGroup.Item>
                </div>
            ))}
        </ToggleGroup.Root>
    )
}

export default ViewSwitcher;