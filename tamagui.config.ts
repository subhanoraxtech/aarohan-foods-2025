import { defaultConfig } from "@tamagui/config/v4";
import { createTamagui } from "tamagui";

const tamaguiConfig = createTamagui({
  ...defaultConfig,

  themes: {
    light: {
      ...defaultConfig.themes.light,
      primary: "#090909",
      background: "#FAFAF9",
      grey: "#f4f4f4",
      grey0: "#F1F1F1",
      grey1: "#EBEBE6",
      grey2: "#9C9C9C",
      gray3: "#292927",
      grey4: "#333333",
      grey5: "#EBEBED",
      grey6: "#F5F5F5",
      grey7: "#DDDDDD",
      grey8: "#F6F6F6",
      grey9: "#F6F6F8",
      gray10: "#878787",
      gray8: "#E5E7EB",
      orange: "#FE8C00",
      black1: "#040404",
      slate1: "#425466",
      success0: "#1EA556",
      success1: "#1B9E14",
      overlay: "rgba(0,0,0,0.5)",
      red1: "#E74C3C",
    },
    dark: {
      ...defaultConfig.themes.dark,
      primary: "#090909",
      background: "#FAFAF9",
      grey: "#f4f4f4",
      grey0: "#F1F1F1",
      grey1: "#EBEBE6",
      grey2: "#9C9C9C",
      gray3: "#292927",
      grey4: "#333333",
      grey5: "#EBEBED",
      grey6: "#F5F5F5",
      grey7: "#DDDDDD",
      grey8: "#F6F6F6",
      grey9: "#F6F6F8",
      gray10: "#878787",
      gray8: "#E5E7EB",
      orange: "#FE8C00",
      black1: "#040404",
      slate1: "#425466",
      success0: "#1EA556",
      success1: "#1B9E14",
      overlay: "rgba(0,0,0,0.5)",
      red1: "#E74C3C",
    },
  },

  fonts: {
    heading: {
      ...defaultConfig.fonts.heading,

      face: {
        500: { normal: "DMSansMedium" },
        600: { normal: "DMSansSemiBold" },
        700: { normal: "DMSansBold" },
        400: { normal: "DMSansRegular" },
        300: { normal: "DMSansLight" },
      },

      weight: {
        4: "400",
        5: "500",
        6: "600",
        7: "700",
        3: "300",
      },
    },

    body: {
      ...defaultConfig.fonts.body,

      face: {
        500: { normal: "DMSansMedium" },
        600: { normal: "DMSansSemiBold" },
        700: { normal: "DMSansBold" },
        400: { normal: "DMSansRegular" },
        300: { normal: "DMSansLight" },
      },
      weight: {
        4: "400",
        5: "500",
        6: "600",
        7: "700",
        3: "300",
      },
    },
  },
});

export default tamaguiConfig;

export type Conf = typeof tamaguiConfig;

declare module "tamagui" {
  interface TamaguiCustomConfig extends Conf {}
}
                                                                                      