"use client";

import { Edit2 } from "iconsax-react";
import {
  Button,
  Input,
  Modal,
  SelectScrollable,
  SubmitButton,
} from "@/components/ui";
import { useClientFetch, useModal } from "@/lib/hooks";
import { useFormik } from "formik";
import { getFormikError } from "@/lib/utils";
import { useSession } from "next-auth/react";

export const BankModal = ({
  bankName,
  accountName,
  accountNumber,
}: {
  bankName: string;
  accountNumber: string | number;
  accountName: string | number;
}) => {
  const { data: session } = useSession();
  const { closeModal, isModalOpen, toggleModal } = useModal();

  const { data: banks = [] } = useClientFetch({
    action: async () => {
      return [{ label: "Access Bank PLC", value: "342" }];
    },
    isModalOpen,
  });

  const {
    touched,
    errors,
    handleBlur,
    handleChange,
    values,
    isValid,
    dirty,
    resetForm,
    handleReset,
    setFieldValue,
  } = useFormik({
    initialValues: {
      bankName: "",
      accountNumber: "",
      userId: session?.user?.id,
    },
    // validationSchema: signInValidationSchema,
    onSubmit: async () => {},
  });

  const handleSelect = (name: string, value: any) => {
    setFieldValue(name, value);
  };

  return (
    <>
      <div
        onClick={toggleModal}
        tabIndex={0}
        className="flex-[45%] max-w-[MIN(100%,470px)]"
      >
        <Input
          label="Bank Account"
          type="text"
          defaultValue={`${bankName} - ${accountNumber}`}
          placeholder=""
          autoComplete="off"
          labelStyle="text-[#292A2C]"
          containerStyle="w-full"
          onClick={toggleModal}
          rightIcon={
            <Edit2
              color={"#023729"}
              size={14}
              onClick={toggleModal}
              className="cursor-pointer"
            />
          }
        />
      </div>

      {isModalOpen && (
        <Modal
          heading="Change bank account"
          handleClose={closeModal}
          className="!max-w-[470px]"
        >
          <form action="" className="flex flex-col gap-4">
            <SelectScrollable
              label="Bank"
              name="bank"
              placeholder="Select bank"
              value={values.bankName}
              onChange={(value) => handleSelect("bankName", value)}
              options={banks || []}
              labelStyle="text-[#292A2C]"
              required
              error={getFormikError(touched?.bankName, errors?.bankName)}
            />

            <Input
              label="Account Number"
              name="accountNumber"
              placeholder="Enter account number"
              onChange={handleChange}
              value={values.accountNumber}
              onBlur={handleBlur}
              error={
                touched.accountNumber && errors.accountNumber
                  ? errors.accountNumber
                  : ""
              }
              required
            />
            <Input
              label="Upload ID"
              name="id"
              placeholder="Upload ID"
              onChange={handleChange}
              value={values.accountNumber}
              onBlur={handleBlur}
              error={
                touched.accountNumber && errors.accountNumber
                  ? errors.accountNumber
                  : ""
              }
            />

            <div className="flex w-full justify-end gap-4">
              <Button variant="secondary" size="sm">Cancel</Button>
              <SubmitButton disabled={!isValid} size="sm" className="">
                Submit request
              </SubmitButton>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};
