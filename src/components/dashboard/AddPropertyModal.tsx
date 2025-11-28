"use client";
import { DashboardModal } from "@/components/dashboard";
import { Button, Input, SelectScrollable, SubmitButton } from "@/components/ui";
import { useClientFetch, useModal } from "@/lib/hooks";
import { createSale, getAllProperties, getTitans } from "@/lib/services";
import { IPaymentOptions, IProperty } from "@/lib/type";
import { cn, getError, toAmount } from "@/lib/utils";
import { useFormik } from "formik";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import toast from "react-hot-toast";

export const AddPropertyModal = ({ isMini }: { isMini?: boolean }) => {
  const { isModalOpen, toggleModal, closeModal } = useModal();
  const params = useParams();
  const router = useRouter();

  const { data: properties, isLoading: isFetchingProperties } = useClientFetch({
    action: async () => {
      const { data } = await getAllProperties();

      return (data || [])?.map((property: IProperty) => ({
        label: property?.name,
        value: property?._id,
        priceOptions: property?.priceOptions,
        price: property?.price,
      }));
    },
    isModalOpen,
  });

  const { data: agents, isLoading: isFetchingTitans } = useClientFetch({
    action: async () => {
      const { data } = await getTitans();

      return (data || [])?.map((titan) => ({
        label: `${titan?.titan}`.toUpperCase(),
        value: titan?.id,
      }));
    },
    isModalOpen,
  });

  const {
    handleBlur,
    handleChange,
    values,
    isValid,
    dirty,
    resetForm,
    handleReset,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
  } = useFormik({
    initialValues: {
      propertyId: "",
      agentId: "",
      agentName: "",
      clientId: `${params?.client}`,
      plotNumber: "",
      unitNumber: "",
      plotSize: "",
      amountPaid: "",
      priceOptions: "",
      paymentDate: "",
      instalmentDuration: "",
      paymentPlan: "",
    },
    // validationSchema: signInValidationSchema,
    onSubmit: () => {
      // openModal();
    },
  });

 

  const property = useMemo(
    () =>
      values?.propertyId
        ? properties?.find(
            (
              v: { value?: string; label?: string } & Pick<
                IProperty,
                "_id" | "name" | "priceOptions" | "price"
              >
            ) => v?.value === values?.propertyId
          )
        : {},
    [values?.propertyId]
  );

  const priceOptions = useMemo(() => {
    const options = property?.priceOptions as IPaymentOptions;
    const plans = options?.plans || [];
    const instantPriceString = options?.instantPrice
      ? `(${toAmount(options?.instantPrice)})`
      : "";
    return [
      {
        label: `Full payment ${instantPriceString}`,
        value: `Full payment ${instantPriceString}`,
        data: {
          price: options?.instantPrice,
          instalmentDuration: "0 months",
          paymentPlan: "Full payment",
        },
      },
      ...plans?.map((plan) => ({
        label: `${plan?.duration} (${toAmount(plan?.price)})`,
        value: `${plan?.duration} (${toAmount(plan?.price)})`,
        data: {
          price: plan?.price,
          instalmentDuration: plan?.duration,
          paymentPlan: plan?.duration,
        },
      })),
    ];
  }, [property]);

  const payload = useMemo(() => {
    const pricePlan = priceOptions?.find(
      (plan) => plan.value === values?.priceOptions
    )?.data;

    return {
      propertyId: values?.propertyId,
      agentId: values?.agentId,
      clientId: values?.clientId,
      unitNumber: values?.unitNumber,
      amountPaid: Number(
        String(values?.amountPaid || 0).replace(/\D/gi, "") || 0
      ),
      paymentDate: values?.paymentDate,
      plotNumber: Number(values?.plotNumber || 0),
      plotSize: values?.plotSize || 0,
      price: Number(property?.price || 0),
      instalmentDuration: pricePlan?.instalmentDuration || "",
      paymentPlan: pricePlan?.paymentPlan || "",
    };
  }, [values]);

  const handleSelect = (name: string, value: any) => {
    setFieldValue(name, value);

    // if (name === "agentId") {
    //   const agent = agents?.find((v) => v?.value === value);
    //   setFieldValue("agentName", agent?.label);
    // }
    setFieldTouched(name);
  };

  const submitForm = async () => {
    toast.dismiss();
    try {
      const {error} = await createSale(payload);
      if(error){
        throw new error
      }
      closeModal();
      router.refresh();
      toast.success("Property added to client successfully");
      resetForm();
    } catch (error) {
      toast.error(getError(error));
    }
  };

  useEffect(() => {
    if (!isModalOpen) {
      resetForm();
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (values?.priceOptions?.includes("Full payment")) {
      const options = property?.priceOptions as IPaymentOptions;
      const instantPrice = options?.instantPrice || "";
      setFieldValue("amountPaid", instantPrice);
      setFieldTouched("amountPaid");
    }
  }, [values?.priceOptions]);

  return (
    <>
      <Button
        size="sm"
        onClick={toggleModal}
        variant="secondary"
        className={cn("ml-auto", isMini ? "rounded-full p-4" : "")}
      >
        <Plus size={18} /> {!isMini && <span>Add property</span>}
      </Button>

      {isModalOpen && (
        <DashboardModal
          heading={"Add property"}
          handleClose={closeModal}
          className="sm:max-w-[MIN(90%,520px)]"
        >
          <form
            action={submitForm}
            onReset={handleReset}
            className="flex flex-col flex-1 gap-8 mb-4 w-full"
          >
            <div className="flex flex-col flex-1 gap-4 w-full">
              <SelectScrollable
                label="Property"
                placeholder="Select Property"
                options={properties || []}
                disabled={isFetchingProperties}
                name="propertyId"
                value={values.propertyId}
                onChange={(v) => handleSelect("propertyId", v)}
                labelStyle="text-[#292A2C]"
              />
              <SelectScrollable
                label="Agent"
                placeholder="Select Agent"
                options={agents || []}
                disabled={isFetchingTitans}
                name="agentId"
                value={values.agentId}
                onChange={(v) => handleSelect("agentId", v)}
                labelStyle="text-[#292A2C]"
              />
              <Input
                label="Property units/ plot"
                name="unitNumber"
                id="unitNumber"
                type="text"
                placeholder="e.g 1plot/420sqm"
                value={values.unitNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                labelStyle="text-[#292A2C]"
              />
              <Input
                label="Plot number"
                name="plotNumber"
                id="plotNumber"
                type="tel"
                placeholder="Enter plot number"
                value={values.plotNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                labelStyle="text-[#292A2C]"
              />
              <Input
                label="Plot Size"
                name="plotSize"
                id="plotSize"
                type="text"
                placeholder="e.g 420sqm"
                value={values.plotSize}
                onChange={handleChange}
                onBlur={handleBlur}
                labelStyle="text-[#292A2C]"
              />
              <SelectScrollable
                label="Payment options"
                name="priceOptions"
                placeholder="Select payment options"
                value={values.priceOptions}
                disabled={!values?.propertyId}
                onChange={(v) => handleSelect("priceOptions", v)}
                options={priceOptions ?? []}
                labelStyle="text-[#292A2C]"
                className=""
              />
              <Input
                label="Payment Date"
                name="paymentDate"
                id="paymentDate"
                type="date"
                // placeholder="Enter number of plots available"
                value={values.paymentDate}
                onChange={handleChange}
                onBlur={handleBlur}
                max={new Date().toISOString().split("T")[0]}
                labelStyle="text-[#292A2C]"
                containerStyle="flex-[100%] md:flex-[45%] md:max-w-[MIN(100%,470px)]"
              />

              <Input
                label="Amount paid"
                name="amountPaid"
                id="amountPaid"
                placeholder="Enter amount paid"
                type="text"
                disabled={values?.priceOptions?.includes("Full payment")}
                value={values.amountPaid}
                onChange={handleChange}
                onBlur={handleBlur}
                labelStyle="text-[#292A2C]"
              />
            </div>

            <div className="flex gap-4 mt-auto justify-stretch w-full *:w-full">
              <Button
                onClick={closeModal}
                variant="secondary"
                size="sm"
                className="px-8"
              >
                Cancel
              </Button>
              <SubmitButton size="sm">Add property</SubmitButton>
            </div>
          </form>
        </DashboardModal>
      )}
    </>
  );
};
