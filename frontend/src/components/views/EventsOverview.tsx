"use client";
import EventsList from "@/components/common/EventsList";
import ViewSwitcher from "@/components/ui/ViewSwitcher";
import Modal from "@/components/ui/Modal";
import EventForm from "@/components/forms/EventForm";
import Calender from "@/components/calendar/Calendar";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { request } from "../../helpers/helpers";
import Card from "../ui/Card";

const EventsOverview = () => {
  const [events, setEvents] = useState([]);
  const { data: session, status } = useSession();
  const user_id = session?.user.id;

  const [activeView, setActiveView] = useState("List");

  const updateView = (view: string) => {
    setActiveView(view);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await request({
        type: "GET",
        endpoint: `/users/${user_id}/events`,
        session: session,
        status: status,
      });
      setEvents(response?.data);
    };
    fetchEvents();
  }, [status, session, user_id]);

  const views = [
    { text: "List", icon: "list", position: "left" },
    { text: "Calendar", icon: "calendar", position: "right" },
  ];
  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-h1">Events</h1>
        <Modal title={"Create an event"} buttonText={"Create event"}>
          <EventForm />
        </Modal>
      </div>
      {events && events.length > 0 ? (
        <>
          <div className="flex items-end justify-between mb-6">
            <h2 className="leading-none text-h2 text-slate-gray">May</h2>
            <ViewSwitcher views={views} updateView={updateView} />
          </div>
          {activeView === "List" ? (
            <EventsList events={events} />
          ) : (
            events && <Calender events={events} />
          )}
        </>
      ) : (
        <Card>
          <p className="text-center text-slate-gray">No events yet...</p>
        </Card>
      )}
    </>
  );
};

export default EventsOverview;
