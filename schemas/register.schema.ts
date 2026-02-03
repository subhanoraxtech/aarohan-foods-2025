import * as yup from "yup";

export const registerSchema = yup.object().shape({
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .test(
      "is-valid-phone",
      "Please enter a valid 10-digit phone number",
      (value) => {
        if (!value) return false;
        return /^[0-9]{10}$/.test(value);
      }
    ),

  acceptedTerms: yup
    .boolean()
    .required("Please accept the Terms and Privacy Policy")
    .oneOf([true], "Please accept the Terms and Privacy Policy"),
});

export type registerFormData = yup.InferType<typeof registerSchema>;
