import Card from "../ui/Card";
import { Order } from '@/app/events/[event_id]/page';
import StatusElement from "../ui/StatusElement";

type Props = {
    orders: Order[]
}

const OrdersList = ({ orders }: Props) => {
    return (
        <Card>
            {orders?.length > 0 ? (
                <table>
                    <tbody>
                        <tr className="text-body border-b border-card-border [&>*]:font-bold [&>*]:pb-6 [&>*]:whitespace-nowrap [&>*]:pr-8 [&>*]:text-left [&>*]:text-dark-gray [&>*]:text-button">
                            <th>Full name</th>
                            <th>Order created</th>
                            <th>Ticket amount</th>
                            <th>Total price</th>
                            <th>Order number</th>
                            <th>Payment state</th>
                        </tr>
                    </tbody>

                    {orders.map((order, i) => {
                        const date = new Date(`${order.created_at}`).toDateString()
                        return (
                            <tbody key={i} className="border-b border-card-border last:border-none">
                                <tr className=" [&>*]:py-4 [&>*]:pr-8 [&>*]:whitespace-nowrap [&>*]:text-button ">
                                    <td>{order.full_name}</td>
                                    <td>{date}</td>
                                    <td>{order.ticket_amount}</td>
                                    <td>{order.total_price} DKK</td>
                                    <td className="text-slate-gray">{order.id}</td>
                                    <td><StatusElement status={order.status} /></td>
                                </tr>
                            </tbody>
                        )
                    })}

                </table>
            ) : (
                <p className="text-center text-slate-gray">No orders yet...</p>
            )}

        </Card>
    )
}

export default OrdersList;