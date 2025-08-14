"use client";
import toast from "react-hot-toast";
import { useMemo } from "react";
import { useFormik } from "formik";
import { Input, SelectScrollable, SubmitButton } from "@/components/ui";
import { useModal } from "@/lib/hooks";
import { addProperty } from "@/lib/services";
import { IState } from "@/lib/type";
import {
  createPropertyPayloadSchema,
  getError,
  getFormikError,
} from "@/lib/utils";
import { PaymentOptionsModal } from "../ui";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

 // NOTE ?? should commission rate be typed in?
const comissionOptions = [
  { label: "5% of property value", value: "5" },
  { label: "10% of property value", value: "10" },
  { label: "15% of property value", value: "15" },
  { label: "20% of property value", value: "20" },
];

export const AddPropertyForm = ({ states = [] }: { states: IState[] }) => {
  const router = useRouter();
  const {
    handleBlur,
    handleChange,
    values,
    isValid,
    dirty,
    resetForm,
    handleReset,
    setFieldValue,
    setFieldTouched,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      name: "",
      state: "",
      lga: "",
      address: "",
      priceOptions: {
        instantPrice: "",
        plans: [],
      },
      documents: "",
      totalUnits: "",
      availableUnits: "",
      saleCommissionRate: "",
    },
    validationSchema: createPropertyPayloadSchema,
    onSubmit: async () => {},
  });

  const handleSelect = (name: string, value: any) => {
    setFieldValue(name, value);
    setFieldTouched(name);
  };

  const {
    openModal: openPaymentOptions,
    closeModal: closePaymentOptions,
    isModalOpen: isPaymentOptionsModalOpen,
  } = useModal();

  const lgas = useMemo(() => {
    const selectedState = states.find((state) => state.name === values.state);

    return (
      selectedState?.lgas.map((lga) => ({
        label: lga,
        value: lga,
      })) ?? []
    );
  }, [values.state]);

  const price = useMemo(() => {
    const prices = `${values.priceOptions?.instantPrice}`;

    return (
      values.priceOptions?.instantPrice && JSON.stringify(values.priceOptions)
    );
    return prices;
  }, [values.priceOptions]);

  const submitForm = async () => {
    try {
      await createPropertyPayloadSchema.validate(values, { abortEarly: false });
      const result = await addProperty({
        ...values,
        // NOTE ?? are we getting an endpoint to fetch document types to select from cc Felix
        documents: [values.documents],
      });
      toast.success("New property successfully added");
      resetForm();

      // NOTE?? should this redirect to the property?

      router.replace(`/admin/properties/all/${result?._id}`);
    } catch (error) {
      toast.error(getError(error));
    }
  };

  return (
    <form
      action={submitForm}
      onReset={handleReset}
      className="w-full flex flex-wrap supports-[grid]:grid sm:grid-cols-2 justify-between gap-4 gap-x-20"
    >
      <Input
        label="Property name"
        name="name"
        id="name"
        placeholder="Enter property name"
        type="text"
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
        error={getFormikError(touched?.name, errors?.name)}
        labelStyle="text-[#292A2C]"
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
      />

      <SelectScrollable
        label="State"
        name="state"
        // id="state"
        placeholder="Select state"
        value={values.state}
        onChange={(value) => handleSelect("state", value)}
        options={states.map((state) => ({
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
        disabled={!values.state}
        placeholder="Select local government"
        labelStyle="text-[#292A2C]"
        error={getFormikError(touched?.lga, errors?.lga)}
        className="flex-[45%] max-w-[MIN(100%,470px)]"
      />
      <Input
        label="Address"
        name="address"
        id="address"
        type="text"
        placeholder="Enter property address"
        error={getFormikError(touched?.address, errors?.address)}
        value={values.address}
        onChange={handleChange}
        onBlur={handleBlur}
        labelStyle="text-[#292A2C]"
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
      />
      <div>
        <Input
          label="Price/Payment options"
          name="priceOptions"
          id="priceOptions"
          placeholder="Select payment options"
          type="text"
          autoComplete="off"
          error={getFormikError(
            touched?.state,
            errors?.priceOptions?.instantPrice ||
              errors?.priceOptions?.plans?.[0]
          )}
          value={price}
          onClick={() => {
            openPaymentOptions();
            setFieldTouched("priceOptions");
          }}
          onChange={handleChange}
          onBlur={handleBlur}
          labelStyle="text-[#292A2C]"
          containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
          rightIcon={<ChevronRight size={20} className="text-zinc-400" />}
        />

        {isPaymentOptionsModalOpen && (
          <PaymentOptionsModal
            onClose={closePaymentOptions}
            options={values.priceOptions}
            onSelect={(value) => {
              handleSelect("priceOptions", value);
            }}
          />
        )}
      </div>
      <Input
        label="Documents"
        name="documents"
        id="documents"
        placeholder="Select available documents"
        type="text"
        value={values.documents}
        onChange={handleChange}
        onBlur={handleBlur}
        error={getFormikError(touched?.documents, errors?.documents)}
        labelStyle="text-[#292A2C]"
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
      />
      <Input
        label="Total Units"
        name="totalUnits"
        id="totalUnits"
        type="text"
        placeholder="Enter number of plots available"
        value={values.totalUnits}
        error={getFormikError(touched?.totalUnits, errors?.totalUnits)}
        onChange={handleChange}
        onBlur={handleBlur}
        required
        labelStyle="text-[#292A2C]"
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
      />
      <Input
        label="Available Units"
        name="availableUnits"
        id="availableUnits"
        type="text"
        required
        error={getFormikError(touched?.availableUnits, errors?.availableUnits)}
        placeholder="Enter number of units available"
        value={values.availableUnits}
        onChange={handleChange}
        onBlur={handleBlur}
        labelStyle="text-[#292A2C]"
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
      />
      <Input
        label="Sales commission rate"
        name="saleCommissionRate"
        id="saleCommissionRate"
        required
        error={getFormikError(touched?.saleCommissionRate, errors?.saleCommissionRate)}
        placeholder="Enter sales commission reate"
        value={values.saleCommissionRate}
        onChange={handleChange}
        onBlur={handleBlur}
        type="tel"
        pattern="(\d+|\d+.\d+)"
        labelStyle="text-[#292A2C]"
        containerStyle="flex-[45%] max-w-[MIN(100%,470px)]"
      />
      

      <div className="w-full flex col-span-2">
        <SubmitButton disabled={!dirty || !isValid} size="sm" className="my-4">
          Save Property
        </SubmitButton>
      </div>
    </form>
  );
};
