"use client";
import { Button, Input, Modal, SelectScrollable } from "@/components/ui";
import { IPaymentOptions } from "@/lib/type";
import { getError, paymentOptionsSchema } from "@/lib/utils";
import { PlusIcon } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

interface IProps {
  onClose: () => void;
  onSelect?: (data: IPaymentOptions) => void;
  heading?: string;
  options?: IPaymentOptions;
}

const plans = [
  { label: "3 months", value: "3 months" },
  { label: "6 months", value: "6 months" },
  { label: "9 months", value: "9 months" },
  { label: "12 months", value: "12 months" },
];

export const PaymentOptionsModal = ({
  onClose,
  heading = "Price and payment options",
  onSelect,
  options,
}: IProps) => {
  const [paymentPrice, setPaymentPrice] = useState<{
    instantPrice: string | number;
    plans?: Record<string, { duration: string; price: string }> | null;
  }>({
    instantPrice: "",
    plans: null,
  });

  const handleSave = async () => {
    try {
      if (!paymentPrice?.instantPrice) {
        return;
      }
      const result = {
        ...paymentPrice,
        plans: Object.values(paymentPrice?.plans ?? {}),
      };
      
       await paymentOptionsSchema.validate(result, { abortEarly: false });

      onSelect?.({ ...result });

      onClose();
    } catch (error) {
      toast.error(getError(error));
    }
  };

  const canAddNewOption = useMemo(() => {
    if (!paymentPrice?.plans) {
      return true;
    }

    const plans = paymentPrice?.plans ?? {};

    if (!Object.values(plans).every((plan) => plan?.duration && plan?.price)) {
      return false;
    }

    return true;
  }, [paymentPrice]);

  const canSaveOption = useMemo(() => {
    if (paymentPrice?.instantPrice) {
      return paymentPrice?.plans
        ? Object.values(paymentPrice.plans).every(
            (plan) => plan?.duration && plan?.price
          )
        : true;
    }

    return false;

    //NOTE ?? How do I properly display this on the input?
  }, [paymentPrice]);

  const handleAddPaymentOption = () => {
    if (!canAddNewOption) {
      return;
    }

    const plans = paymentPrice?.plans ?? {};
    const planKeys = Object.keys(plans);
    const lastKey = planKeys[planKeys.length];

    setPaymentPrice((prev) => ({
      ...prev,
      plans: {
        ...prev.plans,
        [Date.now()]: {
          duration: "",
          price: "",
        },
      },
    }));
  };

  const handlePlanChange = (key: string | number, plan: any) => {
    setPaymentPrice((prev) => ({
      ...prev,
      plans: {
        ...prev.plans,
        [key]: plan,
      },
    }));
  };

  useEffect(() => {
    setPaymentPrice({
      instantPrice: options?.instantPrice ?? 0,
      plans: (options?.plans ?? []).reduce(
        (acc, cv, i) => ({
          ...acc,
          [Date.now() + i]: cv,
        }),
        {}
      ),
    });
  }, []);

  return (
    <Modal
      handleClose={onClose}
      heading={heading}
      className="max-w-[MIN(531px,100%)] md:max-w-[MIN(531px,100%)]"
    >
      <div className="flex flex-col w-full gap-4 px-6">
        <Input
          id="paymentPrice"
          name="paymentPrice"
          label="Instant payment price"
          placeholder="Enter price"
          type="tel"
          required
          min={0}
          value={paymentPrice?.instantPrice}
          onChange={({ target }) =>
            setPaymentPrice((prev) => ({ ...prev, instantPrice: target.value }))
          }
        />

        {Object.entries(paymentPrice.plans ?? {}).map(([key, plan], index) => (
          <div
            key={index}
            className="flex items-center w-full gap-2 flex-wrap sm:flex-nowrap border-b p-2 rounded"
          >
            <SelectScrollable
              label="Select plan"
              name="plan"
              options={plans}
              placeholder="Select plan"
              labelStyle="text-[#292A2C]"
              className=""
              value={plan.duration}
              onChange={(value) =>
                handlePlanChange(key, { ...plan, duration: value })
              }
            />

            <Input
              label="price"
              placeholder="Enter price"
              name="price"
              className=""
              required
              value={plan.price}
              type="tel"
              min={0}
              onChange={({ target }) =>
                handlePlanChange(key, { ...plan, price: target.value })
              }
            />
          </div>
        ))}

        <button
          type="button"
          disabled={!canAddNewOption}
          onClick={handleAddPaymentOption}
          className="flex items-center justify-center gap-2 my-4 border border-transparent enabled:hover:text-primary-500 enabled:hover:font-medium rounded-full disabled:opacity-100 enabled:hover:border-primary-400 w-fit p-4 m-auto disabled:cursor-not-allowed"
        >
          <span className="flex items-center justify-center p-1 size-6 rounded-full bg-primary-50/50 border">
            <PlusIcon className="text-primary-400" />
          </span>
          <p className="text-[rgba(2,69,51,1)] text-sm">Add Payment Option</p>
        </button>

        <div className="flex w-full gap-4 items-center justify-center">
          <Button
            onClick={onClose}
            type="button"
            variant="secondary"
            size="sm"
            className="w-full"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!canSaveOption}
            type="button"
            size="sm"
            className="w-full"
          >
            Save Price
          </Button>
        </div>
      </div>
    </Modal>
  );
};
