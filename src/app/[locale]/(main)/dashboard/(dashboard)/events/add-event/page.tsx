import { addEvent } from "@/domains/dashboard/action";
import FormEvent from "@/domains/dashboard/components/form-event/form-event";
import { EventData } from "@/models/show/show";
import { User } from "better-auth";

const Page = () => {
  const addEventAction = async ({
    event,
    user,
  }: {
    event: EventData;
    user: User;
  }): Promise<number> => {
    "use server";
    const { status } = await addEvent({ event, user });
    return status;
  };
  return <FormEvent addEvent={addEventAction} />;
};

export default Page;
