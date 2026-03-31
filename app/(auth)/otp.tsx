import React, { useEffect, useState } from "react";
import { Vibration, ScrollView, KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { OtpInput } from "react-native-otp-entry";
import { useDispatch } from "react-redux";

import { View } from "@/components/ui/View";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import Icon from "@/components/common/Icon";
import Header from "@/components/common/Header";
import SuccessModal from "@/components/common/SuccesModal";

import { useVerifyOtpMutation, useResendOtpMutation } from "@/services/auth.service";
import { setUserData } from "@/store/slice/user.slice";
import { getExpoPushTokenSilently } from "@/utils/pushNotification";
import { theme } from "@/theme";

export default function OtpScreen() {
  const { phone, otpExpires } = useLocalSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const [verifyOtp, { isLoading: verifyLoading }] = useVerifyOtpMutation();
  const [resendOtp, { isLoading: resendLoading }] = useResendOtpMutation();

  const [otp, setOtp] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [timeLeft, setTimeLeft] = useState(() => {
    const expires = Array.isArray(otpExpires) ? otpExpires[0] : otpExpires;
    if (expires) {
      return Math.max(Math.floor((Number(expires) - Date.now()) / 1000), 0);
    }
    return 120;
  });
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorModalMessage, setErrorModalMessage] = useState("");

  const phoneNumber = Array.isArray(phone) ? phone[0] : phone;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  function formatTime(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  }

  function handleOtpChange(text: string) {
    if (/^\d*$/.test(text) && text.length <= 4) {
      setOtp(text);
      if (errorMsg) setErrorMsg("");
    }
  }

  async function handleOtpVerification() {
    if (otp.length < 4) {
      Vibration.vibrate([100, 100, 100]);
      setErrorMsg("Please enter the complete 4-digit OTP.");
      return;
    }

    setErrorMsg("");

    try {
      if (!phoneNumber) {
        setErrorMsg("Phone number is missing. Please try again.");
        return;
      }

      const pushInfo = await getExpoPushTokenSilently();

      const payload: any = {
        phone: phoneNumber,
        otp: otp,
      };

      if (pushInfo?.expoToken) {
        payload.expoToken = pushInfo.expoToken;
        payload.projectId = pushInfo.projectId;
      }

      const response = await verifyOtp(payload).unwrap();

      if (response?.success) {
        dispatch(setUserData(response.data));
        router.replace("/(app)");
      } else {
        setErrorModalMessage("Authentication failed. Please try again.");
        setShowErrorModal(true);
      }
    } catch (error: any) {
      Vibration.vibrate([200, 200, 200]);

      let message = "Invalid OTP. Please try again.";

      if (error?.data?.message) {
        message = error.data.message;
      } else if (error?.message) {
        message = error.message;
      }

      setErrorModalMessage(message);
      setShowErrorModal(true);
    }
  }

  async function handleResendOtp() {
    if (timeLeft > 0 || resendLoading) {
      Vibration.vibrate(50);
      return;
    }

    if (!phoneNumber) {
      setErrorMsg("Phone number is missing. Please try again.");
      return;
    }

    setErrorMsg("");

    try {
      const response = await resendOtp({ phone: phoneNumber }).unwrap();

      if (response?.otpExpires) {
        const diff = Math.floor((Number(response.otpExpires) - Date.now()) / 1000);
        setTimeLeft(Math.max(diff, 0));
      } else {
        setTimeLeft(120);
      }
      setOtp("");
    } catch (error: any) {
      Vibration.vibrate([200, 100, 200]);
      let message = "Failed to resend OTP. Please try again.";

      if (error?.data?.message) {
        message = error.data.message;
      }

      setErrorModalMessage(message);
      setShowErrorModal(true);
    }
  }

  return (
    <View flex bg={theme.colors.background}>
      <Header title="OTP" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View flex p="lg" pt="md" gap="md">
            <Text variant="h2" weight="bold">
              Phone Verification
            </Text>
            <Text variant="body" color="gray10" style={styles.description}>
              Enter the verification code we sent to:{"\n"}
              <Text weight="bold">{phoneNumber}</Text>
            </Text>

            <OtpInput
              numberOfDigits={4}
              onTextChange={handleOtpChange}
              focusColor={theme.colors.orange}
              theme={{
                containerStyle: styles.otpContainer,
                pinCodeContainerStyle: styles.pinCodeContainer,
                pinCodeTextStyle: styles.pinCodeText,
                focusedPinCodeContainerStyle: styles.pinCodeFocused,
              }}
              autoFocus
            />

            {errorMsg && (
              <Text variant="body" color="red1" align="center">
                {errorMsg}
              </Text>
            )}

            <View row center gap="sm" mt="sm">
              <Text variant="caption" color="gray10">
                Didn't receive code?
              </Text>
              <Button
                variant="ghost"
                size="sm"
                disabled={timeLeft > 0 || resendLoading}
                onPress={handleResendOtp}
              >
                {resendLoading ? "Sending..." : "Resend"}
              </Button>
            </View>

            <View row center gap="sm" pt="sm">
              <Icon name="clock" type="feather" size={16} color={theme.colors.gray10} />
              <Text variant="caption" color="gray10">
                {timeLeft > 0
                  ? `Resend available in ${formatTime(timeLeft)}`
                  : "You can resend now"}
              </Text>
            </View>

            <View
              bg="grey6"
              p="md"
              radius="md"
              style={styles.infoBox}
            >
              <Text variant="caption" align="center">
                A one-time OTP is sent to your WhatsApp
              </Text>
            </View>

            <Button
              variant="primary"
              size="lg"
              onPress={handleOtpVerification}
              loading={verifyLoading}
            >
              Continue
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <SuccessModal
        isOpen={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        modalType="error"
        subTitle={errorModalMessage}
        buttonTitle="OK"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  description: {
    lineHeight: 22,
  },
  otpContainer: {
    paddingVertical: 20,
  },
  pinCodeContainer: {
    width: 65,
    height: 65,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.grey8,
    backgroundColor: theme.colors.white,
  },
  pinCodeText: {
    fontSize: 36,
    fontWeight: "600",
    color: theme.colors.text,
  },
  pinCodeFocused: {
    borderWidth: 2,
    borderColor: theme.colors.orange,
    transform: [{ scale: 1.05 }],
  },
  infoBox: {
    borderWidth: 1,
    borderColor: theme.colors.grey7,
    alignItems: "center",
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
});
