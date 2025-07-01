"use client";
import { Button, Input, SubmitButton } from "@/components/ui";
import { editTitanProfile } from "@/lib/services";
import { getError, profileValidationSchema } from "@/lib/utils";
import { useFormik } from "formik";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import toast from "react-hot-toast";

const ProfileForm = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { data: session, update } = useSession();

  const { touched, errors, handleBlur, handleChange, values, isValid, dirty } =
    useFormik({
      initialValues: {
        phone: session?.user?.phone || "",
        email: session?.user?.email || "",
        state: session?.user?.state || "",
        lga: session?.user?.lga || "",
        address: session?.user?.address || "",
      },
      validationSchema: profileValidationSchema,
      onSubmit: async () => {},
    });

  const onEdit = async () => {
    try {
      const response = await editTitanProfile({});
      update(response);
      setIsEditing(false);
      toast.success("Profile information updated successfully");
    } catch (error) {
      toast.error(getError(error));
    }
  };

  return (
    <form
      action={onEdit}
      className="w-full flex flex-wrap justify-between gap-4 gap-x-20"
    >
      <Input
        label="Phone number"
        name="phone"
        id="phone"
        type="text"
        placeholder="O70 **** ****"
        value={values.phone}
        labelStyle="text-[#292A2C]"
        disabled={!isEditing}
        onChange={handleChange}
        onBlur={handleBlur}
        error={
          isEditing && touched?.phone && errors?.phone ? errors?.phone : ""
        }
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
      />
      <Input
        label="Email address"
        name="email"
        id="email"
        type="email"
        defaultValue={values.email}
        placeholder="Example@gmail.com"
        readOnly
        labelStyle="text-[#292A2C]"
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
      />
      <Input
        label="State"
        name="state"
        id="state"
        placeholder="Select state"
        type="text"
        value={values?.state}
        labelStyle="text-[#292A2C]"
        disabled={!isEditing}
        onChange={handleChange}
        onBlur={handleBlur}
        error={
          isEditing && touched?.state && errors?.state ? errors?.state : ""
        }
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
      />
      <Input
        label="LGA"
        name="lga"
        id="lga"
        placeholder="Select Local Government Area"
        type="text"
        value={values?.lga}
        labelStyle="text-[#292A2C]"
        disabled={!isEditing}
        onChange={handleChange}
        onBlur={handleBlur}
        error={isEditing && touched?.lga && errors?.lga ? errors?.lga : ""}
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
      />

      <Input
        label="Residential Address"
        name="address"
        id="address"
        type="text"
        value={values?.address}
        placeholder="Enter client residential address"
        labelStyle="text-[#292A2C]"
        disabled={!isEditing}
        onChange={handleChange}
        onBlur={handleBlur}
        error={
          isEditing && touched?.address && errors?.address
            ? errors?.address
            : ""
        }
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
      />

      <div className="w-full flex my-4 gap-4 items-center">
        {isEditing ? (
          <>
            <Button
              type="button"
              size="sm"
              variant="secondary"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
            <SubmitButton size="sm" disabled={!isEditing || !isValid || !dirty}>
              Save Information
            </SubmitButton>
          </>
        ) : (
          <Button
            type="button"
            size="sm"
            variant="secondary"
            onClick={() => setIsEditing(true)}
          >
            Edit Information
          </Button>
        )}
      </div>
    </form>
  );
};

export default ProfileForm;
