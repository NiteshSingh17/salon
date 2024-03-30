import {
  AntDesign,
  FontAwesome,
  MaterialIcons,
  Octicons,
} from '@expo/vector-icons';
import { useColors, useCreateStyle } from '@salon/hook';
import { PrimaryBt, Text } from '@salon/ui';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Chip } from 'react-native-paper';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { CurrencySymbol } from '../../components/CurrencySymbol';
import { useBooking, useShopServices } from '../../services';

import { CommonActions } from '@react-navigation/native';
import { ScreenContainer, ScreenLoader } from '@salon/ui';
import dayjs from 'dayjs';
import { DATE_FORMATS, TIME_FORMATS } from '../../constants';

export const BookingSuccessScreen = ({ route, navigation }) => {
  const style = useCreateStyle(styleSheet);
  const [primary, success] = useColors(['primary', 'success']);

  const bookingId = route.params.bookingId;
  const { data: bookingData, isFetching } = useBooking(bookingId);
  const { data: shopServices, isFetching: isFetchingShopServices } =
    useShopServices();
  const servicesData =
    shopServices?.filter((service) =>
      bookingData?.serviceIds?.find(
        (bookServiceId) => bookServiceId === service._id
      )
    ) ?? [];

  const handleGoToHome = () => {
    let resetAction = CommonActions.reset({
      index: 0,
      routes: [{ name: 'Main' }],
    });
    navigation.dispatch(resetAction);
  };

  return (
    <ScreenContainer>
      <ScreenLoader isFetching={isFetching || isFetchingShopServices}>
        <Animated.View
          style={style.animatedContainer}
          entering={FadeInDown.duration(500)}
        >
          <Animated.View entering={FadeInDown.delay(100).duration(500)}>
            <View style={style.successIconContainer}>
              <View>
                <Octicons
                  name="feed-rocket"
                  size={60}
                  color={success}
                  style={style.rocketIconStyle}
                />
              </View>
              <Text style={style.successMessage} variant="headlineLarge">
                Booking confirmed
              </Text>
            </View>
          </Animated.View>
          <ScrollView
            style={style.detailsContainer}
            showsVerticalScrollIndicator={false}
          >
            <View style={style.detail}>
              <Text variant="headlineMedium">{bookingData?.meta?.name}</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={style.detail}>
                {servicesData.map((service) => (
                  <Chip key={service._id} mode="outlined">
                    {service.name}
                  </Chip>
                ))}
              </View>
            </ScrollView>

            <View style={style.detail}>
              <AntDesign name="clockcircle" size={20} color={primary} />
              <Text variant="titleMedium" style={style.time}>
                {dayjs(bookingData?.date).format(TIME_FORMATS.full)}
              </Text>
              <Text variant="titleMedium" style={style.detailsText}>
                | {dayjs(bookingData?.date).format(DATE_FORMATS.large)}
              </Text>
            </View>
            <View style={style.detail}>
              <MaterialIcons name="email" size={20} color={primary} />
              <Text variant="titleMedium" style={style.detailsText}>
                {bookingData?.meta?.email || 'not provided'}
              </Text>
            </View>
            <View style={style.detail}>
              <FontAwesome name="phone" size={20} color={primary} />
              <Text variant="titleMedium" style={style.detailsText}>
                {bookingData?.meta?.phone || 'not provided'}
              </Text>
            </View>
            <View style={style.detail}>
              <CurrencySymbol />
              <Text variant="titleMedium" style={style.detailsText}>
                {bookingData?.amount}
              </Text>
            </View>
          </ScrollView>
          <View style={style.buttonConainer}>
            <PrimaryBt onPress={handleGoToHome}>Go To Home</PrimaryBt>
          </View>
        </Animated.View>
      </ScreenLoader>
    </ScreenContainer>
  );
};

const styleSheet = ({ primary, darkLight, gray, white }, isDark) => ({
  animatedContainer: {
    height: '100%',
  },
  successIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  successMessage: {
    marginTop: 20,
  },
  detailsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    flexGrow: 1,
    alignSelf: 'stretch',
    backgroundColor: isDark ? darkLight : white,
  },
  detail: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 10,
    alignItems: 'center',
  },
  time: {
    color: primary,
  },
  detailsText: {
    color: gray,
  },
  buttonConainer: {
    padding: 20,
    backgroundColor: isDark ? darkLight : white,
  },
  rocketIconStyle: {
    backgroundColor: white,
    borderRadius: 80,
  },
});
