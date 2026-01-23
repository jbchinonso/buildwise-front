import { DefaultUser, DefaultSession } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

interface IDashboardStatsCardProps {
  title?: string;
  icon?: React.ReactNode | string;
  theme?: string;
  data?: string | number;
  isLoading?: boolean;
  onClick?: () => void;
}

interface IDashboardTileCardProps {
  className?: string;
  data?: any;
  dataClassName?: string;
  dataContainerClassName?: string;
  labelClassName?: string;
  label?: string;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

interface Geo {
  lat: string;
  lng: string;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

interface IPagination {
  page?: number | string;
  limit?: number | string;
  total?: number | string;
  page?: number | string;
  pages?: number | string;
}

interface IPaginationResponse extends IPagination {
  totalPages?: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  pageIndex?: number;
  pageSize?: number;
}

export interface IUser {
  id: string;
  created_at: string;
  updated_at: string;
  firstName?: string;
  lastName?: string;
  full_name?: string;
  email: string;
  phone: string;
  role: "titan" | "admin";
  state: string;
  lga: string;
  address: string;
  branch: string;

  isEmailVerified: boolean;
  is_verified: boolean;
  is_deleted: boolean;
  profile_image: string | null;
  profile_image_cloudinary_id: string | null;

  isAdmin: boolean;
}
declare module "next-auth" {
  interface Session extends DefaultSession {
    token: string;
    user: IUser;
  }

  interface User extends DefaultUser {
    user: IUser;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    user: User;
    token: string;
  }
}

export interface ISignUpData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  state: string;
  lga: string;
  password: string;
  referralCode?: string;
}
export interface INewPassword {
  old_password: string;
  new_password: string;
  confirm_password: string;
}

export interface IVendorSignUpData {
  business_name: string;
  business_category: string;
  has_cac: boolean;
  account_number: string;
  account_name: string;
  bank_name: string;
  bank_code: string;
}
export interface ICompleteProfileData {
  full_name: string;
  phone_number: string;
  // account_number: string;
  // bank_name: string;
}

interface IState {
  name: string;
  lgas: string[];
}

interface IPaymentOptions {
  instantPrice: string | number;
  plans?: {
    duration: string;
    price: string;
  }[];
}

interface ICreatePropertyPayload {
  name: string;
  state: string;
  lga: string;
  address: string;
  totalUnits: number | string;
  availableUnits: number | string;
  saleCommissionRate: number | string;
  documents: string | string[];
  priceOptions?: IPaymentOptions | any;
}

interface IProperty extends ICreatePropertyPayload {
  _id: string;
  price: string;
  sales: [];
  soldUnits?: string;
  createdAt?: string;
  revenue?: string;
  outstandingPayments?: string;
  owners?: string;
  agents?: string;
}

interface IOption {
  value?: string;
  label?: React.ReactNode | string;
}

interface IPropertyClientOwnership {
  agent: {
    name: string;
    email: string;
  };
  client: {
    name: string;
    email: string;
  };
  saleId: string;
  unitDetails: {
    plotNumber: string | number;
    unitNumber: string;
  };
  paymentInfo: {
    amountPaid: string | number;
    totalPrice: string | number;
    outstandingBalance: string | number;
    paymentPlan: string;
    lastPaymentDate: string;
    saleStatus: string;
  };
}

interface IPropertySummary {
  totalUnits: number;
  totalAvailableUnits: number;
  totalReservedUnits: number;
  totalSoldUnits: number;
  closedSales: number;
}

interface IMostAvailableUnits {
  name: string;
  location: string;
  availablePlots: string | number;
  soldPlots: string | number;
  totalReservedAndSold: string | number;
}
interface IRecentlyReservedPropertyData {
  _id: string;
  plotNumber: string | number;
  unitNumber: string;
  amountPaid: string | number;
  price: string | number;
  paymentPlan: string;
  createdAt: string;
  propertyDetails: {
    _id: string;
    name: string;
    address: string;
  };
  clientDetails: {
    _id: string;
    email: string;
  };
  agentDetails: {
    _id: string;
    email: string;
  };
}

interface IClientOverviewRecentCLients {
  name: string;
  agentName: string;
  location: string;
  joinedDate: string;
}

interface IClientOverview {
  totalClients: number;
  activeBuyersCount: number;
  totalPropertiesBoughtOrReserved: number;
  recentClients: IClientOverviewRecentCLients[];
}

interface IClientRecentlyReserved {
  _id: string;
  client: { name: string };
  plotNumber: number;
  unitNumber: string;
  propertyName: string;
  location: { state: string; lga: string };
  dateReserved: string;
}

interface IRecentClients {
  _id: string;
  id: string;
  totalPaid: number;
  outstanding: number;
  clientName: string;
  propertyName: string;
  location: string;
  instalment: string;
  paymentStatus: string;
  status: string;
  properties: string | number;
  propertiesCount: string | number;
  joined: string
}

interface IClientRecentTransactions {
  _id: string;
  totalPaid: number;
  outstanding: number;
  clientName: string;
  propertyName: string;
  location: string;
  instalment: string;
  paymentStatus: string;
  propertiesCount: string | number;
}
interface IClientProperty {
  id?: string;
  plotNumber: number;
  unitNumber: string;
  amountPaid: number;
  saleId: string;
  clientId: string;
  propertyId: string;
  price: number;
  paymentPlan: string;
  instalmentDuration: string;
  propertyName: string;
  state: string;
  lga: string;
  outstandingPayment: number;
  paymentDue: number;
}

interface IClientPaymentData {
  clientName: string;
  units: string;
  amountPaid: number;
  installmentPeriod: {
    start: string;
    end: string;
    duration: string;
  };
  paymentPlan: string;
  amountDue: string | number;
  totalAmount: string | number;
  saleId: string;
  propertyName: string;
  agent: string;
}

interface ITitans {
  id: string;
  titan: string;
  upline: string;
  location: string;
  propertiesSold: number;
  commission: number;
  status: string;
  joined: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  referralCode: string;
  directReferrals: number;
  indirectReferrals: number;
  totalReferrals: number;
  totalEarnings: number;
}
interface ITitanProfile {
  _id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  state: string;
  lga: string;
  role: string;
  parent: string;
  directReferrals: number;
  indirectReferrals: number;
  level: number;
  children: any[];
  earnings: number;
  referralBonus: number;
  isEmailVerified: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
  downlines: any[];
  referralCode: string;
  createdAt: Date;
  updatedAt: Date;
  personalSales: number;
  marketersRecruited: number;
  pendingCommission: number;
  eligibleCommission: number;
  performanceBonus: number;
}

interface IPaymentHistoryTransaction {
  _id: string;
  description: string;
  status: string;
  partialPaymentForSale: boolean;
  date: Date | string;
  createdAt: Date | string;
  updatedAt: Date | string;
  totalPaid: number;
  amountPaid: number;
  outstanding: number;
}

interface IPaymentHistorySales {
  _id: string;
  id: string;
  property: {
    _id: string;
    name: string;
  };
  plotNumber: number;
  unitNumber: string;
  price: string;
  transactions: IPaymentHistoryTransaction[];
  totalPaid: number;
  outstanding: number;
}
interface IPaymentHistoryTransaction {
  saleId: string;
  propertyId: string;
  _id: string;
  date: string | Date;
  amount: number;
  property: string;
  plotNumber: number | string;
  status: string;
}

interface IPaymentHistoryTransactionDTO {
  propertyId: string;
  property: string;
  date: string | Date;
  amount: number;
  plotNumber: number;
  status: string;
  id: string;
}

interface IRecentTitanClient {
  id: string;
  name: string;
  agentName: string;
  location: string;
  joinedDate: string | Date;
}
interface ITitanClientSummary {
  activeBuyers: number;
  closedSales: number;
  properties: number;
  totalClients: number;
}

interface IActiveTitanClient {
  _id: string;
  clientName: string;
  joined: string;
  properties: string;
  status: string;
  payment: string;
}

interface ITitanClosedSales {
  _id: string;
  clientName: string;
  location: string;
  property: string;
  price: string;
  status: string;
}

interface ITitanClosedSalesPiechart {
  closed: number;
  ongoing: number;
  total: number;
  percentage: {
    closed: number;
    ongoing: number;
  };
}

interface IReceipt {
  date: Date | string;
  clientName: string;
  agentName: string;
  propertyName: string;
  plotNumber: number;
  units: string;
  price: number;
  amountDeposited: number;
  totalPaid: number;
  outstanding: number;
  status: string;
  paymentMethod: string;
  installment: string;
}

interface SubTitan {
  id: string;
  name: string;
  profileImage?: string;
  propertiesSold: string | number;
  commissionEarned: string | number;
  joined: string;
}


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

interface IEarningsResponse {
  salesCommissions: { month: number | string; amount: number }[];
  subTitanCommissions: { month: number | string; amount: number }[];
}
interface IEarningsChartData {
  month?: string;
  salesCommission?: number;
  subTitanCommission?: number;
  amount?: number;
}

interface INotification {
  id: string;
  title: string;
  content: string;
  type: string;
  isRead: boolean;
  createdAt: string;
  formattedTime: string;
}

interface ICommissionHistory {
  commissionId: string;
  property: string;
  commission: number;
  status: string;
  datePaid: string | Date;
}

interface ITitanCommission {
  _id: string;
  status: string;
  commissionId: string;
  commissionAmount: number;
  payment: number;
  titanId: string;
  titanName: string;
  clientName: string;
}

interface IBankDetails {
  userId: string;
  bankName: string;
  accountNumber: string;
  isPrimary: boolean;
  status: string;
  oldBankDetails: any;
  requestType?: string;
  _id?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

interface IAddBankPayload {
  userId: string;
  bankName: string;
  accountNumber: string;
  requestType?: string;
}

interface IBankRequest {
  _id: string;
  userId: string;
  bankName: string;
  accountNumber: string;
  isPrimary: string;
  status: string;
  oldBankDetails: any | null;
  requestType: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

interface ITitanSalesTable {
  saleId: string;
  clientId: string;
  clientName: string;
  property: string;
  price: number;
  paid: number;
  outstanding: number;
  commission: number;
}


interface IPropertiesSold {
  _id: string;
  price: string|number;
  buyer: string;
  location: string;
  paymentStatus: string;
  propertyName: string;
  unit: string;
}

interface IRecentSale {
  _id: string;
  price: string | number;
  clientName: string;
  propertyName: string;
  revenue: string | number;
  outstanding: string | number;
  commission: string | number;
}