"use client";

import { Button, Input, Modal, SubmitButton } from "@/components/ui";
import { createNotification } from "@/lib/services";
import { getError, getFormikError, notificationSchema } from "@/lib/utils";
import { useFormik } from "formik";
import { Send } from "iconsax-react";
import { useState } from "react";
import toast from "react-hot-toast";

export const NotificationForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    values,
    handleBlur,
    handleChange,
    errors,
    touched,
    dirty,
    isValid,
    handleReset,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues: {
      title: "",
      content: "",
    },
    onSubmit: () => {
      setIsSubmitting(true);
    },
    validationSchema: notificationSchema,
  });

  const submitAction = async () => {
    toast.dismiss();
    try {
      await createNotification(values);
      toast.success("Broadcast created successfully");
      setIsSubmitting(false)
      resetForm();
    } catch (error) {
      toast.error(getError(error));
    }
  };

  return (
    <>
      <form
        onReset={handleReset}
        onSubmit={handleSubmit}
        className="flex flex-col my-10 max-w-[MIN(100%,438px)] gap-4 p-1"
      >
        <p className="font-semibold text-zinc-800">Broadcasts</p>

        <Input
          type="text"
          id="title"
          name="title"
          label="Enter title"
          value={values.title}
          onBlur={handleBlur}
          onChange={handleChange}
          error={getFormikError(touched.title, errors?.title)}
        />
        <Input
          isTextArea
          label="Send a broadcast"
          placeholder="Type your message here."
          id="content"
          name="content"
          value={values.content}
          onBlur={handleBlur}
          rows={5}
          onChange={handleChange}
          error={getFormikError(touched.content, errors?.content)}
        />

        <SubmitButton
          disabled={!dirty || !isValid}
          size="xs"
          className="ml-auto gap-2"
        >
          Send
          <Send size={12} color={"currentColor"} />
        </SubmitButton>
      </form>
      {isSubmitting && (
        <Modal
          className="md:max-w-[440px] max-w-[440px]"
          handleClose={() => setIsSubmitting(false)}
        >
          <form
            action={submitAction}
            className="flex flex-col items-center gap-4 my-4 justify-center"
          >
            <div className="w-14 h-14 bg-[#70F41F24] flex flex-col justify-center items-center rounded-full">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.09 13.59C7.402 13.53 6.704 13.5 6 13.5H5.25C4.05653 13.5 2.91193 13.0259 2.06802 12.182C1.22411 11.3381 0.75 10.1935 0.75 9C0.75 7.80653 1.22411 6.66193 2.06802 5.81802C2.91193 4.97411 4.05653 4.5 5.25 4.5H6C6.704 4.5 7.402 4.47 8.09 4.41M8.09 13.59C8.343 14.552 8.674 15.482 9.075 16.373C9.322 16.923 9.135 17.583 8.612 17.884L7.955 18.264C7.404 18.582 6.695 18.381 6.428 17.803C5.79429 16.432 5.31146 14.9963 4.988 13.521M8.09 13.59C7.69698 12.0917 7.49868 10.549 7.5 9C7.5 7.414 7.705 5.876 8.09 4.41M8.09 13.59C11.1715 13.8541 14.1722 14.7151 16.925 16.125M8.09 4.41C11.1715 4.14592 14.1723 3.28493 16.925 1.875M16.925 16.125C16.807 16.505 16.68 16.879 16.545 17.25M16.925 16.125C17.469 14.3716 17.8092 12.5613 17.939 10.73M16.925 1.875C16.8077 1.49689 16.681 1.12177 16.545 0.75M16.925 1.875C17.469 3.62844 17.8092 5.4387 17.939 7.27M17.939 7.27C18.434 7.683 18.75 8.305 18.75 9C18.75 9.695 18.434 10.317 17.939 10.73M17.939 7.27C18.0211 8.42187 18.0211 9.57813 17.939 10.73"
                  stroke="#024533"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold">Send broadcast?</h2>
            <p className="text-gray-700 text-sm">
              Send broadcast to all titans
            </p>

            <div className="flex items-center mt-4 gap-4 justify-between">
              <Button
                variant="secondary"
                onClick={() => setIsSubmitting(false)}
              >
                Cancel
              </Button>

              <SubmitButton>Send</SubmitButton>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};
