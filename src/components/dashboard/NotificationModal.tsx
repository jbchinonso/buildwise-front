"use client";
import { useClientFetch, useModal } from "@/lib/hooks";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Modal, Skeleton } from "../ui";
import { formatTodayTime } from "@/lib/utils";
import { getNotifications, markNotificationAsRead } from "@/lib/services";
import { useCallback, useEffect, useMemo, useState } from "react";
import { INotification } from "@/lib/type";

export const NotificationModal = () => {
  const { closeModal, isModalOpen, openModal } = useModal();
  const [notification, setNotification] = useState<INotification | null>();

  const {
    data: notifications,
    isLoading,
    retry,
  } = useClientFetch({
    action: getNotifications,
    isModalOpen,
    autoFetch: true,
  });

  const hasUnread = useMemo(() => {
    return (notifications || []).some(
      (notification) => notification.isRead === false
    );
  }, [notifications]);

  const viewNotification = useCallback(async (notification: INotification) => {
    try {
      setNotification(notification);
      markNotificationAsRead(notification.id);
    } catch (error) {
      console.error("Could not mark notification as read");
    }
  }, []);

  useEffect(() => {
    retry();

    return () => {
      setNotification(null);
    };
  }, []);

  useEffect(() => {
    if (!isModalOpen) {
      setNotification(null);
    }
  }, [isModalOpen]);
  return (
    <>
      <button
        onClick={openModal}
        type="button"
        className="relative flex items-center gap-1 h-fit"
      >
        <span
          data-ui={hasUnread ? "unread" : undefined}
          className="h-[7px] w-[7px] rounded-[50%] bg-zinc-500 data-unread:bg-red-500 absolute top-[6.5px] left-[16.3px]"
        />
        <IoMdNotificationsOutline className="text-[#000] text-[1.6rem] font-semibold" />
      </button>

      {isModalOpen && (
        <Modal
          heading="Notifications"
          handleClose={closeModal}
          className="w-[474px] gap-0 max-w-[MIN(100%,474px)] max-h-[80dvh]"
        >
          {notification ? (
            <div className="flex flex-col gap-1 py-4 p-1 flex-1">
              <p className="font-bold text-[#2F2F2F] capitalize">
                {notification?.title}
              </p>
              <p className="text-sm text-[#6C757D] line-clamp-3">
                {notification?.content}
              </p>

              <div className="flex text-xs my-2 mt-auto items-center gap-4 justify-between">
                <p>{formatTodayTime(notification.createdAt)}</p>
                <button
                  type="button"
                  onClick={() => setNotification(null)}
                  className="text-sm text-primary-400 font-medium"
                >
                  Back
                </button>
              </div>
            </div>
          ) : isLoading ? (
            <div className="flex flex-col gap-2">
              <Skeleton className="h-10" />
              <Skeleton className="h-10" />
              <Skeleton className="h-10" />
            </div>
          ) : (notifications || [])?.length ? (
            <div className="flex flex-col divide-y">
              {(notifications || []).map((notification, index) => (
                <div key={index} className="flex flex-col gap-1 py-4 p-1 ">
                  <p
                    data-ui={!notification?.isRead ? "unread" : undefined}
                    className="font-bold text-[#2F2F2F] capitalize  line-clamp-3  data-unread:before:block relative before:absolute before:right-0 before:top-2 before:rounded-full before:size-2 before:bg-red-700 before:hidden"
                  >
                    {notification?.title}
                  </p>
                  <p
                    data-ui={notification?.isRead ? "unread" : undefined}
                    className="text-sm text-[#6C757D]"
                  >
                    {notification?.content}
                  </p>

                  <div className="flex text-xs my-2 items-center gap-4 justify-between">
                    <p>{formatTodayTime(notification?.createdAt)}</p>
                    <button
                      type="button"
                      onClick={() => viewNotification(notification)}
                      className="text-sm text-primary-400 font-medium"
                    >
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="flex items-center m-auto text-center text-sm text-zinc-500">
              You do not have any notifications at the moment.
            </p>
          )}
        </Modal>
      )}
    </>
  );
};
