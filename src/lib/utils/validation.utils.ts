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

export const profileValidationSchema = Yup.object().shape({
  firstName: Yup.string().optional(),
  lastName: Yup.string().optional(),
  phone: Yup.string().required("Phone is required"),
  address: Yup.string().required("*Address is required!"),
  state: Yup.string().required("*State is required!"),
  lga: Yup.string().required("*LGA is required!"),
});

export const signInSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .min(1, "Email is required")
    .email("Invalid email"),
  password: Yup.string()
    .required("Password is required")
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

export const resetPasswordSchema = Yup.object().shape({
  token: Yup.string().required("Token is required").min(1, "Token is required"),
  newPassword: Yup.string()
    .required("New Password is required")
    .min(8, "New Password must be more than 8 characters")
    .max(32, "New Password must be less than 32 characters"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref('newPassword')], "Passwords must match")
    .min(8, "Confirm Password must be more than 8 characters")
    .max(32, "Confirm Password must be less than 32 characters"),
});

export const verifySchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .min(1, "Email is required")
    .email("Invalid email"),
  token: Yup.string()
    .required("Token is required")
});