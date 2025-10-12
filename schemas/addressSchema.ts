import * as yup from "yup";

export const addressSchema = yup.object().shape({
  isNotListed: yup.boolean().required(),
  apartmentNumber: yup.string().required("Apartment number is required").trim(),
  blockNumber: yup.string().required("Block number is required").trim(),
  apartmentName: yup.string().when("isNotListed", {
    is: true,
    then: (schema) => schema.required("Apartment name is required").trim(),
    otherwise: (schema) => schema.notRequired(),
  }),
  pinCode: yup.string().when("isNotListed", {
    is: true,
    then: (schema) => schema.trim(),
    otherwise: (schema) => schema.notRequired(),
  }),
});
export type AddressFormData = yup.InferType<typeof addressSchema>;
