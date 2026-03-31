import React, { useCallback, useRef, useMemo } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "./Icon";
import {
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { theme } from "@/theme";

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
        <View style={styles.selector}>
          <Text
            style={[
              styles.selectorText,
              { color: value ? theme.colors.black1 : theme.colors.grey2 }
            ]}
          >
            {getDisplayValue()}
          </Text>
          <Icon
            name="angle-down"
            type="font-awesome-6"
            size={20}
            color="black"
          />
        </View>
      </TouchableOpacity>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0} // Opens at 70% height (first snap point)
        snapPoints={snapPoints}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        backgroundStyle={styles.modalBackground}
        handleIndicatorStyle={styles.handleIndicator}
      >
        <BottomSheetScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.modalContent}>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>
                Select Apartment
              </Text>
              <Text style={styles.headerSubtitle}>
                Choose your apartment from the list
              </Text>
            </View>

            {apartmentList.map((item) => (
              <TouchableOpacity
                key={item._id}
                onPress={() => handleSelectItem(item.apartmentName)}
                style={styles.itemWrapper}
              >
                <View
                  style={[
                    styles.item,
                    {
                      backgroundColor: value === item.apartmentName ? theme.colors.orange : "#F9FAFB",
                      borderColor: value === item.apartmentName ? theme.colors.orange : "transparent",
                    },
                    value === item.apartmentName && styles.activeShadow
                  ]}
                >
                  <View style={styles.itemTextContainer}>
                    <Text
                      style={[
                        styles.itemText,
                        { color: value === item.apartmentName ? "white" : theme.colors.black1 }
                      ]}
                    >
                      {item.apartmentName}
                    </Text>
                  </View>
                  {value === item.apartmentName && (
                    <View style={styles.checkIconWrapper}>
                      <Icon
                        name="check"
                        type="feather"
                        size={18}
                        color="white"
                      />
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              onPress={() => handleSelectItem("not-listed")}
              style={styles.notListedWrapper}
            >
              <View
                style={[
                  styles.item,
                  {
                    backgroundColor: value === "not-listed" ? theme.colors.orange : "#F9FAFB",
                    borderColor: value === "not-listed" ? theme.colors.orange : "#E5E7EB",
                    borderStyle: value === "not-listed" ? "solid" : "dashed",
                    borderWidth: 2,
                  },
                  value === "not-listed" && styles.activeShadow
                ]}
              >
                <View style={styles.itemTextContainer}>
                  <Text
                    style={[
                      styles.itemText,
                      { color: value === "not-listed" ? "white" : theme.colors.black1 }
                    ]}
                  >
                    Apartment Not Listed
                  </Text>
                  <Text
                    style={[
                      styles.itemSubtitle,
                      {
                        color: value === "not-listed"
                          ? "rgba(255,255,255,0.8)"
                          : theme.colors.gray10
                      }
                    ]}
                  >
                    Can't find your apartment? Select this option
                  </Text>
                </View>
                {value === "not-listed" && (
                  <View style={styles.checkIconWrapper}>
                    <Icon name="check" type="feather" size={18} color="white" />
                  </View>
                )}
              </View>
            </TouchableOpacity>
          </View>
        </BottomSheetScrollView>
      </BottomSheetModal>
    </>
  );
}

const styles = StyleSheet.create({
  selector: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.grey5,
    backgroundColor: "white",
    minHeight: 48,
  },
  selectorText: {
    fontSize: 14,
    fontWeight: "400",
    fontFamily: theme.typography.fontFamily.regular,
  },
  modalBackground: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  handleIndicator: {
    backgroundColor: "#D1D5DB",
    width: 40,
    height: 4,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  modalContent: {
    paddingVertical: 16,
  },
  header: {
    alignItems: "center",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: theme.colors.black1,
    fontFamily: theme.typography.fontFamily.bold,
  },
  headerSubtitle: {
    fontSize: 14,
    fontWeight: "400",
    color: theme.colors.gray10,
    fontFamily: theme.typography.fontFamily.regular,
    marginTop: 4,
  },
  itemWrapper: {
    marginBottom: 8,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
  },
  activeShadow: {
    shadowColor: theme.colors.orange,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemTextContainer: {
    flex: 1,
  },
  itemText: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: theme.typography.fontFamily.semibold,
  },
  itemSubtitle: {
    fontSize: 12,
    fontWeight: "400",
    fontFamily: theme.typography.fontFamily.regular,
    marginTop: 4,
  },
  checkIconWrapper: {
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 20,
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  notListedWrapper: {
    marginTop: 12,
    marginBottom: 20,
  },
});
