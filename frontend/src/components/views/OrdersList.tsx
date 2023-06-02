import Card from "../ui/Card";
import { Order } from "@/app/dashboard/events/[event_id]/page";
import StatusElement from "../ui/StatusElement";

type Props = {
  orders: Order[];
};

const OrdersList = ({ orders }: Props) => {
  return (
    <Card>
      {orders?.length > 0 ? (
        <table>
          <tbody>
            <tr className="border-b border-card-border text-body [&>*]:whitespace-nowrap [&>*]:pb-6 [&>*]:pr-8 [&>*]:text-left [&>*]:text-button [&>*]:font-bold [&>*]:text-dark-gray">
              <th>Full name</th>
              <th>Order created</th>
              <th>Ticket amount</th>
              <th>Total price</th>
              <th>Order number</th>
              <th>Payment state</th>
            </tr>
          </tbody>

          {orders.map((order, i) => {
            const date = new Date(`${order.created_at}`).toDateString();
            return (
              <tbody
                key={i}
                className="border-b border-card-border last:border-none"
              >
                <tr className=" [&>*]:whitespace-nowrap [&>*]:py-4 [&>*]:pr-8 [&>*]:text-button ">
                  <td>{order.full_name}</td>
                  <td>{date}</td>
                  <td>{order.ticket_amount}</td>
                  <td>{order.total_price} DKK</td>
                  <td className="text-slate-gray">{order.id}</td>
                  <td>
                    <StatusElement status={order.status} />
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      ) : (
        <p className="text-center text-slate-gray">No orders yet...</p>
      )}
    </Card>
  );
};

export default OrdersList;
