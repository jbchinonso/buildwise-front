"use client";

import { Button, Input, SubmitButton } from "@/components/ui";
import { getFormikError } from "@/lib/utils";
import { useFormik } from "formik";
import { useState } from "react";

export const CommissionsForm = () => {
  const [isEditing, setIsEditing] = useState(false);

  const {
    handleBlur,
    handleChange,
    values,
    isValid,
    dirty,
    resetForm,
    handleReset,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      directReferral: "",
      downlineReferral: "",
    },
    // validationSchema: createPropertyPayloadSchema,
    onSubmit: async () => {},
  });

  return (
    <form
      // action={submitForm}
      // onReset={handleReset}
      className="w-full flex flex-wrap supports-[grid]:grid sm:grid-cols-2 justify-between gap-4 gap-x-20"
    >
      <Input
        label="Commission rate on direct referrals"
        name="directReferral"
        id="directReferral"
        placeholder="e.g 5 % property value"
        type="tel"
        value={values.directReferral}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={!isEditing}
        error={getFormikError(touched?.directReferral, errors?.directReferral)}
        labelStyle="text-[#292A2C]"
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
      />
      <Input
        label="Commission rate on referrals' downline"
        name="downlineReferral"
        id="downlineReferral"
        placeholder="e.g 2 % property value"
        type="tel"
        value={values.downlineReferral}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={!isEditing}
        error={getFormikError(
          touched?.downlineReferral,
          errors?.downlineReferral
        )}
        labelStyle="text-[#292A2C]"
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
      />

      <div className="flex gap-4 items-center">
        <Button
          type="button"
          variant={isEditing ? "secondary" : "primary"}
          onClick={() => {
            if (isEditing) {
              resetForm();
            }
            setIsEditing(!isEditing);
          }}
          className="my-4"
        >
          {!isEditing ? "Edit settings" : "Cancel"}
        </Button>

        {isEditing && <SubmitButton>Save settings</SubmitButton>}
      </div>
    </form>
  );
};
