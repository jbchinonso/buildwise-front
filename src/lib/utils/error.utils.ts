import { AxiosError } from "axios";

export const getError = (
  error: any,
  defaultMessage = "An unexpected error occurred. Please try again later."
) => {
  if (typeof error === "string") {
    return error;
  } else if (error instanceof AxiosError) {
    const axiosError = error as AxiosError;
    if (axiosError.response === undefined) {
      return "Network error. Please check your internet connection and try again.";
    }
    const { response } = axiosError;
    if (response?.data) {
      const { message } = response.data as { message: any };

      if (typeof message === "string") {
        return message;
      }
      if (Array.isArray(message)) {
        return message[0];
      }
    }
    if (response.status === 401) {
      return "Authentication failed. Please check your email and password.";
    } else if (response.status === 404) {
      return "Resource not found. Please try again later.";
    } else {
      return defaultMessage;
    }
  } else if (error?.message) {
    return error?.message;
  } else {
    return defaultMessage;
  }
};

export const getFormikError = (touched?: any, error?: string) => {
  return Boolean(touched) && error ? error : "";
};
