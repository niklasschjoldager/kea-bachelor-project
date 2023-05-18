import React from 'react';
import TopNav from '../src/components/TopNav'
import Modal from '../src/components/Modal'
import EventForm from '../src/components/EventForm'

export default async function Home() {
  const sites = ['My site', 'My other site', 'My third site']
  const navElements = ['Events', 'Integration']

  return (
    <main >
      <TopNav sites={sites} navElements={navElements} />
      <Modal title={"Create an event"} buttonText={"Create event"} children={<EventForm />} />
    </main>
  );
}
