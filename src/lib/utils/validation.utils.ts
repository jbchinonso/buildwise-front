import * as Yup from "yup";

export const signInValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("*Enter a valid email address")
    .required("*Email is required")
    .trim(),
  password: Yup.string().required("*Password is required"),
});

export const signUpValidationSchema = Yup.object().shape({
  firstName: Yup.string().required("*First name is required!"),
  lastName: Yup.string().required("*Last name is required!"),
  address: Yup.string().required("*Address is required!"),
  state: Yup.string().required("*State is required!"),
  lga: Yup.string().required("*LGA is required!"),
  email: Yup.string()
    .email("*Enter a valid email address")
    .required("*Email is required"),
  // .test("unique-email", "Email already exists", async function (value) {
  //   const isEmailUnique = await validateEmail(value);
  //   return (
  //     isEmailUnique || this.createError({ message: "Email already exists" })
  //   );
  // }),

  password: Yup.string()
    .min(6, "*Password must be at least 6 characters")
    .max(120, "*Password is too long!")
    .required("*Enter password"),
  // terms: Yup.bool().required("*You have to accept terms before signup!"),
});

import { object, string } from "zod";

export const signInSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});


export const newsletterSubscribeSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
});

export const resetPasswordSchema = object({
  token: string({ required_error: "Reset password token is required" })
    .min(1, "Reset password token is required"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});


export const verifySchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  otp: string({ required_error: "OTP is required" })
    .min(1, "OTP is required")
    .max(32, "OTP must be less than 32 characters"),
});

export const browserSchema = object({
  address: string().url().min(1, "address is required"),
});
