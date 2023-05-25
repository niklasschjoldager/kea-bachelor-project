"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { request } from "./helpers";

const SiteSelector = () => {
  const [sites, setSites] = useState([]);
  const { data: session, status } = useSession();

  console.log({ session, status });

  useEffect(() => {
    const fetchSites = async () => {
      const response = await request({ type: "GET", endpoint: "/sites", session: session, status: status })
      setSites(response);
    };
    fetchSites();

  }, [status, session]);

  console.log(sites);

};
export default SiteSelector;
