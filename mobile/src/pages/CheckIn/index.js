import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';
import { TouchableOpacity, Alert, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';

import HeaderTitle from '~/components/HeaderTitle';
import CheckInCard from '~/components/CheckInCard';

import { Container, CheckInButton } from './styles';

import api from '~/services/api';

function CheckIn({isFocused, navigation}) {
  const [checkIns, setCheckIns] = useState([]);
  const studentId = useSelector(state => state.student.student);

  async function loadData() {
    const response = await api.get(`students/${studentId}/checkins`, {
      params: {
        week: true,
      },
    });
    const { checkin } = response.data;

    const data = checkin.map(c => ({
      ...c,
      timeDistance: formatRelative(parseISO(c.createdAt), new Date(), {
        addSuffix: true,
        locale: pt,
      }),
    }));

    setCheckIns(data);
  }


  useEffect(() => {
    if (isFocused) {
      loadData();
    }
  }, [isFocused]);



  async function handleCheckIn() {
    try {
      const response = await api.post(`/students/${studentId}/checkins`);
      const { checkin } = response.data;
      const data = {
        ...checkin,
        timeDistance: formatDistance(parseISO(checkin.createdAt), new Date(), {
          addSuffix: true,
          locale: pt,
        }),
      };
      navigation.navigate('CheckIn');
      return (
        setCheckIns([...checkIns, data]),
        navigation.navigate('CheckIn')
        )



    } catch (err) {
      const { error } = err.response.data;
      Alert.alert('Limite de Check-In', error);
    }
  }

  return (
    <Container>
      <HeaderTitle />

      <CheckInButton onPress={handleCheckIn}>Novo check-in</CheckInButton>
      <FlatList
        data={checkIns}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => <CheckInCard date={item.timeDistance} />}
      />
    </Container>
  );
}

CheckIn.navigationOptions = ({ navigation }) => ({
  header: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('CheckIn');
      }}
    >
      <Icon name="chevron-left" size={50} color="#EE4E62" />
    </TouchableOpacity>
  ),
});

export default withNavigationFocus(CheckIn)
