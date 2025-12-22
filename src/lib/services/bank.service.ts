"use server";

import { revalidateTag, updateTag } from "next/cache";
import { baseUrl, CACHETAGS, getError } from "../utils";
import { authFetch } from "./auth.service";
import { IAddBankPayload, IBankDetails, IBankRequest } from "../type";

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
    return { data: response?.data as IBankDetails };
  } catch (error) {
    return { error: getError(error) };
    throw getError(error);
  }
};

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

export const getBankRequests = async () => {
  try {
    const response = await authFetch("/bank/requests", {
      next: {
        revalidate: 8400,
        tags: [CACHETAGS.bank],
      },
    });

    return { data: response as IBankRequest[] };
  } catch (error) {
    return { error: getError(error) };
  }
};

export const approveBankRequest = async (id: string) => {
  try {
    const response = await baseUrl.patch(`/bank/approve/${id}`);
    updateTag(CACHETAGS.bank);
    revalidateTag(CACHETAGS.bank, "max");
    return response?.data;
  } catch (error) {
    // return { error: getError(error) };
    throw getError(error);
  }
};

export const declineBankRequest = async (id: string) => {
  try {
    const response = await baseUrl.patch(`/bank/decline/${id}`);
    updateTag(CACHETAGS.bank);
    revalidateTag(CACHETAGS.bank, "max");
    return response?.data;
  } catch (error) {
    // return { error: getError(error) };
    throw getError(error);
  }
};