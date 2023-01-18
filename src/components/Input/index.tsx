import { useState } from "react";
import { Container, HidePasswordButton, StyledInput } from "./styles";

import Eye from "../../assets/images/icons/eye.svg";
import EyeHidden from "../../assets/images/icons/eye-hidden.svg";
import { KeyboardTypeOptions, TextInputProps } from "react-native";
import { Text } from "../Text";

interface InputProps extends TextInputProps {
  keyboardType?: KeyboardTypeOptions;
  addon?: string;
  label?: string;
  type?: string;
}

export function Input({ addon, label, type = "default", ...rest }: InputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(
    type === "password"
  );

  function handlePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }

  return (
    <Container>
      {label && (
        <Text style={{ marginBottom: 8 }} size={14}>
          {label}
        </Text>
      )}
      <StyledInput {...rest} secureTextEntry={isPasswordVisible} />
      {type === "password" && (
        <HidePasswordButton onPress={handlePasswordVisibility}>
          {isPasswordVisible ? (
            <EyeHidden width={24} height={24} />
          ) : (
            <Eye width={24} height={24} />
          )}
        </HidePasswordButton>
      )}

      {addon && <Text style={{ marginTop: 8 }}>{addon}</Text>}
    </Container>
  );
}
