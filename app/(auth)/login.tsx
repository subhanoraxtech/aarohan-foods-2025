import Button from "@/components/common/Button";
import Icon from "@/components/common/Icon";
import TextField from "@/components/common/TextField";
import NotificationModal, { NotificationModalType } from "@/components/common/SuccesModal";

import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Image,
  Linking,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { ICountry } from "react-native-international-phone-number";
import {
  Checkbox,
  H2,
  Paragraph,
  SizableText,
  Text,
  XStack,
  YStack,
} from "tamagui";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerFormData, registerSchema } from "@/schemas/register.schema";
import { useSendOtpMutation } from "@/services/auth.service";
import RoleSelectionModal from "@/components/common/RoleSelectionModal";

export default function LoginScreen() {
  const [sendOtp, { isLoading }] = useSendOtpMutation();
  const [loading, setLoading] = useState(false);
  const [loginSuccessData, setLoginSuccessData] = useState<{
    phone: string;
    otpExpires?: string;
  } | null>(null);

  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    type: NotificationModalType;
    title?: string;
    subtitle?: string;
  }>({
    isOpen: false,
    type: 'success',
    title: '',
    subtitle: '',
  });

  const router = useRouter();
  const selectedCountry = {
    iso2: "in",
    callingCode: "+91",
    name: "India",
  } as any;

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

  // This function is called when the form is submitted
  const onFormSubmit = async (data: registerFormData) => {
    setLoading(true);
    try {
      const fullPhoneNumber = `+91${data.phoneNumber}`;
      const response = await sendOtp({
        phone: fullPhoneNumber,
      });

      console.log("fullPhoneNumber", fullPhoneNumber);
      console.log("response login", response);

      if (response?.data?.success) {
        setLoginSuccessData({
          phone: fullPhoneNumber,
          otpExpires: response.data?.otpExpires,
        });

        router.push({
          pathname: "/otp",
          params: {
            phone: fullPhoneNumber,
            otpExpires: response.data?.otpExpires,
          },
        });
        reset();
      }
      else if (response?.error) {
        const errorData = (response.error as any)?.data;
        const errorMessage = errorData?.message || "An error occurred";
        setModalConfig({
          isOpen: true,
          type: 'error',
          title: 'Error',
          subtitle: errorMessage,
        });
      }
      // Fallback for unexpected response structure
      else {
        setModalConfig({
          isOpen: true,
          type: 'error',
          title: 'Error',
          subtitle: "Unexpected response from server",
        });
      }
    }
    catch (err: any) {
      console.log("err", err);
      // Handle network errors or other exceptions
      const errorMessage = err?.response?.data?.message ||
        err?.message ||
        "Network error occurred";
      setModalConfig({
        isOpen: true,
        type: 'error',
        title: 'Error',
        subtitle: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    setModalConfig(prev => ({ ...prev, isOpen: false }));

    if (modalConfig.type === 'success' && loginSuccessData) {
      router.push({
        pathname: "/otp",
        params: {
          phone: loginSuccessData.phone,
          otpExpires: loginSuccessData.otpExpires,
        },
      });
      reset();
      setLoginSuccessData(null);
    }
  };

  const handleLinkPress = (url: string) => {
    Linking.openURL(url).catch((err) => {
      console.error("Failed to open URL:", err);
    });
  };

  return (
    <>
      <YStack flex={1} bg="white">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        >
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 40 }}
          >
            <YStack
              p="$6"
              jc="flex-start"
            >
              <YStack width="100%" ai="center" mt="$4" mb="$6">
                <Image
                  source={require("@/assets/images/logo.png")}
                  style={{ width: 200, height: 120, resizeMode: "cover", alignSelf: "center" }}
                />
              </YStack>

              <YStack gap="$6" mb="$4">
                <H2 fontWeight="bold" fontSize={40} lineHeight={48}>
                  Login to your account.
                </H2>
                <Paragraph color="$gray10" fontSize="$5">
                  Please sign in to your account
                </Paragraph>
              </YStack>

              <YStack gap="$4" mb="$6">
                <Controller
                  control={control}
                  name="phoneNumber"
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                      placeholder="Enter WhatsApp Number"
                      label="Phone Number"
                      value={value}
                      onChangeText={onChange}
                      keyboardType="numeric"
                      inputMode="numeric"
                      prefix={selectedCountry.callingCode}
                      error={!!error}
                      helperText={error?.message}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="acceptedTerms"
                  render={({ field: { onChange, value } }) => (
                    <YStack space="$2">
                      <XStack gap="$2" jc="center" px="$3">
                        <Checkbox
                          size="$4"
                          checked={value}
                          onCheckedChange={onChange}
                          backgroundColor={value ? "$orange" : "$background"}
                          borderColor="$orange"
                        >
                          <Checkbox.Indicator>
                            <Icon name="check" color="white" />
                          </Checkbox.Indicator>
                        </Checkbox>

                        <YStack>
                          <XStack ai="center">
                            <Text fontSize="$2"> By proceeding, I agree to </Text>
                            <TouchableOpacity
                              onPress={() => router.push("/terms-conditions")}
                            >
                              <Text fontSize="$2" color="$orange" fontWeight="500">
                                terms and conditions &
                              </Text>
                            </TouchableOpacity>
                          </XStack>
                          <TouchableOpacity
                            onPress={() => router.push("/privacy-policy")}
                          >
                            <Text
                              fontSize="$2"
                              color="$orange"
                              fontWeight="500"
                              ta="center"
                            >
                              privacy policy
                            </Text>
                          </TouchableOpacity>
                        </YStack>
                      </XStack>
                      {errors.acceptedTerms && (
                        <SizableText
                          color="$red1"
                          fontWeight="$6"
                          m="$2"
                        >
                          {errors.acceptedTerms.message}
                        </SizableText>
                      )}
                    </YStack>
                  )}
                />
              </YStack>

              <Button
                onPress={handleSubmit(onFormSubmit)}
                iconAfter={
                  <Icon name="arrow-right-long" color="white" type="font-awesome-6" />
                }
                loading={loading || isLoading}
                disabled={loading || isLoading}
              >
                Get OTP on Whatsapp
              </Button>
            </YStack>
          </ScrollView>
        </KeyboardAvoidingView>
      </YStack>

      <NotificationModal
        isOpen={modalConfig.isOpen}
        onClose={handleModalClose}
        modalType={modalConfig.type}
        modalTitle={modalConfig.title}
        subTitle={modalConfig.subtitle}
        buttonTitle="Continue"
        iconName="message"
        iconType="material-community"
      />
    </>
  );
}