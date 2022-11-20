import { useState } from 'react';
import { FlatList } from 'react-native';

import { Text } from '../Text';
import { Category } from '../../types/Category';

import { CategoryContainer, Icon } from './styles';

interface CategoriesProps {
  categories: Category[]
  onSelectCategory: (categoryId: string) => Promise<void>;
}

export function Categories({ categories, onSelectCategory }: CategoriesProps) {
  const [selectedCategory, setSelectedCategory] = useState('');

  function handleSelectCategory(categoryId: string) {
    const category = selectedCategory === categoryId ? '' : categoryId;
    setSelectedCategory(category);
    onSelectCategory(category);
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
          <CategoryContainer onPress={() => handleSelectCategory(item._id)}>
            <Icon>
              <Text opacity={isSelected ? 1 : 0.5}>{item.icon}</Text>
            </Icon>
            <Text style={{ flex: 1, flexWrap: 'wrap' }} opacity={isSelected ? 1 : 0.5} size={14} weight='600'>{item.name}</Text>
          </CategoryContainer>
        );
      }}
    />
  );
}
