import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useColors, useCreateStyle } from '@salon/hook';
import { IconButton, Text } from '@salon/ui';
import { useMemo } from 'react';
import { View } from 'react-native';
import { HEADER_HEIGHT } from '.';
import { Container } from '../../components/Container';
import { MenuButton } from '../../components/MenuButton';

export const Header = ({ selectedDay, setSelectedDay }) => {
  const [secondary, gray, rippleColor] = useColors([
    'secondary',
    'gray',
    'rippleColor',
  ]);
  const style = useCreateStyle(styleSheet);
  const handleNextDay = () => {
    setSelectedDay((pre) => pre.add(1, 'day'));
  };
  const handlePrevDay = useMemo(
    () => () => {
      setSelectedDay((pre) => pre.subtract(1, 'day'));
    },
    [setSelectedDay]
  );
  return (
    <Container noHorizontalPadding>
      <View
        style={{
          height: HEADER_HEIGHT,
          flexDirection: 'row',
          paddingVertical: 0,
          alignItems: 'baseline',
          justifyContent: 'space-between',
        }}
      >
        <View style={style.dateContainer}>
          <Text variant="headlineLarge">{selectedDay.format('DD MMM')}</Text>
          <Text variant="titleSmall" style={{ color: gray }}>
            {selectedDay.format('dddd, YYYY')}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <IconButton
            rippleColor={rippleColor}
            style={style.iconButton}
            size={20}
            onPress={handlePrevDay}
            icon={() => <AntDesign name="left" color={secondary} />}
          />
          <IconButton
            rippleColor={rippleColor}
            onPress={handleNextDay}
            style={style.iconButton}
            size={20}
            icon={() => <AntDesign name="right" color={secondary} />}
          />
          <HeaderMenu />
        </View>
      </View>
    </Container>
  );
};

const HeaderMenu = () => {
  const [primary] = useColors(['primary']);
  const navigation = useNavigation();

  const menuItems = [
    {
      title: 'Add Booking',
      leadingIcon: () => <Ionicons name="add" size={20} color={primary} />,
      onPress: () => navigation.navigate('CreateBooking'),
    },
  ];

  return (
    <MenuButton
      icon={<Entypo name="dots-three-vertical" size={24} color={primary} />}
      items={menuItems}
    />
  );
};

const styleSheet = ({ primary }) => ({
  iconButton: {
    backgroundColor: primary,
  },
  dateContainer: {
    paddingLeft: 10,
  },
});
