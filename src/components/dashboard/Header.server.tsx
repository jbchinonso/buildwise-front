import { getNotifications } from "@/lib/services";
import { NotificationModal } from "./NotificationModal";
import { Header } from "./Header";
import { Hamburger } from "../home";

export const HeaderServer = async () => {
  const notifications = await getNotifications();
  return (
    <Header>
      <NotificationModal notifications={notifications} />
      <Hamburger className="bg-accent" />
    </Header>
  );
};
