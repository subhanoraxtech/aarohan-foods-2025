import React, { useEffect, useState } from "react";
import { 
  Vibration, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform 
} from "react-native";
import { useDispatch } from "react-redux";
import { useLocalSearchParams, useRouter } from "expo-router";
import { H2, Paragraph, Text, useTheme, XStack, YStack } from "tamagui";

import Header from "@/components/common/Header";
import Button from "@/components/common/Button";
import Icon from "@/components/common/Icon";
import NotificationModal, { NotificationModalType } from "@/components/common/SuccesModal";
import { OtpInput } from "react-native-otp-entry";

import { setUserData } from "@/store/slice/user.slice";
import { getExpoPushTokenSilently } from "@/utils/pushNotification";

import {
  useVerifyOtpMutation,
  useResendOtpMutation,
} from "@/services/auth.service";

export default function OtpScreen() {
  const { phone, otpExpires } = useLocalSearchParams();
  const [otp, setOtp] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [expiresAt, setExpiresAt] = useState(() => Number(otpExpires));
  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    type: NotificationModalType;
    title?: string;
    subtitle?: string;
  }>({
    isOpen: false,
    type: 'error',
    title: '',
    subtitle: '',
  });

  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();

  const [verifyOtpMutation, { isLoading: loading }] = useVerifyOtpMutation();
  const [resendOtpMutation, { isLoading: resendLoading }] = useResendOtpMutation();

  // Timer logic
  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = Date.now();
      const diff = Math.max(Math.floor((expiresAt - now) / 1000), 0);
      setTimeLeft(diff);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [expiresAt]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  const handleOtpChange = (text: string) => {
    if (/^\d*$/.test(text) && text.length <= 4) {
      setOtp(text);
      if (errorMsg) setErrorMsg("");
    }
  };

  const handleOtpVerification = async () => {
    if (otp.length < 4) {
      Vibration.vibrate([100, 100, 100]);
      setErrorMsg("Please enter the complete 4-digit OTP.");
      return;
    }

    setErrorMsg("");

    try {
      // Extract phone - handle array case from useLocalSearchParams
      const phoneNumber = Array.isArray(phone) ? phone[0] : phone;
      
      console.log("=== OTP VERIFICATION START ===");
      console.log("Phone:", phoneNumber);
      
      if (!phoneNumber) {
        console.error("Phone number is missing!");
        setErrorMsg("Phone number is missing. Please try again.");
        return;
      }

      // Get expo token with retries
      console.log("Getting expo token...");
      const expoToken = await getExpoPushTokenSilently();
      
      if (!expoToken) {
        console.error("Failed to get expo token after retries");
        setErrorMsg("Could not register device for notifications. Please check notification permissions and try again.");
        Vibration.vibrate([100, 100, 100]);
        return;
      }
      
      console.log("✓ Expo token retrieved successfully");

      const payload = {
        phone: phoneNumber,
        otp: otp,
        expoToken: expoToken,
   
      };

      console.log("=== CALLING API ===");
      console.log("Payload:", {
        phone: payload.phone,
        otp: payload.otp,
        expoToken: "present",
     
      });

      const response = await verifyOtpMutation(payload).unwrap();

      console.log("=== API SUCCESS ===");
      console.log("User authenticated successfully");

      if (response?.success) {
        setTimeLeft(0);
        dispatch(setUserData(response.data));
        
        // Small delay to ensure state updates
        setTimeout(() => {
          router.replace("/(app)");
        }, 100);
      } 
    } catch (error: any) {
      console.error("=== OTP VERIFICATION ERROR ===");
      console.error("Error:", error);
      console.error("Error data:", error?.data);
      console.error("Error status:", error?.status);
      
      Vibration.vibrate([200, 200, 200]);
      
      let message = "Invalid OTP. Please try again.";
      
      if (error?.data?.message) {
        message = error.data.message;
      } else if (error?.message) {
        message = error.message;
      } else if (error?.status === "FETCH_ERROR") {
        message = "Network error. Please check your connection.";
      } else if (error?.status === 401) {
        message = "Invalid or expired OTP.";
      } else if (error?.status >= 500) {
        message = "Server error. Please try again later.";
      }
      
      setErrorMsg(message);
    }
  };

  const handleResendOtp = async () => {
    if (timeLeft > 0 || resendLoading) {
      Vibration.vibrate(50);
      return;
    }

    const phoneNumber = Array.isArray(phone) ? phone[0] : phone;

    if (!phoneNumber) {
      setErrorMsg("Phone number is missing. Please try again.");
      return;
    }

    setErrorMsg("");

    try {
      console.log("Resending OTP to:", phoneNumber);
      
      const response = await resendOtpMutation({
        phone: phoneNumber,
      }).unwrap();

      const newOtpExpires = response?.data?.otpExpires;
      if (newOtpExpires) {
        setExpiresAt(Number(newOtpExpires));
      } else {
        setExpiresAt(Date.now() + 120000); // 2 minutes default
      }

      setOtp("");
      console.log("OTP resent successfully");
    } catch (error: any) {
      console.error("Resend OTP error:", error);
      Vibration.vibrate([200, 100, 200]);
      
      let message = "Failed to resend OTP. Please try again.";
      
      if (error?.data?.message) {
        message = error.data.message;
      } else if (error?.status === "FETCH_ERROR") {
        message = "Network error. Please check your connection.";
      }
      
      setErrorMsg(message);
    }
  };

  const handleModalClose = () => {
    setModalConfig(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <YStack flex={1} bg="$background">
      <Header title="OTP" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        >
          <YStack flex={1} px="$5" pt="$4" space="$3">
            <H2 fontWeight="bold">Phone Verification</H2>
            <Paragraph color="$gray10" lineHeight={22}>
              Enter the verification code we sent to:{"\n"}
              <Text fontWeight="bold">{phone}</Text>
            </Paragraph>

            <OtpInput
              numberOfDigits={4}
              onTextChange={handleOtpChange}
              focusColor={theme.orange.val}
              theme={{
                containerStyle: { paddingVertical: 20 },
                pinCodeContainerStyle: {
                  width: 65,
                  height: 65,
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: theme.gray8.val,
                  backgroundColor: theme.background.val,
                },
                pinCodeTextStyle: {
                  fontSize: 36,
                  fontWeight: "600",
                  color: theme.color.val,
                },
                focusedPinCodeContainerStyle: {
                  borderWidth: 2,
                  borderColor: theme.orange.val,
                  transform: [{ scale: 1.05 }],
                },
              }}
              autoFocus
              textContentType="oneTimeCode"
            />

            {errorMsg ? (
              <Text color="$red10" fontSize="$4" textAlign="center" mb="$2">
                {errorMsg}
              </Text>
            ) : null}

            <XStack justify="center" items="center" space="$2">
              <Text color="$gray10">Didn't receive code?</Text>
              <Button
                bg="transparent"
                chromeless
                px="$1"
                pressTheme
                disabled={timeLeft > 0 || resendLoading}
                onPress={handleResendOtp}
                style={{
                  opacity: timeLeft > 0 || resendLoading ? 0.4 : 1,
                  pointerEvents: timeLeft > 0 || resendLoading ? "none" : "auto",
                }}
              >
                <Text
                  color={timeLeft > 0 || resendLoading ? "$gray10" : "$orange"}
                  fontWeight="bold"
                >
                  {resendLoading ? "Sending..." : "Resend"}
                </Text>
              </Button>
            </XStack>

            <XStack justify="center" items="center" gap="$2" pt="$2">
              <Icon name="clock" size={16} color={theme.gray10.val} />
              <Text color="$gray10">
                {timeLeft > 0
                  ? `Resend available in ${formatTime(timeLeft)}`
                  : "You can resend now"}
              </Text>
            </XStack>

            <YStack 
              mt="$3" 
              mb="$4" 
              p="$3" 
              bg="$grey6" 
              borderRadius="$4"
              borderWidth={1}
              borderColor="$grey7"
              alignItems="center"
            >
              <Text 
                color="$gray10" 
                fontSize="$3" 
                textAlign="center"
                lineHeight={18}
              >
                A one-time OTP is sent to your WhatsApp
              </Text>
            </YStack>

            <Button
              onPress={handleOtpVerification}
              loading={loading}
              iconAfter={
                <Icon name="arrow-right-long" color="white" type="font-awesome-6" />
              }
            >
              Continue
            </Button>
          </YStack>
        </ScrollView>
      </KeyboardAvoidingView>

      <NotificationModal
        isOpen={modalConfig.isOpen}
        onClose={handleModalClose}
        modalType={modalConfig.type}
        modalTitle={modalConfig.title}
        subTitle={modalConfig.subtitle}
        buttonTitle="OK"
      />
    </YStack>
  );
}