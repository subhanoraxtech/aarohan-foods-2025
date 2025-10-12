import Toast, { ToastType } from "react-native-toast-message";

type ShowToastParams = { message: string; type?: ToastType } | string;

export const showToast = (params: ShowToastParams): void => {
  if (typeof params === "string") Toast.show({ type: "success", text1: params });
  else {
    const { message, type = "error" } = params;
    Toast.show({ type, text1: message });
  }
};

