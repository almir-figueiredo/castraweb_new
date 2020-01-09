import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, Card, Title, TextMessage } from './styles';

export default function DetailsHelpOrder({ navigation }) {
  const { question, answer } = navigation.state.params.helpOrder;

  return (
    <Container>
      <Card>
        <Title>PERGUNTA</Title>
        <TextMessage>{question}</TextMessage>
        <Title>RESPOSTA</Title>
        <TextMessage>{answer || 'Pergunta ainda não respondida.'}</TextMessage>
      </Card>
    </Container>
  );
}

DetailsHelpOrder.navigationOptions = ({ navigation }) => ({
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('HelpOrder');
      }}
    >
      <Icon name="chevron-left" size={50} color="#EE4E62" />
    </TouchableOpacity>
  ),
});
