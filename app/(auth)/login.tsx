import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Image,
  KeyboardAvoidingView,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import Icon from "@/components/common/Icon";
import SuccessModal from "@/components/common/SuccesModal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Text } from "@/components/ui/Text";
import { View } from "@/components/ui/View";

import { useSendOtpMutation } from "@/services/auth.service";
import { registerFormData, registerSchema } from "@/schemas/register.schema";
import { theme } from "@/theme";

export default function LoginScreen() {
  const router = useRouter();
  const [sendOtp, { isLoading }] = useSendOtpMutation();

  const [loading, setLoading] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const selectedCountry = {
    iso2: "in",
    callingCode: "+91",
    name: "India",
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<registerFormData>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      phoneNumber: "",
      acceptedTerms: false,
    },
    mode: "onChange",
  });

  const acceptedTerms = watch("acceptedTerms");

  async function onFormSubmit(data: registerFormData) {
    setLoading(true);
    try {
      const fullPhoneNumber = `+91${data.phoneNumber}`;
      const response = await sendOtp({
        phone: fullPhoneNumber,
      }).unwrap();

      console.log("fullPhoneNumber", fullPhoneNumber);
      console.log("Login API Response:", JSON.stringify(response, null, 2));

      // RTK Query returns data directly after unwrap
      if (response?.success) {
        router.push({
          pathname: "/otp",
          params: {
            phone: fullPhoneNumber,
            otpExpires: response?.otpExpires,
          },
        });
        reset();
      } else if (response?.error) {
        const errorData = response?.error?.data;
        const errorMessage = errorData?.message || "An error occurred";
        setErrorMessage(errorMessage);
        setShowErrorModal(true);
      }
    } catch (err: any) {
      console.log("Login API Error:", err);
      const errorMessage = err?.data?.message || err?.message || "Network error occurred";
      setErrorMessage(errorMessage);
      setShowErrorModal(true);
    } finally {
      setLoading(false);
    }
  }

  function handleLinkPress(url: string) {
    Linking.openURL(url).catch((err) => {
      console.error("Failed to open URL:", err);
    });
  }

  function handleModalClose() {
    setShowErrorModal(false);
    setErrorMessage("");
  }

  return (
    <View flex bg="white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View p="xl" style={styles.container}>
            <View style={styles.logoContainer}>
              <Image
                source={require("@/assets/images/logo.png")}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>

            <View gap="lg" mb="lg">
              <Text variant="h1" weight="bold" style={styles.title}>
                Login to your account.
              </Text>
              <Text variant="body" color="gray10">
                Please sign in to your account
              </Text>
            </View>

            <View gap="md" mb="xl">
              <Controller
                control={control}
                name="phoneNumber"
                render={({ field: { onChange, value } }) => (
                  <Input
                    placeholder="Enter WhatsApp Number"
                    label="Phone Number"
                    value={value}
                    onChangeText={onChange}
                    keyboardType="numeric"
                    prefix={selectedCountry.callingCode}
                    error={errors.phoneNumber?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="acceptedTerms"
                render={({ field: { onChange, value } }) => (
                  <View gap="sm">
                    <View row center gap="sm" px="md">
                      <TouchableOpacity
                        onPress={() => onChange(!value)}
                        style={[
                          styles.checkbox,
                          value && styles.checkboxChecked,
                        ]}
                      >
                        {value && (
                          <Icon
                            name="check"
                            type="feather"
                            size={16}
                            color="white"
                          />
                        )}
                      </TouchableOpacity>

                      <View style={styles.termsContainer}>
                        <View row center>
                          <Text variant="caption">
                            {" "}
                            By proceeding, I agree to{" "}
                          </Text>
                          <TouchableOpacity
                            onPress={() =>
                              router.push("/(auth)/terms-conditions")
                            }
                          >
                            <Text
                              variant="caption"
                              weight="semibold"
                              color="orange"
                            >
                              terms and conditions &
                            </Text>
                          </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                          onPress={() => router.push("/(auth)/privacy-policy")}
                        >
                          <Text
                            variant="caption"
                            weight="semibold"
                            color="orange"
                          >
                            privacy policy
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>

                    {errors.acceptedTerms && (
                      <Text
                        variant="caption"
                        color="red1"
                        style={styles.errorText}
                      >
                        {errors.acceptedTerms.message}
                      </Text>
                    )}
                  </View>
                )}
              />
            </View>

            <Button
              variant="primary"
              size="lg"
              onPress={handleSubmit(onFormSubmit)}
              loading={loading || isLoading}
              disabled={loading || isLoading || !acceptedTerms}
            >
              Get OTP on WhatsApp
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <SuccessModal
        isOpen={showErrorModal}
        onClose={handleModalClose}
        modalType="error"
        modalTitle="Error"
        subTitle={errorMessage}
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
  container: {
    justifyContent: "flex-start",
  },
  logoContainer: {
    alignItems: "center",
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  },
  logo: {
    width: 280,
    height: 160,
    alignSelf: "center",
  },
  title: {
    lineHeight: 48,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: theme.colors.orange,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  checkboxChecked: {
    backgroundColor: theme.colors.orange,
  },
  termsContainer: {
    flex: 1,
  },
  errorText: {
    marginLeft: theme.spacing.lg,
  },
});
