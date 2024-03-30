import { useCreateStyle } from '@salon/hook';
import {
  DatePicker,
  Dropdown,
  Input,
  MutliSelectDropdown,
  PrimaryBt,
  Text,
} from '@salon/ui';
import dayjs from 'dayjs';
import { useCallback, useMemo } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Container } from '../../components/Container';
import { DATE_FORMATS, TIME_FORMATS } from '../../constants';
import { useShopServices } from '../../services/services';
import { getTimeRange } from '../../utils/helper';

export const CreateBookingForm = ({
  bookingData,
  setBookingData,
  handleNext,
}) => {
  const { data: shopServices, isFetching: loadingServices } = useShopServices();

  const style = useCreateStyle(styleSheet);
  const handleSelectDate = ({ date }) => {
    setBookingData((prev) => ({
      ...prev,
      date: dayjs(date),
      time: null,
      selectedTime: null,
    }));
  };
  const changeValue = useCallback(
    (key, value) => {
      setBookingData((pre) => ({ ...pre, [key]: value }));
    },
    [setBookingData]
  );

  const handleSelectServices = (services) =>
    setBookingData((prev) => ({ ...prev, services }));

  const servicesList = useMemo(() => {
    return (
      shopServices?.map((service) => ({
        value: service._id,
        label: service.name,
      })) ?? []
    );
  }, [shopServices]);

  let timeRanges = useMemo(() => {
    let range = getTimeRange(bookingData.date);
    return range.map((time) => ({
      label: time.format(TIME_FORMATS.full),
      value: time.format(DATE_FORMATS.full),
      originalTime: time,
    }));
  }, [bookingData.date]);

  const canNext =
    bookingData.services.length > 0 &&
    bookingData.name?.trim()?.length > 0 &&
    bookingData.selectedTime !== null;

  return (
    <Container noVerticalPadding style={style.container}>
      <ScrollView
        style={style.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <Text style={style.headline} variant="headlineLarge">
          Create Booking
        </Text>
        <View style={style.formContainer}>
          <Input
            label="Customer Name"
            required
            value={bookingData.name}
            onChangeText={(value) => changeValue('name', value)}
          />
          <View>
            <Text style={style.inputLable}>Services</Text>
            <MutliSelectDropdown
              loading={loadingServices}
              value={bookingData.services}
              list={servicesList}
              placeholder="Select services"
              onChange={handleSelectServices}
            />
          </View>
          <View>
            <Text style={style.inputLable}>Date</Text>
            <DatePicker date={bookingData.date} onSelect={handleSelectDate} />
          </View>
          <View>
            <Text style={style.inputLable}>Time</Text>
            <Dropdown
              value={bookingData.time}
              onChange={(_, time) =>
                setBookingData((prev) => ({
                  ...prev,
                  time: time.value,
                  selectedTime: time.originalTime,
                }))
              }
              list={timeRanges}
            />
          </View>
          <Input
            label="Email"
            keyboardType="email-address"
            value={bookingData.email}
            onChangeText={(value) => changeValue('email', value)}
          />
          <Input
            label="Phone no"
            keyboardType="number-pad"
            maxLength={10}
            value={bookingData.phone}
            onChangeText={(value) => changeValue('phone', value)}
          />
          <PrimaryBt
            disabled={canNext === false}
            style={style.nextButton}
            onPress={handleNext}
          >
            Proceed to payment
          </PrimaryBt>
        </View>
      </ScrollView>
    </Container>
  );
};

const styleSheet = () => ({
  container: {
    width: '100%',
    height: '100%',
  },
  headline: {
    marginTop: 20,
  },
  scrollView: {},
  formContainer: {
    marginTop: 30,
    gap: 20,
  },
  inputLable: {
    marginBottom: 10,
  },
  nextButton: {
    marginBottom: 20,
  },
});
