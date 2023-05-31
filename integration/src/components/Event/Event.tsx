import Modal from "../ui/Modal";
import * as Dialog from "@radix-ui/react-dialog";
import EventSingleView from "./EventSingleView";

export interface EventProps {
  created_at: string;
  endDate: string;
  id: number;
  image?: string;
  location?: string;
  long_description: string;
  price?: number;
  short_description: string;
  startDate: string;
  ticket_quantity: number;
  title: string;
  user_id: number;
  available_tickets: number;
}

function formatDate(date: string) {
  const dateObj = new Date(date);

  return dateObj.toLocaleString("en-us", {
    day: "2-digit",
    weekday: "long",
    month: "short",
  });
}

function Event(props: EventProps) {
  const { endDate, location, short_description, startDate, title } = props;

  const formattedStartDate = formatDate(startDate);
  const formattedEndDate = formatDate(endDate);
  const formattedDate =
    formattedStartDate === formattedEndDate
      ? formattedStartDate
      : `${formattedStartDate} - ${formattedEndDate}`;

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <div className="bg-white border cursor-pointer rounded-sm border-card-border shadow-card md:flex">
          <div
            className="h-[200px] basis-1/2 md:h-auto"
            // style={{
            //   backgroundImage: `url(/images/${event.image_path}.png)`,
            //   backgroundSize: "cover",
            //   backgroundRepeat: "no-repeat",
            //   width: "100%",
            // }}
          />
          <div className="basis-1/2 px-[24px] py-[38px]">
            <h3 className="mb-3 text-h3 text-dark-gray">{title}</h3>
            <p className="mb-6 text-label text-dark-gray-faded">
              {short_description}
            </p>
            <div className="flex flex-wrap gap-3">
              <p className="flex items-center gap-2 text-label text-slate-gray">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                  />
                </svg>
                {formattedDate}
              </p>
              <p className="flex items-center gap-2 text-label text-slate-gray">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {/* {time} */}
              </p>
              <p className="flex items-center gap-2 basis-full text-label text-slate-gray">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
                {location}
              </p>
            </div>
          </div>
        </div>
      </Dialog.Trigger>
      <Modal>
        <EventSingleView props={props} />
      </Modal>
    </Dialog.Root>
  );
}

export default Event;
