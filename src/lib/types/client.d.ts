export interface IClientsData {
  _id: string;
  clientId?: string;
  clientName?: string;
  firstName: string;
  lastName: string;
  state: string;
  lga: string;
  agent: [Object];
  properties: [];
  sales: [];
  phoneNumber: string;
  email: string;
  residentialAddress: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export type Client = {
    id: string;
    client: string;
    location: string;
    properties: number;
    last_payment: string;
    payment_status: string;
    outstanding: string;
    joined: string;
  };