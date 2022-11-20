import { Modal, TouchableOpacity, Platform } from 'react-native';

import { Text } from '../Text';
import { Close } from '../Icons/Close';

import { Form, Header, ModalBody, Overlay, Input } from './styles';
import { Button } from '../Button';
import { useState } from 'react';

const isAndroid = Platform.OS === 'android';

interface TableModalProps {
  visible: boolean;
  onClose: () => void
  onSave: (table: string) => void
}

export function TableModal({ visible, onClose, onSave }: TableModalProps) {
  const [table, setTable] = useState('');

  function handleSave() {
    onSave(table);
    onClose();
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType='fade'
    >
      <Overlay behavior={isAndroid ? 'height' : 'padding'}>
        <ModalBody>
          <Header>
            <Text weight='600'>Informe a mesa</Text>

            <TouchableOpacity onPress={onClose}>
              <Close color="#666" />
            </TouchableOpacity>
          </Header>
          <Form>
            <Input
              keyboardType='number-pad'
              placeholder='Número da mesa'
              placeholderTextColor='#666'
              onChangeText={setTable}
              value={table}
            />

            <Button
              onPress={handleSave}
              disabled={table.length === 0}
            >
              Salvar
            </Button>
          </Form>
        </ModalBody>
      </Overlay>
    </Modal>
  );
}
