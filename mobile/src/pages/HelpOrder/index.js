import React, { useState, useEffect } from 'react';
import { withNavigationFocus } from 'react-navigation';
import { useSelector } from 'react-redux';

import { Container, HelpButton, Answers } from './styles';
import HelpOrderCard from '~/components/HelpOrderCard';

import api from '~/services/api';

function HelpOrder({ isFocused, navigation }) {
  const [helpOrders, setHelpOrders] = useState([]);
  const studentId = useSelector(state => state.student.student);

  async function loadData() {
    const response = await api.get(`/students/${studentId}/help-orders`);

    const { help_order } = response.data;

    setHelpOrders(help_order);
  }

  useEffect(() => {
    if (isFocused) {
      loadData();
    }
  }, [isFocused]);


  function handleNavigate(item) {
    console.tron.log(item);
    navigation.navigate('DetailsHelpOrder', { helpOrder: item });
  }

  return (
    <Container>
      <HelpButton onPress={() => navigation.navigate('NewHelpOrder')}>
        Novo pedido de auxílio
      </HelpButton>
      <Answers>
      {helpOrders.map(item => (
        <HelpOrderCard
          key={item.id}
          value={item}
          handleNavigate={() => handleNavigate(item)}
        />
      ))}
      </Answers>
    </Container>
  );
}

export default withNavigationFocus(HelpOrder)
