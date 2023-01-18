import styled from "styled-components/native";

export const Container = styled.View`
  position: relative;
  width: 100%;
`;

export const StyledInput = styled.TextInput`
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 100%;
  font-weight: 400;
  font-size: 14px;
  color: #666;
  outline: 0;
`;

export const HidePasswordButton = styled.TouchableOpacity`
  position: absolute;
  right: 18px;
  bottom: 18px;
`;
