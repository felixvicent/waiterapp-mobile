import { FlatList } from 'react-native';

import { products } from '../../mocks/products';
import { formatCurrency } from '../../utils/formatCurrency';
import { PlusCircle } from '../Icons/PlusCircle';

import { Text } from '../Text';

import {
  Product,
  ProductImage,
  ProductDetails,
  Separator,
  AddToCartButton
} from './styles';

export function Menu() {
  return (
    <FlatList
      style={{
        marginTop: 32
      }}
      contentContainerStyle={{
        paddingHorizontal: 24
      }}
      data={products}
      ItemSeparatorComponent={Separator}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <Product>
          <ProductImage
            source={{ uri: `http://192.168.5.104:3001/uploads/${item.imagePath}` }}
          />
          <ProductDetails>
            <Text weight='600'>{item.name}</Text>
            <Text style={{ marginVertical: 8 }} size={14} color="#666">
              {item.description}
            </Text>
            <Text size={14} weight="600">{formatCurrency(item.price)}</Text>
          </ProductDetails>
          <AddToCartButton>
            <PlusCircle />
          </AddToCartButton>
        </Product>
      )}
    />
  );
}
