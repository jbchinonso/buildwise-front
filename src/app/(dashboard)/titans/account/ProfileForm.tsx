"use client";
import { Button, Input, SelectScrollable, SubmitButton } from "@/components/ui";
import { useClientFetch } from "@/lib/hooks";
import { editTitanProfile, getStates } from "@/lib/services";
import { ITitanProfile, IUser } from "@/lib/type";
import {
  getError,
  getFormikError,
  profileValidationSchema,
  stripFormData,
} from "@/lib/utils";
import { useFormik } from "formik";
import { Edit2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";

const ProfileForm = ({ profile }: { profile?: ITitanProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { update } = useSession();

  const { data: states = [], isLoading } = useClientFetch({
    action: getStates,
    isModalOpen: true,
  });

  const {
    touched,
    errors,
    handleBlur,
    handleChange,
    values,
    isValid,
    dirty,
    setFieldValue,
    resetForm,
    handleReset,
  } = useFormik({
    initialValues: {
      phone: profile?.phone ?? "",
      email: profile?.email ?? "",
      state: profile?.state ?? "",
      lga: profile?.lga ?? "",
      address: profile?.address ?? "",
      branch: "",
    },
    validationSchema: profileValidationSchema,
    onSubmit: async () => {},
  });

  const lgas = useMemo(() => {
    const selectedState = states?.find((state) => state.name === values.state);

    return (
      selectedState?.lgas.map((lga) => ({
        label: lga,
        value: lga,
      })) ?? []
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.state]);

  const handleSelect = (name: string, value: any) => {
    setFieldValue(name, value);
  };

  const onEdit = async () => {
    try {
      const unchangedValues: string[] = [];
      Object.entries(values).forEach(([key, value]) => {
        if (value != profile?.[key as keyof ITitanProfile] && key != "email") {
          // if (
          //   key === "lga" &&
          //   typeof value != "string" &&
          //   value?.value != profile?.[key as keyof ITitanProfile]
          // ) {
          //  return unchangedValues.push(key);
          // }
          unchangedValues.push(key);
        }
      });
      const response = await editTitanProfile(
        stripFormData(values, unchangedValues),
      );
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
      onReset={handleReset}
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
        placeholder="example@gmail.com"
        readOnly
        labelStyle="text-[#292A2C]"
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
      />

      <SelectScrollable
        label="State"
        name="state"
        disabled={isLoading || !isEditing}
        placeholder="Select state"
        value={values.state}
        onChange={(value) => handleSelect("state", value)}
        options={(states || [])?.map((state) => ({
          label: state.name,
          value: state.name,
        }))}
        labelStyle="text-[#292A2C]"
        className="flex-[45%] max-w-[MIN(100%,470px)]"
        error={getFormikError(touched?.state, errors?.state)}
      />
      <SelectScrollable
        label="LGA"
        name="lga"
        options={lgas}
        value={values.lga}
        onChange={(value) => handleSelect("lga", value)}
        disabled={!values.state || !isEditing}
        placeholder="Select local government"
        labelStyle="text-[#292A2C]"
        error={getFormikError(touched?.lga, errors?.lga)}
        className="flex-[45%] max-w-[MIN(100%,470px)]"
        defaultValue={profile?.lga}
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
      <Input
        label="Affiliate Branch"
        name="branch"
        id="branch"
        type="text"
        value={values?.branch}
        placeholder="Alliate Branch"
        labelStyle="text-[#292A2C]"
        disabled={!isEditing}
        onChange={handleChange}
        onBlur={handleBlur}
        error={
          isEditing && touched?.branch && errors?.branch ? errors?.branch : ""
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
              onClick={() => {
                setIsEditing(false);
                resetForm();
              }}
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
            <Edit2 size={14} color="currentColor" className="mx-1" /> Edit
            Information
          </Button>
        )}
      </div>
    </form>
  );
};

export default ProfileForm;
