import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  useSendOtpMutation,
  useVerifyOtpMutation,
  useResendOtpMutation,
  useLogoutMutation,
} from "@/services/auth.service";
import { User } from "@/types/User";

interface LoginPayload {
  phone: string;
  role?: string;
}

interface VerifyOtpPayload {
  phone: string;
  otp: string;
  expoToken?: string;
  projectId?: string;
}

interface AuthResponseData {
  user: User;
  accessToken: string;
  refreshToken: string;
}

interface AuthResponse {
  success: boolean;
  data: AuthResponseData;
}

interface LogoutPayload {
  expoToken: string;
}

async function storeUserData(data: AuthResponseData) {
  await AsyncStorage.setItem("user", JSON.stringify(data.user));
  await AsyncStorage.setItem("accessToken", data.accessToken);
  await AsyncStorage.setItem("refreshToken", data.refreshToken);
}

export async function clearUserData() {
  await AsyncStorage.removeItem("user");
  await AsyncStorage.removeItem("accessToken");
  await AsyncStorage.removeItem("refreshToken");
}

export function useCurrentUser() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const userData = await AsyncStorage.getItem("user");
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error("Failed to load user:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadUser();
  }, []);

  return {
    data: user,
    isLoading,
  };
}

export function useLogin() {
  const [sendOtp, { isLoading }] = useSendOtpMutation();

  const mutateAsync = async (payload: LoginPayload) => {
    const response = await sendOtp(payload).unwrap();
    return response;
  };

  return {
    mutateAsync,
    isPending: isLoading,
  };
}

export function useVerifyOtp() {
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();

  const mutateAsync = async (payload: VerifyOtpPayload) => {
    const response = await verifyOtp(payload).unwrap();
    if (response.success && response.data) {
      await storeUserData(response.data);
    }
    return response;
  };

  return {
    mutateAsync,
    isPending: isLoading,
  };
}

export function useResendOtp() {
  const [resendOtp, { isLoading }] = useResendOtpMutation();

  const mutateAsync = async (payload: { phone: string }) => {
    const response = await resendOtp(payload).unwrap();
    return response;
  };

  return {
    mutateAsync,
    isPending: isLoading,
  };
}

export function useLogout() {
  const [logout, { isLoading }] = useLogoutMutation();

  const mutateAsync = async (payload: LogoutPayload) => {
    const response = await logout(payload).unwrap();
    await clearUserData();
    return response;
  };

  return {
    mutateAsync,
    isPending: isLoading,
  };
}
