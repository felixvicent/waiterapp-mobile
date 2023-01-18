import { useState } from "react";
import { FlatList, TouchableOpacity } from "react-native";

import { formatCurrency } from "../../utils/formatCurrency";

import { CartItem } from "../../types/CartItem";

import { MinusCircle } from "../Icons/MinusCircle";
import { PlusCircle } from "../Icons/PlusCircle";
import { Text } from "../Text";
import { Button } from "../Button";

import {
  Item,
  ProductContainer,
  Actions,
  Image,
  QuantityContainer,
  ProductDetails,
  Summary,
  TotalContainer,
} from "./styles";
import { Product } from "../../types/Product";
import { OrderConfirmedModal } from "../OrderConfirmedModal";
import { api } from "../../services/api";

interface CartProps {
  cartItems: CartItem[];
  onAddToCart: (product: Product) => void;
  onDecrementCartItem: (product: Product) => void;
  onConfirmOrder: () => void;
  selectedTable: string;
}

export function Cart({
  cartItems,
  onAddToCart,
  onDecrementCartItem,
  onConfirmOrder,
  selectedTable,
}: CartProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const total = cartItems.reduce((acc, cur) => {
    return acc + cur.quantity * cur.product.price;
  }, 0);

  async function handleConfirmOrder() {
    setIsLoading(true);

    api.post("/orders", {
      table: selectedTable,
      products: cartItems.map((cartItem) => ({
        product: cartItem.product._id,
        quantity: cartItem.quantity,
      })),
    });

    setIsLoading(false);
    setIsModalVisible(true);
  }

  function handleOk() {
    onConfirmOrder();
    setIsModalVisible(false);
  }

  return (
    <>
      <OrderConfirmedModal onOk={handleOk} visible={isModalVisible} />
      {cartItems.length > 0 && (
        <FlatList
          data={cartItems}
          keyExtractor={(cartItem) => cartItem.product._id}
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: 20, maxHeight: 150 }}
          renderItem={({ item }) => (
            <Item>
              <ProductContainer>
                <Image
                  source={{
                    uri: `http://192.168.5.103:3333/uploads/${item.product.imagePath}`,
                  }}
                />
                <QuantityContainer>
                  <Text size={14} color="#666">
                    {item.quantity}x
                  </Text>
                </QuantityContainer>
                <ProductDetails>
                  <Text size={14} weight="600">
                    {item.product.name}
                  </Text>
                  <Text style={{ marginTop: 4 }} size={14} color="#666">
                    {formatCurrency(item.product.price)}
                  </Text>
                </ProductDetails>
              </ProductContainer>
              <Actions>
                <TouchableOpacity onPress={() => onAddToCart(item.product)}>
                  <PlusCircle />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => onDecrementCartItem(item.product)}
                  style={{ marginLeft: 24 }}
                >
                  <MinusCircle />
                </TouchableOpacity>
              </Actions>
            </Item>
          )}
        />
      )}
      <Summary>
        <TotalContainer>
          {cartItems.length > 0 ? (
            <>
              <Text color="#666">Total</Text>
              <Text weight="600" size={20}>
                {formatCurrency(total)}
              </Text>
            </>
          ) : (
            <Text>Seu carrinho está vazio</Text>
          )}
        </TotalContainer>
        <Button
          loading={isLoading}
          disabled={cartItems.length === 0}
          onPress={handleConfirmOrder}
        >
          Confirmar pedido
        </Button>
      </Summary>
    </>
  );
}
