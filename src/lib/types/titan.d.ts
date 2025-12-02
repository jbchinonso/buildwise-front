export interface ITopAgent {
  _id: string;
  titan: string;
  totalRevenue: number;
  totalCommission: number;
  subTitans: number;
}

export interface ITopAgentsResponse {
  statusCode: number;
  message: string;
  data: ITopAgent[];
}

export type TopAgentData = {
  _id: string;
  titan: string;
  totalRevenue: number;
  totalCommission: number;
  subTitans: number;
};

export type CommissionDueData = {
  _id: string;
  titan: string;
  property: string;
  unpaidCommission: number;
};
export interface CommissionsDueResponse {
  statusCode: number;
  message: string;
  data: CommissionDueData[];
}

export interface IUpdatePaymentPayload {
  saleId: string;
  amount: number;
  clientId: string;
}