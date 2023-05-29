'use client';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation"
import { request } from '@/src/helpers/helpers';
import TopNav from "@/components/common/TopNav";
import OrdersList from "@/components/views/OrdersList"
import Button from '@/components/ui/Button';

type Event = {
    id: number
    short_description: string
    long_description: string
    startDate: string
    created_at: string
    ticket_quantity: number
    title: string
    price: number
    image: string
    endDate: string
    location: string
    user_id: number
}

type Endpoint = {
    setter: "setEvent" | "setOrders"
    url: string
}

export type Order = {
    id: number;
    phone_number: string
    status: string
    email: string
    full_name: string
    created_at: number
    event_id: number
    ticket_amount: number
    total_price: number
}

export default function Orders() {
    const params = useParams();
    const event_id = params.event_id;
    const { data: session, status } = useSession();
    const user_id = session?.user.id;
    const router = useRouter()

    const [event, setEvent] = useState<Event | null>(null);
    const [orders, setOrders] = useState<Order[]>([])

    useEffect(() => {
        const endpoints: Endpoint[] = [
            { "setter": "setEvent", "url": `/users/${user_id}/events/${event_id}` },
            { "setter": "setOrders", "url": `/events/${event_id}/orders` },
        ]
        const fetchData = async (endpoints: Endpoint[]) => {
            endpoints.forEach(async endpoint => {
                const response = await request({ type: "GET", endpoint: endpoint.url, session: session, status: status })
                console.log("response", response)
                switch (endpoint.setter) {
                    case "setEvent":
                        setEvent(response?.data);
                        break;

                    case "setOrders":
                        setOrders(response?.data)
                        break;
                }
            });
        };

        fetchData(endpoints);

    }, [status, session, event_id, user_id]);

    console.log(event, "event");
    console.log(orders, "orders");

    const deleteEvent = async () => {
        const response = await request({ type: "DELETE", endpoint: `/events/${event_id}`, session: session, status: status })
        if (response?.response.ok) { router.push("/events") }
    }

    return (
        <main>
            <TopNav />
            <div className="mx-auto max-w-screen-lg px-4 py-[100px]">
                {event ?
                    (
                        <>
                            <div className='flex flex-col md:flex-row justify-between mb-9'>
                                <h1 className='text-h1 pb-3 md:pb-0'>{event.title}</h1>
                                <div className='flex gap-3'>
                                    <Button buttonText={'Delete event'} onClick={() => deleteEvent()} />
                                    <Button buttonText={'Update event'} />
                                </div>
                            </div>
                            <h2 className='text-h2 mb-4 text-slate-gray'>Orders</h2>
                            <OrdersList orders={orders} />
                        </>
                    ) : (
                        <p>
                            Loading...
                        </p>)
                }
            </div>
        </main>
    )
}
