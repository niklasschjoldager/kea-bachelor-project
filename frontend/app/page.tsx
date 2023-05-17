import React from 'react';
import TopNav from '../src/components/TopNav'
import EventsOverview from '../src/components/EventsOverview'

export default async function Home() {
  const sites = ['My site', 'My other site', 'My third site']
  const navElements = ['Events', 'Integration']

  return (
    <main className="max-w-lg mx-auto mt-[137px] p-4 pt-[100px]">
      <TopNav sites={sites} navElements={navElements} />
      <EventsOverview />
    </main>
  );
}
