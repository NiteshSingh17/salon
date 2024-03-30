import { useNavigation } from '@react-navigation/native';
import { useCreateStyle } from '@salon/hook';
import { Avatar, PrimaryBt, Text } from '@salon/ui';
import dayjs from 'dayjs';
import { sumBy } from 'lodash';
import { useMemo } from 'react';
import { View } from 'react-native';
import { Container } from '../../components/Container';
import { CurrencySymbol } from '../../components/CurrencySymbol';
import { useCreateBooking } from '../../services/booking';
import { useShopServices } from '../../services/services';

export const ConfirmBooking = ({ bookingData }) => {
  const style = useCreateStyle(styleSheet);
  const { data: shopServices } = useShopServices();
  const navigation = useNavigation();
  const { mutate, isPending: isCreatingBooking } = useCreateBooking({
    onSuccess: (res) => {
      navigation.navigate('BookingSuccess', {
        bookingId: res._id,
      });
    },
  });

  const servicesData = useMemo(() => {
    let services = shopServices?.filter((service) =>
      bookingData.services.find((serviceId) => serviceId === service._id)
    );
    let startTime = bookingData.time ? dayjs(bookingData.time) : null;
    return (
      services?.map((service) => {
        let time = startTime;
        startTime = startTime?.add(service.duration, 'minutes');
        return { ...service, time: time };
      }) ?? []
    );
  }, [shopServices, bookingData]);

  const totalAmount = sumBy(servicesData, 'price');

  const handleCreateBooking = () => {
    const totalDuration = sumBy(servicesData, 'duration');
    let createData = {
      serviceIds: bookingData.services,
      date: bookingData.selectedTime,
      duration: totalDuration,
      meta: {
        name: bookingData.name,
        email: bookingData.email,
        phone: bookingData.phone,
      },
    };
    mutate(createData);
  };

  return (
    <Container style={style.container}>
      <View style={style.mainContainer}>
        <View style={style.servicesContainer}>
          <Text style={style.headline} variant="headlineLarge">
            Payment Details
          </Text>
          {servicesData.map((service) => (
            <View style={style.serviceContainer} key={service._id}>
              <View
                style={{
                  flexDirection: 'row',
                  gap: 20,
                  alignItems: 'flex-start',
                }}
              >
                <View
                  style={{ justifyContent: 'center', alignItems: 'center' }}
                >
                  <Avatar type="xs" name={service.time?.format('h')} />
                  <Text style={style.minutesTime} variant="textSmall">
                    {service.time?.format('mm a')}
                  </Text>
                </View>
                <View>
                  <Text variant="headlineSmall">{service.name}</Text>
                  <Text variant="textSmall" style={style.minutes}>
                    {service.duration} Minutes
                  </Text>
                </View>
              </View>
              <Text>
                <CurrencySymbol size={'xs'} /> {service.price}
              </Text>
            </View>
          ))}
          {/* <Divider style={style.divider} /> */}
        </View>
        <View>
          <View style={style.totalContainer}>
            <View>
              <Text variant="headlineSmall">Total</Text>
            </View>
            <Text>
              <CurrencySymbol size={'xs'} /> {totalAmount}
            </Text>
          </View>
          <PrimaryBt
            isLoading={isCreatingBooking}
            onPress={handleCreateBooking}
          >
            Create Booking
          </PrimaryBt>
        </View>
      </View>
    </Container>
  );
};

const styleSheet = ({ gray }) => ({
  container: {
    width: '100%',
  },
  headline: {
    marginVertical: 20,
  },
  servicesContainer: {
    gap: 14,
  },
  serviceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  minutes: {
    color: gray,
  },
  divider: {
    marginVertical: 10,
  },
  minutesTime: {
    color: gray,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  mainContainer: {
    height: '100%',
    justifyContent: 'space-between',
  },
});
