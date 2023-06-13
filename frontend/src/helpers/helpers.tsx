type PostProps = {
  endpoint: string;
  type: "GET" | "POST" | "DELETE";
  body?: object;
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
    let headers = {}

    if (body instanceof FormData) {
      headers = {
        Authorization: `Bearer ${session?.user.access_token}`,
      }
    } else {
      headers = {
        "Content-Type": 'application/json',
        Authorization: `Bearer ${session?.user.access_token}`,
      }
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_REST_API_URL || "http://127.0.0.1:8000"
      }${endpoint}`,
      {
        method: type,
        headers: headers,
        body: body instanceof FormData ? body : JSON.stringify(body)
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch");
    }
    const data = await response.json();

    return {
      "data": data,
      "response": response
    }

  } catch (error) {
    console.error("Error fetching:", error);
  }
};

export function convertToDate(datetime: string) {
  const date = datetime.split('T')[0]
  const year = date.split('-')[0]
  const month = date.split('-')[1]
  const day = date.split('-')[2]

  return `${day}/${month}/${year}`
}

export function convertToTime(datetime: string) {
  const date = datetime.split('T')[1]
  const hour = date.split(':')[0]
  const minuttes = date.split(':')[1]

  return `${hour}:${minuttes}`
}
