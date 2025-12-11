"use server";

import { revalidateTag, updateTag } from "next/cache";
import { baseUrl, CACHETAGS, getError } from "../utils";
import { authFetch } from "./auth.service";
import { INotification } from "../type";

export const getNotificationSettings = async () => {
  try {
    const response = await authFetch("/user/notification");
  } catch (error) {
    throw getError(error);
  }
};

export const editNotificationSettings = async (form: {
  email?: boolean;
  sms?: boolean;
}) => {
  try {
    await baseUrl.patch("/user/notification", form);

    revalidateTag(CACHETAGS.notifications, "max");
    updateTag(CACHETAGS.notifications);
  } catch (error) {
    throw getError(error);
  }
};

export const createNotification = async (form: {
  title?: string;
  content?: string;
  type?: string;
}) => {
  try {
    await baseUrl.post("/notifications", form);

    revalidateTag(CACHETAGS.notifications, "max");
    updateTag(CACHETAGS.notifications);
  } catch (error) {
    throw getError(error);
  }
};

export const getNotifications = async () => {
  try {
    const response = await authFetch("/notifications", {
      next: {
        tags: ["notifications"],
        revalidate: 8400,
      },
    });

    return response as INotification[];
  } catch (error) {
    throw getError(error);
  }
};

export const getUnreadNotifications = async () => {
  try {
    await authFetch("/notifications/unread", {
      next: {
        tags: ["notifications"],
        revalidate: 8400,
      },
    });
  } catch (error) {
    throw getError(error);
  }
};

export const markNotificationAsRead = async (notificationId: string) => {
  try {
    await baseUrl.put(`/notifications/${notificationId}/read`);

    revalidateTag(CACHETAGS.notifications, "max");
    updateTag(CACHETAGS.notifications);
  } catch (error) {
    console.error(error);
    return { error: getError(error) };
    throw getError(error);
  }
};

export const deleteNotification = async (notificationId: string) => {
  try {
    await baseUrl.delete(`/notifications/${notificationId}`);

    revalidateTag(CACHETAGS.notifications, "max");
    updateTag(CACHETAGS.notifications);
  } catch (error) {
    throw getError(error);
  }
};

export const markAllNotificationAsRead = async () => {
  try {
    await baseUrl.post(`/notifications/read-all`);

    revalidateTag(CACHETAGS.notifications, "max");
    updateTag(CACHETAGS.notifications);
  } catch (error) {
    throw getError(error);
  }
};
