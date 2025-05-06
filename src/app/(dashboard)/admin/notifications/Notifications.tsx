"use client";
import { customFetch } from "@/lib/utils";
import { useEffect, useState } from "react";

async function fetchNotifications() {
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

  const notifications = data?.result ?? [];

  console.log({ notifications });

  return notifications;
}

export default function NotificationListener() {
  const [messages, setMessages] = useState<string[]>([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource("/api/notifications/stream");

    eventSource.onmessage = (event) => {
      console.log({ event });
      const data = JSON.parse(event.data);
      setMessages((prev) => [...prev, data.message]);
    };

    eventSource.onerror = (err) => {
      console.error("SSE error:", err);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  useEffect(() => {
    async function loadNotifications() {
      try {
        const data = await fetchNotifications();
        setNotifications(data);
      } catch (err) {
        console.error(err);
      }
    }

    loadNotifications();

    // Poll for updates every X seconds (adjust as needed)
    const intervalId = setInterval(loadNotifications, 60 * 1000);

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return (
    <div>
      <h2>Server Notifications</h2>
      <ol className="">
        {notifications.map((notification: any, index: number) => (
          <li className="list-decimal list-inside decimal" key={index}>
            {notification?.title}
          </li>
        ))}
      </ol>

      <br />
      <br />
      <br />

      <h2>Live Notifications</h2>
      <ul>
        {messages.map((msg, i) => (
          <li key={i}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}
