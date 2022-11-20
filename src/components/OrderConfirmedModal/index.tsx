import { StatusBar } from 'expo-status-bar';

import { Modal } from 'react-native';
import { CheckCircle } from '../Icons/CheckCircle';

import { Text } from '../Text';

import { Container, OkButton } from './styles';

interface OrderConfirmedModal {
  visible: boolean;
  onOk: () => void;
}

export function OrderConfirmedModal({ visible, onOk }: OrderConfirmedModal) {
  return (
    <Modal
      visible={visible}
      animationType='fade'
    >
      <StatusBar style='light' translucent backgroundColor='#d73035' />
      <Container>
        <CheckCircle />
        <Text style={{ marginTop: 12 }} size={20} weight="600" color='#fff'>
          Pedido confirmado
        </Text>
        <Text style={{ marginTop: 4 }} color='#fff' opacity={0.9}>
          O pedido já entrou na fila de produção
        </Text>
        <OkButton onPress={onOk}>
          <Text weight='600' color='#d73035'>OK</Text>
        </OkButton>
      </Container>
    </Modal>
  );
}
