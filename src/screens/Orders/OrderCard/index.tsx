/* eslint-disable indent */
import { Text } from "../../../components/Text";
import { Order } from "../../../types/Order";
import { Badge, Container, Head, Product, Products } from "./styles";

interface OrderCardProps {
  order: Order;
}

export function OrderCard({ order }: OrderCardProps) {
  return (
    <Container>
      <Head>
        <Text size={14} color="#000" weight="600">
          Mesa {order.table}
        </Text>

        <Badge archive={order.archive} status={order.status}>
          <Text
            size={12}
            weight="600"
            color={
              order.archive
                ? "#666"
                : order.status === "DONE"
                ? "#30D787"
                : order.status === "IN_PRODUCTION"
                ? "#d76c30"
                : "#e5d528"
            }
          >
            {order.archive ? (
              "Finalizado"
            ) : (
              <>
                {order.status === "DONE" && "Pronto!"}
                {order.status === "IN_PRODUCTION" && "Entrou em produção"}
                {order.status === "WAITING" && "Na fila de espera"}
              </>
            )}
          </Text>
        </Badge>
      </Head>
      <Products>
        {order.products.map((product) => (
          <Product key={product._id}>
            <Text
              color="#999"
              size={14}
              style={{ marginRight: 8 }}
            >{`${product.quantity}x`}</Text>
            <Text size={14}>{product.product.name}</Text>
          </Product>
        ))}
      </Products>
    </Container>
  );
}
