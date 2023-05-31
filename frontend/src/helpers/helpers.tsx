import { useState } from "react";

type PostProps = {
  endpoint: string;
  type: "GET" | "POST" | "DELETE";
  body?: object;
  // Session and status should come from a global useSession
  session: any;
  status: any;
};

export function addLeadingZero(value: number | string) {
  const formattedValue = typeof value === "number" ? value : parseInt(value);

  if (formattedValue < 10) {
    return ("0" + value).slice(-2).toString();
  }
  return value.toString();
}

export const request = async ({
  type,
  endpoint,
  session,
  status,
  body
}: PostProps) => {
  if (status !== "authenticated") {
    return;
  }

  try {
    // set contentType dynamically
    const ContentType = 'multipart/form-data'

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_REST_API_URL || "http://127.0.0.1:8000"
      }${endpoint}`,
      {
        method: type,
        headers: {
          "Content-Type": ContentType,
          Authorization: `Bearer ${session?.user.access_token}`,
        },
        body: JSON.stringify(body)
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch");
    }
    const data = await response.json();
    console.log(body, 'data')

    return {
      "data": data,
      "response": response
    }


  } catch (error) {
    console.error("Error fetching:", error);
  }
};

export function convertToDate(datetime: string){
  const date = datetime.split('T')[0]
  const year = date.split('-')[0]
  const month = date.split('-')[1]
  const day = date.split('-')[2]

  return `${day}/${month}/${year}`
}

export function convertToTime(datetime: string){
  const date = datetime.split('T')[1]
  const hour = date.split(':')[0]
  const minuttes = date.split(':')[1]

  return `${hour}:${minuttes}`
}
