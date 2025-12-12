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
import { getError, getFormikError } from "@/lib/utils";
import { useSession } from "next-auth/react";
import {
  addBankDetails,
  getBankList,
  updateBankDetails,
} from "@/lib/services/bank.service";
import toast from "react-hot-toast";

export const BankModal = ({ bank }: { bank: any[] }) => {
  const { data: session } = useSession();
  const { closeModal, isModalOpen, toggleModal } = useModal();

  const { data: banks = [], isLoading } = useClientFetch({
    action: getBankList,
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
      bankName: (bank[0]?.bankName as string) || "",
      accountNumber: (bank[0]?.accountNumber as string) || "",
      file: "",
      userId: session?.user?.id || "",
    },
    // validationSchema: signInValidationSchema,
    onSubmit: async () => {},
  });

  const handleSelect = (name: string, value: any) => {
    setFieldValue(name, value);
  };

  const onSubmit = async () => {
    toast.dismiss();
    try {
      await addBankDetails(values);
      resetForm();
      toast.success("Bank added successfully");
      closeModal();
    } catch (error) {
      toast.error(getError(error));
    }
  };

  const onSubmitRequest = async () => {
    toast.dismiss();
    try {
      await updateBankDetails(values);
      resetForm();
      toast.success("Request submitted successfully");
      closeModal();
    } catch (error) {
      toast.error(getError(error));
    }
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
          defaultValue={
            values?.bankName
              ? `${values?.bankName} - ${values?.accountNumber}`
              : "N/A"
          }
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
          <form
            onReset={handleReset}
            action={(bank || [])?.length ? onSubmitRequest : onSubmit}
            className="flex flex-col gap-4"
          >
            <SelectScrollable
              label="Bank"
              name="bank"
              placeholder="Select bank"
              value={values.bankName}
              onChange={(value) => handleSelect("bankName", value)}
              options={banks || []}
              disabled={isLoading}
              labelStyle="text-[#292A2C]"
              required
              error={getFormikError(touched?.bankName, errors?.bankName)}
            />

            <Input
              label="Account Number"
              name="accountNumber"
              placeholder="Enter account number"
              maxLength={10}
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
              type="file"
              placeholder="Upload ID"
              onChange={handleChange}
              value={values.file}
              onBlur={handleBlur}
              error={touched.file && errors.file ? errors.file : ""}
              className="ml-auto text-xs"
            />

            <div className="flex w-full justify-end gap-4">
              <Button variant="secondary" size="sm">
                Cancel
              </Button>
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
