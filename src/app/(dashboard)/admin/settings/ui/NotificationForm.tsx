"use client";

import { Input, SubmitButton } from "@/components/ui";
import { createNotification } from "@/lib/services";
import { getError, getFormikError, notificationSchema } from "@/lib/utils";
import { useFormik } from "formik";
import { Send } from "iconsax-react";
import toast from "react-hot-toast";

export const NotificationForm = () => {
  const {
    values,
    handleBlur,
    handleChange,
    errors,
    touched,
    dirty,
    isValid,
    handleReset,
    resetForm,
  } = useFormik({
    initialValues: {
      title: "",
      content: "",
    },
    onSubmit: () => {},
    validationSchema: notificationSchema,
  });

  const submitAction = async () => {
    toast.dismiss();
    try {
      await createNotification(values);
      toast.success("Broadcast created successfully");
      resetForm();
    } catch (error) {
      toast.error(getError(error));
    }
  };

  return (
    <form
      action={submitAction}
      onReset={handleReset}
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
  );
};
