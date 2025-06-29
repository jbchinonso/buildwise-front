"use server";
import axios from "axios";
import { authOptions } from "./auth.utils";
import { getServerSession } from "next-auth";

export const baseUrl = axios.create({
  baseURL: process.env.BASE_URL,
  withCredentials: true,
});

baseUrl.interceptors.request.use(
  async (req) => {
    const session = await getServerSession(authOptions);
    const token = session?.token;

    if (token) {
      req.headers.authorization = `Bearer ${token}`;
    }
    return req;
  },
  (err) => {
    if (err.response.status === 404) {
      throw new Error(`${err.config.url} not found`);
    }
    throw err;
  }
);

export default baseUrl;
