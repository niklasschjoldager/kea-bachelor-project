"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const SiteSelector = () => {
  const [events, setSites] = useState([]);
  const { data: session, status } = useSession();

  console.log({ session, status });

  useEffect(() => {
    const fetchSites = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/events`, {
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
        console.error("Error fetching events:", error);
      }
    };

    if (status === "authenticated") {
      fetchSites();
    }
  }, [status, session?.user.access_token]);

  console.log(events, 'events');
}

export default SiteSelector;
