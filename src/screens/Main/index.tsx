import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";

import { Button } from "../../components/Button";
import { Cart } from "../../components/Cart";
import { Categories } from "../../components/Categories";
import { Header } from "../../components/Header";
import { Empty } from "../../components/Icons/Empty";
import { Menu } from "../../components/Menu";
import { TableModal } from "../../components/TableModal";
import { CartItem } from "../../types/CartItem";
import { Text } from "../../components/Text";

import { Product } from "../../types/Product";

import {
  Container,
  CategoryContainer,
  MenuContainer,
  Footer,
  FooterContainer,
  CenteredContainer,
} from "./styles";
import { Category } from "../../types/Category";

import { api } from "../../services/api";

export function Main() {
  const [selectedTable, setSelectedTable] = useState("");
  const [isTableModalVisible, setIsTableModalVisible] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingProduct, setIsLoadingProduct] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    Promise.all([api.get("/categories"), api.get("/products")])
      .then(([categoriesResponse, productsResponse]) => {
        setCategories(categoriesResponse.data);
        setProducts(productsResponse.data);
        setIsLoading(false);
        setIsLoadingProduct(false);
      })
      .catch((err) => console.log(err));
  }, []);

  async function handleSelectCategory(categoryId: string) {
    setIsLoadingProduct(true);
    const route = !categoryId
      ? "/products"
      : `/categories/${categoryId}/products`;
    const { data } = await api.get(route);

    setProducts(data);
    setIsLoadingProduct(false);
  }

  function handleSaveTable(table: string) {
    setSelectedTable(table);
  }

  function handleResetOrder() {
    setSelectedTable("");
    setCartItems([]);
  }

  function handleAddToCart(product: Product) {
    if (!selectedTable) {
      setIsTableModalVisible(true);
    }

    setCartItems((prevState) => {
      const itemIndex = prevState.findIndex(
        (cartItem) => cartItem.product._id === product._id
      );

      if (itemIndex < 0) {
        return prevState.concat({
          quantity: 1,
          product,
        });
      }

      const newCartItems = [...prevState];
      const item = newCartItems[itemIndex];

      newCartItems[itemIndex] = {
        ...item,
        quantity: item.quantity + 1,
      };

      return newCartItems;
    });
  }

  function handleDecrementCartItem(product: Product) {
    setCartItems((prevState) => {
      const itemIndex = prevState.findIndex(
        (cartItem) => cartItem.product._id === product._id
      );

      const newCartItems = [...prevState];

      const item = prevState[itemIndex];

      if (item.quantity === 1) {
        newCartItems.splice(itemIndex, 1);

        return newCartItems;
      }

      newCartItems[itemIndex] = {
        ...item,
        quantity: item.quantity - 1,
      };

      return newCartItems;
    });
  }

  return (
    <>
      <Container>
        <Header
          selectedTable={selectedTable}
          onCancelOrder={handleResetOrder}
        />

        {isLoading ? (
          <CenteredContainer>
            <ActivityIndicator color="#d73035" size="large" />
          </CenteredContainer>
        ) : (
          <>
            <CategoryContainer>
              <Categories
                onSelectCategory={handleSelectCategory}
                categories={categories}
              />
            </CategoryContainer>

            {isLoadingProduct ? (
              <CenteredContainer>
                <ActivityIndicator color="#d73035" size="large" />
              </CenteredContainer>
            ) : (
              <>
                {products.length > 0 ? (
                  <MenuContainer>
                    <Menu products={products} onAddToCart={handleAddToCart} />
                  </MenuContainer>
                ) : (
                  <CenteredContainer>
                    <Empty />
                    <Text color="#666" style={{ marginTop: 24 }}>
                      Nenhum produto foi encontrado!
                    </Text>
                  </CenteredContainer>
                )}
              </>
            )}
          </>
        )}
      </Container>
      <Footer>
        <FooterContainer>
          {!selectedTable && (
            <Button
              onPress={() => setIsTableModalVisible(true)}
              disabled={isLoading}
            >
              Novo Pedido
            </Button>
          )}
          {selectedTable && (
            <Cart
              selectedTable={selectedTable}
              onConfirmOrder={handleResetOrder}
              onAddToCart={handleAddToCart}
              cartItems={cartItems}
              onDecrementCartItem={handleDecrementCartItem}
            />
          )}
        </FooterContainer>
      </Footer>
      <TableModal
        onClose={() => setIsTableModalVisible(false)}
        visible={isTableModalVisible}
        onSave={handleSaveTable}
      />
    </>
  );
}
