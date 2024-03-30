import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useColors, useCreateStyle } from '@salon/hook';
import { IconButton, ScreenContainer } from '@salon/ui';
import { useState } from 'react';
import { View } from 'react-native';
import { Container } from '../../components/Container';
import { FastActions } from '../../components/FastActions';

export const HomeScreen = () => {
  const [showBottomModal, setShowBottomModal] = useState(false);

  const [blue_500, error, primary] = useColors([
    'blue_500',
    'error',
    'primary',
  ]);
  const navigation = useNavigation();
  const style = useCreateStyle(styleSheet);

  const PRIMARY_ACTIONS = [
    {
      title: 'Create new booking',
      icon: (
        <MaterialCommunityIcons
          name="view-grid-plus-outline"
          size={24}
          color={blue_500}
        />
      ),
      actionHanlder: () => navigation.navigate('CreateBooking'),
    },
    {
      title: 'View today bookings',
      icon: <Ionicons name="eye-outline" size={24} color={primary} />,
    },
    {
      title: 'Pending Invitations',
      icon: (
        <MaterialCommunityIcons
          name="clock-time-five-outline"
          size={24}
          color={error}
        />
      ),
    },
  ];

  return (
    <ScreenContainer>
      <Container style={{ height: '100%', width: '100%' }}>
        <View
          style={{
            marginTop: 30,
            position: 'absolute',
            bottom: '2%',
            right: '2%',
          }}
        >
          <IconButton
            mode="contained"
            style={style.iconButton}
            onPress={() => setShowBottomModal(true)}
            icon={() => <Ionicons name="add" color="white" size={24} />}
          />
          <FastActions
            header="Select Action"
            show={showBottomModal}
            onClose={() => setShowBottomModal(false)}
            actions={PRIMARY_ACTIONS}
          />
        </View>
      </Container>
    </ScreenContainer>
  );
};

const styleSheet = ({ indigo_500 }) => ({
  iconButton: {
    backgroundColor: indigo_500,
  },
});
