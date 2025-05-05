import { customFetch } from "@/lib/utils";
import React from "react";

const Notifications = async () => {
  const data = await customFetch(
    "http://localhost:3000/api/notifications?old=true",
    {
      next: {
        tags: ["notifications"],
        revalidate: 6400,
      },
        // cache: "no-store", // optional, prevents caching in dev
    }
  );

  const notifications = data?.data?.result ?? [];

  return (
    <div>
      <h1>Notification</h1>
      <ol className="">
        {notifications.map((notification: any, index: number) => (
          <li className="decimal list-decimal list-inside" key={index}>{notification?.title}</li>
        ))}
      </ol>
    </div>
  );
};

export default Notifications;
