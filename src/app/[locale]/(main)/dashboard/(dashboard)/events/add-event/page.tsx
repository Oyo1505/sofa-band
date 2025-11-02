import { addEvent } from "@/domains/dashboard/action";
import FormEvent from "@/domains/dashboard/components/form-event/form-event";
import { TEventData } from "@/models/show/show";
import { User } from "better-auth";

const Page = () => {
  const addEventAction = async ({
    event,
    user,
  }: {
    event: TEventData;
    user: User;
  }): Promise<{ event?: TEventData | null; status: number; error?: string }> => {
    "use server";
    const result = await addEvent({ event, user });
    return result;
  };
  return <FormEvent addEvent={addEventAction} />;
};

export default Page;
