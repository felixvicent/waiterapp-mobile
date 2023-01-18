import { Container } from "./styles";

import { Text } from "../Text";
import { ActivityIndicator, TouchableOpacityProps } from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  children: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
}

export function Button({
  children,
  onPress,
  disabled = false,
  loading = false,
  fullWidth = false,
  ...rest
}: ButtonProps) {
  return (
    <Container
      fullWidth={fullWidth}
      disabled={disabled || loading}
      onPress={onPress}
      {...rest}
    >
      {!loading && (
        <Text weight="600" color="#fff">
          {children}
        </Text>
      )}
      {loading && <ActivityIndicator color={"#fff"} />}
    </Container>
  );
}
