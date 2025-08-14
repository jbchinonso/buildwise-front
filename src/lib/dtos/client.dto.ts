import { IOption, IPropertyClientOwnership } from "../type";
import { Client, IClientsData } from "../types/client";
import { formatDistanceToNow } from "date-fns";

export const clientTableDTO = (data: IClientsData[]): Client[] =>
  data?.map((client) => ({
    id: client?._id,
    client: `${client?.lastName || ""} ${client?.firstName || ""}`,
    joined: client?.createdAt
      ? formatDistanceToNow(client?.createdAt) + " ago"
      : "N/A",
    last_payment: "N/A",
    location: `${client?.lga || ""}${
      client?.state ? ", " + client?.state : ""
    }`,
    payment_status: "N/A",
    outstanding: "N/A",
    properties: client?.properties?.length,
  }));

interface IClientProfile {
  phone_number: string;
  firstName: string;
  fullname?: string;
  lastName: string;
  email: string;
  state: string;
  lga: string;
  residential_address: string;
  id: string;
}

export const clientProfileDTO = (client: IClientsData): IClientProfile => ({
  id: client?._id,
  firstName: client?.firstName ?? "N/A",
  lastName: client?.lastName ?? "N/A",
  fullname: `${client?.firstName || ""} ${client?.lastName || ""}`.trim(),
  email: client?.email ?? "N/A",
  state: client?.state,
  lga: client?.lga,
  residential_address: client?.residentialAddress,
  phone_number: client?.phoneNumber,
});

export const clientSelectDTO = (data: IClientsData[]): IOption[] =>
  data?.map((client) => ({
    value: client?._id,
    label: `${client?.firstName || ""} ${client?.lastName || ""}`.trim(),
  }));

