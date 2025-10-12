import * as yup from "yup";

export const basicInfoSchema = yup.object().shape({
  username: yup.string().required("Username is required").trim(),
  email: yup
    .string()
    .email("Valid email is required")
    .required("Valid email is required")
    .trim(),
});

export type BasicInfoFormData = yup.InferType<typeof basicInfoSchema>;

