"use server";
import {
  authOptions,
  getError,
  stripFormData,
} from "../utils";
import baseUrl from "../utils/baseUrl.utils";
import { ISignUpData, IUser } from "../type";
import { getServerSession } from "next-auth";
import { revalidateTag } from "next/cache";

export const authFetch = async (url: string, options?: any) => {
  const session = await getServerSession(authOptions);
  const token = session?.token;

  const res = await fetch(`${process.env.BASE_URL}${url}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    ...options,
  });

  if (!res?.ok) {
    const response = await res.json()
    throw new Error(response?.message || "Failed to fetch data!");
  }

  return res.json();
};

export const googleLogin = async (form: any) => {
  try {
    const response = await baseUrl.post("/auth/google/login", form);
    const data = response?.data?.data;
    const token = response?.data?.data?.token;
    const user = response?.data?.data?.data;
    const formattedData: any = {
      token,
      data: stripFormData(user as any, [
        "transactions",
        "payment_links",
        "vendor",
        "last_login",
      ]) as IUser,
    };
    return formattedData;
  } catch (error) {
    // console.log({ error: getError(error) });
    throw new Error(getError(error));
  }
};

// signin
export const login = async (payload: { email: string; password: string }) => {
  try {
    const response = await baseUrl.post("/auth/login", payload);

    return response?.data;
  } catch (error) {
    console.log({ error: getError(error) });
    throw new Error(getError(error));
  }
};

// Forgot password
export const forgotPassword = async (data: {
  email: string;
  baseUrl?: string;
}) => {
  try {
    const response = await baseUrl.post("/auth/forgot-password", data);
    return response?.data;
  } catch (error: any) {
    throw getError(error);
  }
};

// Reset password
export const resetPassword = async (data: {
  newPassword: string;
  token: string | null;
}) => {
  try {
    const response = await baseUrl.post("/auth/reset-password", data);
    return response?.data;
  } catch (error) {
    throw getError(error);
  }
};

export const signUp = async (values: ISignUpData) => {
  try {
    const response = await baseUrl.post("/user/signup", values);
    return response?.data;
  } catch (error) {
    throw getError(error) 
  }
};

// verify email
export const verifyEmail = async (verificationToken: string) => {
  // Your database call logic here
  try {
    const response = await baseUrl.get(
      `/users/verify-email/${verificationToken}`
    );
    revalidateTag("profile");
    return response?.data;
  } catch (error: any) {
    throw getError(error);
  }
};

// get verification email
export const resendVerificationEmail = async (email: string) => {
  try {
    const response = await baseUrl.post(`/users/get-verification-mail`, {
      email,
    });
    const data = response?.data?.data;
    return data;
  } catch (error: any) {
    throw new Error(getError(error));
  }
};

export const verify = async (token: string) => {
  try {
    const response = await baseUrl.post(`/auth/verify/${token}`);
    const data = response?.data;
    return { data };
  } catch (error) {
    return { error: getError(error) };
  }
};

// export const delete = async (token: string) => {
//   try {
//     const response = await baseUrl.post(`/auth/verify/${token}`);
//     const data = response?.data;
//     return { data };
//   } catch (error) {
//     return { error: getError(error) };
//   }
// };

export const resendVerification = async (form: any) => {
  try {
    const response = await baseUrl.post(`/auth/resend-link/`, form);
    const data = response?.data;
    // console.log({ data });
    return { data };
  } catch (error) {
    console.log({ error });
    return { error: getError(error) };
  }
};

export const editTitanProfile = async (form: any) => {
  try {
    const response = await baseUrl.patch("/auth/profile", form);
    return response?.data;
  } catch (error) {
    throw getError(error);
  }
};
