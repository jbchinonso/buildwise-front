import { format, formatDistanceToNow } from "date-fns";

export interface ITopSellingData {
  totalSales: number;
  totalRevenue: number;
  propertyDetails: IPropertyData;
  propertyId: string;
}

export interface ITopSellingDTO {
  property: string;
  location: string;
  revenue: number;
  unit_sold: number;
  id: string;
}

export const topSellingPropertiesDTO = (
  data: ITopSellingData[] = []
): ITopSellingDTO[] => {
  return data?.map((property) => ({
    property: property?.propertyDetails?.name ?? "N/A",
    location: property?.propertyDetails?.address ?? "N/A",
    revenue: property?.totalRevenue,
    unit_sold: property?.propertyDetails?.soldUnits,
    id: property?.propertyId ?? "",
  }));
};

export type IRecentlyListedPropertiesData = IPropertyData;

export interface IRecentlyListedDTO {
  property: string;
  location: string;
  date_listed: string;
  id: string;
}

export const recentlyListedPropertiesDTO = (
  data: IRecentlyListedPropertiesData[] = []
): IRecentlyListedDTO[] => {
  return data?.map((property) => ({
    date_listed: property?.createdAt
      ? format(property?.createdAt, "dd MMM, yyyy")
      : "N/A",
    id: property?._id,
    location: property?.address ?? "N/A",
    property: property?.name ?? "N/A",
  }));
};

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
    listed: property?.createdAt
      ? formatDistanceToNow(property?.createdAt) + "ago"
      : "N/A",
  }));
};

export type IPropertyTransactionDTO = {
  id: string;
  date: string;
  amountPaid: string;
  client: string;
  plotNo: number | string;
};

export const propertyTransactionTableDTO = (
  data: IPropertyData[] = []
): IPropertyTransactionDTO[] => {
  return data?.map((property) => ({
    id: property?._id,
    date: property?.name ?? "N/A",
    amountPaid: property?.address ?? "N/A",
    client: property?.name ?? "N/A",
    plotNo: property?.availableUnits,
  }));
};
