import * as yup from "yup";
import { isValidPhoneNumber } from "react-native-international-phone-number";

export const registerSchema = yup.object().shape({
  phoneNumber: yup
    .string()
    .required("Phone number is required")
    .test(
      "is-valid-phone",
      "Please enter a valid 10-digit phone number",
      (value) => {
        if (!value) return false;
        if (!/^[6-9][0-9]{9}$/.test(value)) return false;
        return isValidPhoneNumber(`+91${value}`, {
          iso2: "in",
          callingCode: "+91",
          name: "India",
        });
      }
    ),

  acceptedTerms: yup
    .boolean()
    .oneOf([true], "Please accept the Terms and Privacy Policy"),
});

export type registerFormData = yup.InferType<typeof registerSchema>;
