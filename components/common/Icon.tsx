import React, { FC } from "react";
import { TouchableOpacityProps } from "react-native-gesture-handler";

export type IconType =
  | "material"
  | "feather"
  | "material-community"
  | "simple-line-icon"
  | "zocial"
  | "font-awesome"
  | "octicon"
  | "ionicon"
  | "foundation"
  | "evilicon"
  | "entypo"
  | "antdesign"
  | "font-awesome-5"
  | "font-awesome-6";

const getIcons = (type: IconType) => {
  switch (type) {
    case "zocial":
      return require("@expo/vector-icons/Zocial").default;

    case "antdesign":
      return require("@expo/vector-icons/AntDesign").default;
    case "feather":
      return require("@expo/vector-icons/Feather").default;
    case "octicon":
      return require("@expo/vector-icons/Octicons").default;
    case "material":
      return require("@expo/vector-icons/MaterialIcons").default;
    case "material-community":
      return require("@expo/vector-icons/MaterialCommunityIcons").default;
    case "ionicon":
      return require("@expo/vector-icons/Ionicons").default;
    case "foundation":
      return require("@expo/vector-icons/Foundation").default;
    case "evilicon":
      return require("@expo/vector-icons/EvilIcons").default;
    case "entypo":
      return require("@expo/vector-icons/Entypo").default;
    case "font-awesome":
      return require("@expo/vector-icons/FontAwesome").default;
    case "font-awesome-5":
      return require("@expo/vector-icons/FontAwesome5").default;
    case "font-awesome-6":
      return require("@expo/vector-icons/FontAwesome6").default;
    case "simple-line-icon":
      return require("@expo/vector-icons/SimpleLineIcons").default;
    default:
      return require("react-native-vector-icons/MaterialIcons").default;
  }
};

interface IconProps extends TouchableOpacityProps {
  type?: IconType;
  name: string;
  size?: number;
  color?: string;
}

const Icon: FC<IconProps> = ({
  type = "material-community",
  onPress,
  onLongPress,
  name,
  size = 24,
  color = "white",
  ...restProps
}) => {
  const IconComponent = getIcons(type);

  return (
    <IconComponent
      name={name}
      size={size}
      color={color}
      onPress={onPress}
      onLongPress={onLongPress}
      {...restProps}
    />
  );
};

export default Icon;
