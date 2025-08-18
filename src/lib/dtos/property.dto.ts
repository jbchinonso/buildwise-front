import { format, formatDistanceToNow } from "date-fns";
import {
  IPropertyClientOwnership,
  IRecentlyReservedPropertyData,
  IUser,
} from "../type";
import { formatAddress, toAmount } from "../utils";

export interface ITopSellingData {
  totalSales: number;
  totalRevenue: number;
  name: string;
  propertyId: string;
  lga: string;
  state: string;
  unitSold: string | number;
}

export interface ITopSellingDTO {
  name: string;
  location: string;
  revenue: number | string;
  unitSold: number | string;
  id: string;
}

export const topSellingPropertiesDTO = (
  data: ITopSellingData[] = []
): ITopSellingDTO[] => {
  return data?.map((property) => ({
    name: property?.name ?? "N/A",
    location: formatAddress(property?.lga, property?.state) ?? "N/A",
    revenue: toAmount(property?.totalRevenue || 0),
    unitSold: toAmount(property?.unitSold || 0, false),
    id: property?.propertyId ?? "",
  }));
};

export type IRecentlyListedPropertiesData = IPropertyData;

export interface IRecentlyListedDTO {
  property: string;
  location: string;
  lga?: string;
  state?: string;
  date_listed: string;
  id: string;
}

export interface IPropertySale {
  _id: string;
  property: string;
  agent: string;
  client: string;
  plotNumber: number;
  unitNumber: string;
  amountPaid: number;
  price: number;
  paymentPlan: string;
  paymentDate: string;
  saleStatus: string;
  status: string;
  commission: {
    rate: number;
    amount: number;
  };
  isFullyPaid: boolean;
  createdAt: string;
  updatedAt: string;
  lastPaymentDate: string;
  clientDetails: IUser;
  agentDetails: IUser;
}

export interface IPropertyData {
  _id: string;
  name: string;
  address: string;
  totalUnits: number;
  availableUnits: number;
  saleCommissionRate: number;
  documents: string[];
  priceOptions: {
    instantPrice: number;
    plans: {
      duration: string;
      price: string;
    }[];
  };

  sales: IPropertySale[] | string[];
  soldUnits: number;
  createdAt: string;
  updatedAt: string;
}

export type IPropertyTableDTO = {
  id: string;
  property: string;
  location: string;
  available_units: number;
  reserved: number;
  closed: number;
  total_revenue: number;
  outstanding: number;
  listed: string;
};

export const propertyTableDTO = (
  data: IPropertyData[] = []
): IPropertyTableDTO[] => {
  return data?.map((property) => ({
    id: property?._id,
    property: property?.name ?? "N/A",
    location: property?.address ?? "N/A",
    available_units: property?.availableUnits ?? 0,
    reserved: property?.availableUnits,
    closed: property?.soldUnits,
    total_revenue: 0,
    outstanding: 0,
    listed: property?.createdAt,
  }));
};

export type IPropertyTransactionDTO = {
  id: string;
  date: string;
  amountPaid: string | number;
  client: string;
  plotNo: number | string;
};

export const propertyTransactionTableDTO = (
  data: IPropertySale[] = []
): IPropertyTransactionDTO[] => {
  return data?.map((property) => ({
    id: property?._id,
    date: property?.createdAt ?? "N/A",
    amountPaid: property?.amountPaid ?? "N/A",
    client:
      property?.client || property?.clientDetails
        ? `${property?.clientDetails?.lastName} ${property?.clientDetails?.firstName}`
        : "N/A",
    plotNo: property?.plotNumber,
  }));
};

export interface ISoldUnitsDTO {
  id: string;
  client: string;
  unit: string;
  price: string | number;
  paid: string | number;
  outstanding: string | number;
  status: string;
}

export const soldUnitsDTO = (data: IPropertyClientOwnership[]) =>
  data?.map((item) => ({
    id: item?.saleId,
    client: item?.client?.name,
    unit: item?.unitDetails?.unitNumber,
    price: item?.paymentInfo?.totalPrice,
    paid: item?.paymentInfo?.amountPaid,
    outstanding: item?.paymentInfo?.outstandingBalance,
    status: item?.paymentInfo?.saleStatus,
  }));

export interface IPropertyClientOwnershipTable {
  id: string;
  client: string;
  agent: string;
  unit: string;
  paid: string | number;
  outstanding: string | number;
  status: string;
}

export const propertyClientOwnershipDTO = (
  data: IPropertyClientOwnership[] = []
): IPropertyClientOwnershipTable[] =>
  (data || [])?.map((item) => ({
    id: item?.saleId,
    client: item?.client?.name,
    agent: item?.agent?.name,
    unit: item?.unitDetails?.unitNumber,
    paid: item?.paymentInfo?.amountPaid,
    outstanding: item?.paymentInfo?.outstandingBalance,
    status: item?.paymentInfo?.saleStatus,
  }));

export interface IReservedUnitDTO {
  name: string;
  location: string;
  plots: number | string;
  id: string;
}

export const recentlyReservedPropertiesDTO = (
  data: IRecentlyReservedPropertyData[] = []
): IReservedUnitDTO[] => {
  return data?.map((sale) => ({
    name: sale?.propertyDetails?.name ?? "N/A",
    location: sale?.propertyDetails?.address ?? "N/A",
    plots: sale?.unitNumber, //toAmount(property?.unitSold || 0, false),
    id: sale?._id ?? "",
    date: sale?.createdAt || "",
  }));
};
