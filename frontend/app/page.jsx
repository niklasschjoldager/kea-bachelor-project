import React from 'react';
import TopNav from '../src/components/TopNav'




export default async function Home() {
  const sites = ['My site', 'My other site', 'My third site']
  const navElements = ['Events', 'Integration']

  return (
    <main >
      <TopNav sites={sites} navElements={navElements} />
    </main>
  );
}
