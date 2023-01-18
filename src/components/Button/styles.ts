import styled, { css } from "styled-components/native";

export const Container = styled.TouchableOpacity<{ fullWidth: boolean }>`
  background-color: ${({ disabled }) => (disabled ? "#999" : "#d73035")};
  border-radius: 48px;
  padding: 14px 24px;
  align-items: center;
  justify-content: center;

  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
    `}
`;
