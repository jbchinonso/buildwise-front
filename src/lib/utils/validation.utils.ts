import * as Yup from "yup";

export const signInValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("*Enter a valid email address")
    .required("*Email is required")
    .trim(),
  password: Yup.string().required("*Password is required"),
});

export const signUpValidationSchema = Yup.object().shape({
  username: Yup.string().required("*Username is required!"),
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
  terms: Yup.bool().required("*You have to accept terms before signup!"),
});