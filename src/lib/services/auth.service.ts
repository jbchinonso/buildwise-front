"use server";
import {
  authOptions,
  formDataToObject,
  getError,
  stripFormData,
} from "../utils";
import baseUrl from "../utils/baseUrl.utils";
import { ISignUpData, IUser } from "../type";
import { getServerSession } from "next-auth";

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
    throw new Error("Failed to fetch data!");
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
export const forgotPassword = async (formData: FormData) => {
  const form = formDataToObject(formData);
  try {
    const { data } = await baseUrl.post("/auth/forgot-password", form);
    return {
      data,
    };
  } catch (error: any) {
    console.log({ error });
    return { error: getError(error) };
  }
};

// Reset password
export const resetPassword = async ({
  confirm_password,
  new_password,
  token,
}: {
  confirm_password: string;
  new_password: string;
  token: string | null;
}) => {
  // const form = formDataToObject(formData);
  try {
    const res = await baseUrl.post(`/auth/reset-password/${token}`, {
      new_password,
      confirm_password,
    });
    const data = res?.data?.data;
    return { data };
  } catch (error) {
    return { error: getError(error) };
  }
};

export const signUp = async (values: ISignUpData) => {
  try {
    const response = await baseUrl.post("/auth/sign-up", values);
    const data = response?.data;
    return { data };
  } catch (error) {
    // console.log({ error });
    return { error: getError(error) };
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
