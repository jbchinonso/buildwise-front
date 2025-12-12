"use server";

import { revalidateTag, updateTag } from "next/cache";
import { baseUrl, CACHETAGS, getError } from "../utils";
import { authFetch } from "./auth.service";
import { IBankDetails } from "../type";

export const getBankList = async () => {
  try {
    const response = await authFetch("/bank/list", {
      next: {
        revalidate: 8400,
        tags: [CACHETAGS.banks],
      },
    });
    const banks = response?.data || [];
    return banks?.map((bank: string) => ({
      label: bank,
      value: bank,
    }));
  } catch (error) {
    return { error: getError(error) };
    throw getError(error);
  }
};

export const getBankDetails = async () => {
  try {
    const response = await authFetch("/bank/detail", {
      next: {
        revalidate: 8400,
        tags: [CACHETAGS.bank],
      },
    });
    return { data: response?.data as IBankDetails[] } 
  } catch (error) {
    return { error: getError(error) };
    throw getError(error);
  }
};

interface IAddBankPayload {
  userId: string;
  bankName: string;
  accountNumber: string;
  requestType?: string;
}

export const addBankDetails = async (payload: IAddBankPayload) => {
  try {
    const response = await baseUrl.post("/bank/add", {
      ...payload,
      requestType: "add",
    });
    revalidateTag(CACHETAGS.bank, "max");
    updateTag(CACHETAGS.bank);
    return response?.data;
  } catch (error) {
    return { error: getError(error) };
    throw getError(error);
  }
};

export const updateBankDetails = async (payload: IAddBankPayload) => {
  try {
    const response = await baseUrl.post("/bank/request-change", payload);
    revalidateTag(CACHETAGS.bank, "max");
    updateTag(CACHETAGS.bank);
    return response?.data;
  } catch (error) {
    return { error: getError(error) };
    throw getError(error);
  }
};
