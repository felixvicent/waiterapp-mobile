import styled, { css } from "styled-components/native";
import { Order } from "../../../types/Order";

export const Container = styled.View`
  background-color: #fff;
  padding: 24px;
  border-radius: 8px;
  margin-bottom: 8px;
`;

export const Head = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Badge = styled.View<{ status: Order["status"]; archive: boolean }>`
  padding: 2px 6px;
  border-radius: 4px;
  position: relative;

  ${({ status }) =>
    status === "DONE" &&
    css`
      background: rgba(48, 215, 135, 0.05);
    `}

  ${({ status }) =>
    status === "IN_PRODUCTION" &&
    css`
      background: rgba(215, 108, 48, 0.05);
    `}


  ${({ status }) =>
    status === "WAITING" &&
    css`
      background: rgba(255, 255, 128, 0.05);
    `}

  ${({ archive }) =>
    archive &&
    css`
      background-color: rgba(102, 102, 102, 0.05);
    `}
`;

export const Products = styled.View`
  margin-top: 24px;
`;
export const Product = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
`;
