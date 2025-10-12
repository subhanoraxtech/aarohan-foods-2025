import {
  Spinner,
  Button as TamaguiButton,
  ButtonProps as TamaguiButtonProps,
} from "tamagui";

interface ButtonProps extends TamaguiButtonProps {
  loading?: boolean;
}

const Button = ({
  backgroundColor = "$orange",
  color = "$background",
  fontWeight = "600",
  borderRadius = "$12",
  size = "$5",
  loading = false,
  iconAfter,
  disabled = false,
  children,
  ...props
}: ButtonProps) => {
  return (
    <TamaguiButton
      backgroundColor={backgroundColor}
      color={color}
      fontWeight={fontWeight}
      size={size}
      borderRadius={borderRadius}
      iconAfter={
        loading ? () => <Spinner color={color as string} /> : iconAfter
      }
      disabled={loading || disabled}
      {...props}
    >
      {children}
    </TamaguiButton>
  );
};

export default Button;
