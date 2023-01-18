import { useState } from "react";
import { FlatList } from "react-native";

import { formatCurrency } from "../../utils/formatCurrency";
import { PlusCircle } from "../Icons/PlusCircle";

import { ProductModal } from "../ProductModal";
import { Text } from "../Text";
import { Product } from "../../types/Product";

import {
  ProductContainer,
  ProductImage,
  ProductDetails,
  Separator,
  AddToCartButton,
} from "./styles";

interface MenuProps {
  onAddToCart: (product: Product) => void;
  products: Product[];
}

export function Menu({ onAddToCart, products }: MenuProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  function handleOpenModal(product: Product) {
    setIsModalVisible(true);
    setSelectedProduct(product);
  }

  return (
    <>
      <FlatList
        style={{
          marginTop: 32,
        }}
        contentContainerStyle={{
          paddingHorizontal: 24,
        }}
        data={products}
        ItemSeparatorComponent={Separator}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <ProductContainer onPress={() => handleOpenModal(item)}>
            <ProductImage
              source={{
                uri: `http://192.168.5.103:3333/uploads/${item.imagePath}`,
              }}
            />
            <ProductDetails>
              <Text weight="600">{item.name}</Text>
              <Text style={{ marginVertical: 8 }} size={14} color="#666">
                {item.description}
              </Text>
              <Text size={14} weight="600">
                {formatCurrency(item.price)}
              </Text>
            </ProductDetails>
            <AddToCartButton onPress={() => onAddToCart(item)}>
              <PlusCircle />
            </AddToCartButton>
          </ProductContainer>
        )}
      />
      <ProductModal
        onAddToCart={onAddToCart}
        product={selectedProduct}
        onClose={() => setIsModalVisible(false)}
        visible={isModalVisible}
      />
    </>
  );
}
