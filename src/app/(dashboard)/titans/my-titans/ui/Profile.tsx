
"use client";
import { Button, Input, SubmitButton } from "@/components/ui";
import { editTitanProfile } from "@/lib/services";
import { IUser } from "@/lib/type";
import { getError, profileValidationSchema, stripFormData } from "@/lib/utils";
import { useFormik } from "formik";
import { ChevronRight } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Profile = () => {

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
      const unchangedValues: string[] = [];
      Object.entries(values).forEach(([key, value]) => {
        if (value != session?.user?.[key as keyof IUser] && key != "email") {
          unchangedValues.push(value);
        }
      });
      const response = await editTitanProfile(
        stripFormData(values, unchangedValues)
      );
      update(response);
      setIsEditing(false);
      toast.success("Profile information updated successfully");
    } catch (error) {
      toast.error(getError(error));
    }
  };
  return (
    // <section className="flex flex-1 flex-col">
 
      
    // </section>
      <form
          action={onEdit}
          className="w-full flex flex-wrap justify-between gap-4 gap-x-20"
        >
          {/* <Input
            label="Phone number"
            name="phone"
            id="phone"
            type="text"
            // placeholder="O70 **** ****"
            defaultValue={values.phone}
            labelStyle="text-[#7A7F83]"
            containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
          /> */}
     
     <Input
        label="Phone number"
        name="phone"
        id="phone"
        type="text"
        readOnly
        // onClick={toggleModal}
        labelStyle="text-[#7A7F83]"
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)] cursor-pointer"
        defaultValue={values.phone}
        
      />
          <Input
            label="Email address"
            name="email"
            defaultValue={values.email}
            id="email"
            type="email"
            labelStyle="text-[#7A7F83]"
            readOnly
            containerStyle="flex-[45%] max-w-[MIN(100%,470px)] cursor-pointer"
          />
          <Input
            label="Residential Address"
            name="address"
            id="address"
            type="text"
            value={values?.address}
            labelStyle="text-[#7A7F83]"
            containerStyle="flex-[45%] max-w-[MIN(100%,470px)] cursor-pointer"
          />
    
          <Input
            label="Date Joined"
            name="dateJoined"
            id="dateJoined"
            type="text"
            value={session?.user?.created_at || "N/A"}
            readOnly
            labelStyle="text-[#7A7F83]"
            containerStyle="flex-[45%] max-w-[MIN(100%,470px)] cursor-pointer"
          />
        </form>
  );
};

export default Profile;
  