import { useState } from 'react';

import { Button } from '../components/Button';
import { Categories } from '../components/Categories';
import { Header } from '../components/Header';
import { Menu } from '../components/Menu';
import { TableModal } from '../components/TableModal';

import {
  Container,
  CategoryContainer,
  MenuContainer,
  Footer,
  FooterContainer
} from './styles';

export function Main() {
  const [selectedTable, setSelectedTable] = useState('');
  const [isTableModalVisible, setIsTableModalVisible] = useState(false);

  function handleSaveTable(table: string) {
    setSelectedTable(table);
  }

  return (
    <>
      <Container>
        <Header />

        <CategoryContainer>
          <Categories />
        </CategoryContainer>

        <MenuContainer>
          <Menu />
        </MenuContainer>
      </Container>
      <Footer>
        <FooterContainer>
          {!selectedTable && (
            <Button onPress={() => setIsTableModalVisible(true)}>
              Novo Pedido
            </Button>
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
