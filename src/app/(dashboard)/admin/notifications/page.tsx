import { customFetch } from "@/lib/utils";
import React from "react";
import NotificationListener from "./Notifications";


type Notification = {
  title: string;
  // Add other properties if needed
};

const Notifications =  () => {
  // const data = await customFetch(
  //   "http://localhost:3000/api/notifications?old=true",
  //   {
  //     next: {
  //       tags: ["notifications"],
  //       revalidate: 6400,
  //     },
  //       // cache: "no-store", // optional, prevents caching in dev
  //   }
  // );

   const notifications: Notification[] = /*data?.result ??*/ [];

  
  return (
    <div>
      <h1>Notification</h1>
      <ol className="">
        {notifications.map((notification: any, index: number) => (
          <li className="list-decimal list-inside decimal" key={index}>{notification?.title}</li>
        ))}
      </ol>

      <NotificationListener/>
    </div>
  );
};

export default Notifications;
