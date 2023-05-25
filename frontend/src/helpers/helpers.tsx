type PostProps = {
    endpoint: string
    type: "GET" | "POST"
    body?: Object
    // Session and status should come from a global useSession
    session: any
    status: any
    // ^^Needs the right types
}

export function addLeadingZero(value: number | string) {

    const formattedValue = typeof (value) === 'number' ? value : parseInt(value)

    if (formattedValue < 10) {
        return (("0" + value).slice(-2)).toString()
    }
    return value.toString()
}

export const request = async ({ type, endpoint, session, status, body }: PostProps) => {

    if (status !== "authenticated") {
        return
    }
    console.log({ type, endpoint, session, status, body });
    try {
        const response = await fetch(`http://127.0.0.1:8000${endpoint}`, {
            method: type,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session?.user.access_token}`,
            },
            body: JSON.stringify(
                body
            )
        });
        if (!response.ok) {
            throw new Error("Failed to fetch");
        }
        const data = await response.json();
        console.log(data);
        if (type == "GET") {
            return data
        }

    } catch (error) {
        console.log("hey im an error!!");
        console.error("Error fetching:", error);
    }
}