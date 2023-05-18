import React from 'react';
import TopNav from '../src/components/TopNav'
import EventsOverview from '../src/components/EventsOverview'
import Modal from '../src/components/Modal'
import EventForm from '../src/components/EventForm'

export default async function Home() {
  const sites = ['My site', 'My other site', 'My third site']
  const navElements = ['Events', 'Integration']

  return (
    <main className="max-w-screen-lg mx-auto mt-[137px] px-4 py-[100px]">
      <TopNav sites={sites} navElements={navElements} />
      <EventsOverview />
      <Modal title={"Create an event"} buttonText={"Create event"} children={<EventForm />} />
      <EventsOverview />
    </main>
  );
}
