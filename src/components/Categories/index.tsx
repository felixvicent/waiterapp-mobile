import { useState } from 'react';
import { FlatList } from 'react-native';

import { categories } from '../../mocks/categories';

import { Text } from '../Text';

import { Category, Icon } from './styles';

export function Categories() {
  const [selectedCategory, setSelectedCategory] = useState('');

  function handleSelectCategory(categoryId: string) {
    const category = selectedCategory === categoryId ? '' : categoryId;
    setSelectedCategory(category);
  }

  return (
    <FlatList
      keyExtractor={category => category._id}
      data={categories}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingRight: 24
      }}
      renderItem={({ item }) => {
        const isSelected = item._id === selectedCategory;

        return (
          <Category onPress={() => handleSelectCategory(item._id)}>
            <Icon>
              <Text opacity={isSelected ? 1 : 0.5}>{item.icon}</Text>
            </Icon>
            <Text opacity={isSelected ? 1 : 0.5} size={14} weight='600'>{item.name}</Text>
          </Category>
        );
      }}
    />
  );
}
