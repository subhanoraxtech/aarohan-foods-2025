import React, { useCallback, useRef, useMemo } from "react";
import { XStack, YStack, Text } from "tamagui";
import { TouchableOpacity } from "react-native";
import Icon from "./Icon";
import {
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";

interface SelectFieldProps {
  apartmentList: any[] | [];
  onValueChange: (value: string) => void;
  value: string;
}

export default function SelectField({
  apartmentList,
  onValueChange,
  value,
}: SelectFieldProps) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  // Updated snapPoints to include 70% as the default
  const snapPoints = useMemo(() => ["70%", "90%"], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSelectItem = useCallback(
    (selectedValue: string) => {
      onValueChange(selectedValue);
      bottomSheetModalRef.current?.dismiss();
    },
    [onValueChange]
  );

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
      />
    ),
    []
  );

  const getDisplayValue = () => {
    if (!value) return "Select Apartment";
    if (value === "not-listed") return "Apartment Not Listed";
    return value;
  };

  return (
    <>
      <TouchableOpacity onPress={handlePresentModalPress}>
        <XStack
          alignItems="center"
          justifyContent="space-between"
          padding="$3"
          borderRadius={8}
          borderWidth={1}
          borderColor="$grey5"
          backgroundColor="white"
          minHeight={48}
        >
          <Text
            fontSize={14}
            fontWeight="400"
            color={value ? "$black1" : "$grey2"}
          >
            {getDisplayValue()}
          </Text>
          <Icon
            name="angle-down"
            type="font-awesome-6"
            size={20}
            color="black"
          />
        </XStack>
      </TouchableOpacity>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1} // Opens at 70% height (first snap point)
        snapPoints={snapPoints}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        backgroundStyle={{
          backgroundColor: "white",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.25,
          shadowRadius: 10,
          elevation: 10,
        }}
        handleIndicatorStyle={{
          backgroundColor: "#D1D5DB",
          width: 40,
          height: 4,
        }}
      >
        <BottomSheetScrollView
          style={{ flex: 1, paddingHorizontal: 20 }}
          showsVerticalScrollIndicator={false}
        >
          <YStack gap="$2" paddingVertical="$4">
            <YStack alignItems="center" marginBottom="$4">
              <Text fontSize={20} fontWeight="700" color="$black1">
                Select Apartment
              </Text>
              <Text
                fontSize={14}
                fontWeight="400"
                color="$gray10"
                marginTop="$1"
              >
                Choose your apartment from the list
              </Text>
            </YStack>

            {apartmentList.map((item) => (
              <TouchableOpacity
                key={item._id}
                onPress={() => handleSelectItem(item.apartmentName)}
                style={{ marginBottom: 8 }}
              >
                <XStack
                  alignItems="center"
                  justifyContent="space-between"
                  padding="$4"
                  borderRadius={12}
                  backgroundColor={
                    value === item.apartmentName ? "$orange" : "#F9FAFB"
                  }
                  borderWidth={2}
                  borderColor={
                    value === item.apartmentName ? "$orange" : "transparent"
                  }
                  shadowColor={
                    value === item.apartmentName ? "$orange" : "transparent"
                  }
                  shadowOffset={{ width: 0, height: 2 }}
                  shadowOpacity={value === item.apartmentName ? 0.1 : 0}
                  shadowRadius={4}
                  elevation={value === item.apartmentName ? 3 : 0}
                >
                  <YStack flex={1}>
                    <Text
                      fontSize={16}
                      fontWeight="600"
                      color={value === item.apartmentName ? "white" : "$black1"}
                    >
                      {item.apartmentName}
                    </Text>
                  </YStack>
                  {value === item.apartmentName && (
                    <XStack
                      backgroundColor="rgba(255,255,255,0.2)"
                      borderRadius={20}
                      padding="$2"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Icon
                        name="check"
                        type="feather"
                        size={18}
                        color="white"
                      />
                    </XStack>
                  )}
                </XStack>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              onPress={() => handleSelectItem("not-listed")}
              style={{ marginTop: 12, marginBottom: 20 }}
            >
              <XStack
                alignItems="center"
                justifyContent="space-between"
                padding="$4"
                borderRadius={12}
                backgroundColor={value === "not-listed" ? "$orange" : "#F9FAFB"}
                borderWidth={2}
                borderColor={value === "not-listed" ? "$orange" : "#E5E7EB"}
                borderStyle={value === "not-listed" ? "solid" : "dashed"}
                shadowColor={value === "not-listed" ? "$orange" : "transparent"}
                shadowOffset={{ width: 0, height: 2 }}
                shadowOpacity={value === "not-listed" ? 0.1 : 0}
                shadowRadius={4}
                elevation={value === "not-listed" ? 3 : 0}
              >
                <YStack flex={1}>
                  <Text
                    fontSize={16}
                    fontWeight="600"
                    color={value === "not-listed" ? "white" : "$black1"}
                  >
                    Apartment Not Listed
                  </Text>
                  <Text
                    fontSize={12}
                    fontWeight="400"
                    color={
                      value === "not-listed"
                        ? "rgba(255,255,255,0.8)"
                        : "$gray10"
                    }
                    marginTop="$1"
                  >
                    Can't find your apartment? Select this option
                  </Text>
                </YStack>
                {value === "not-listed" && (
                  <XStack
                    backgroundColor="rgba(255,255,255,0.2)"
                    borderRadius={20}
                    padding="$2"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Icon name="check" type="feather" size={18} color="white" />
                  </XStack>
                )}
              </XStack>
            </TouchableOpacity>
          </YStack>
        </BottomSheetScrollView>
      </BottomSheetModal>
    </>
  );
}
