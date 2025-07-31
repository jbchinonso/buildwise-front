"use server"
import { revalidateTag } from "next/cache";
import { baseUrl, getError } from "../utils";
import { authFetch } from "./auth.service";

interface ISalePayload {
  propertyId: string;
  clientId: string;
  agentId: string;
  plotNumber: number | string;
  unitNumber: string;
  plotSize: string;
  amountPaid: number | string;
  price: number | string;
  instalmentDuration?: string;
  paymentPlan: string;
  paymentDate: string;
}

export const createSale = async (sale: ISalePayload) => {
  try {
    const response = await baseUrl.post("/sales", sale);
    revalidateTag("sales");
    return response?.data;
  } catch (error) {
    throw getError(error);
  }
};
