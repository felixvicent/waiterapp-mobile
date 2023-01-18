import styled from "styled-components/native";
import { Platform, StatusBar } from "react-native";

const isAndroid = Platform.OS === "android";

export const Container = styled.SafeAreaView`
  margin-top: ${isAndroid ? `${StatusBar.currentHeight}px` : 0};
  flex: 1;
  background: #fafafa;
  padding: 24px;
`;

export const Header = styled.View`
  margin-bottom: 40px;
`;

export const OrdersContainer = styled.View``;

export const OrderSection = styled.View``;

export const CenteredContainer = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
