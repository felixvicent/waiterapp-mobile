import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView } from "react-native";
import { Text } from "../../components/Text";
import { api } from "../../services/api";
import { Order } from "../../types/Order";
import { OrderCard } from "./OrderCard";
import {
  CenteredContainer,
  Container,
  Header,
  OrdersContainer,
  OrderSection,
} from "./styles";

export function Orders() {
  const [ordersInProgress, setOrdersInProgress] = useState<Order[]>([]);
  const [previousOrders, setPreviousOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.get("/orders"), api.get("/orders?archived=1")]).then(
      ([{ data: ordersInProgressData }, { data: previousOrdersData }]) => {
        setOrdersInProgress(ordersInProgressData);
        setPreviousOrders(previousOrdersData);
        setIsLoading(false);
      }
    );
  }, []);

  return (
    <Container>
      <Header>
        <Text size={24} weight="600">
          Pedidos
        </Text>
      </Header>

      {isLoading ? (
        <CenteredContainer>
          <ActivityIndicator />
        </CenteredContainer>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <OrdersContainer>
            <OrderSection>
              <Text
                style={{ marginBottom: 24 }}
                weight="600"
                size={18}
                color="#666"
              >
                Em andamento
              </Text>
              {ordersInProgress.map((order) => (
                <OrderCard key={order._id} order={order} />
              ))}
            </OrderSection>

            <OrderSection>
              <Text weight="600" size={18} color="#666">
                Anteriores
              </Text>

              {previousOrders.map((order) => (
                <OrderCard key={order._id} order={order} />
              ))}
            </OrderSection>
          </OrdersContainer>
        </ScrollView>
      )}
    </Container>
  );
}
