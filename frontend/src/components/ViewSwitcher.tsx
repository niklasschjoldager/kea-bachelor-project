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
                <ToggleGroup.Item key={index} className="data-[state=on]:bg-white data-[state=on]:shadow-switcher px-2 py-1 inline-flex gap-2 items-center grow transition" value={view.position}>
                    <Image
                        priority
                        src={require(`../assets/icons/${view.icon}.svg`)}
                        alt={`${view.text} icon`}
                        width={18}
                        height={18}
                    />
                {view.text}
                </ToggleGroup.Item>
            ))}
        </ToggleGroup.Root>
    )
}

export default ViewSwitcher;