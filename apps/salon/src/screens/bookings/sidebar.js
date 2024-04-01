import { useCreateStyle } from '@salon/hook';
import { Text } from '@salon/ui';
import dayjs from 'dayjs';
import { find, groupBy, map } from 'lodash';
import { memo, useMemo, useState } from 'react';
import { FlatList, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ONE_HOUR_CONTAINER_HEIGHT, TIME_VIEW_WIDTH } from '.';
import { BookingDetailModal } from '../../components/BookingDetailsModal';
import { DATE_FORMATS, TIME_FORMATS } from '../../constants';
import { useShopServices } from '../../services';
import { getTimeRange } from '../../utils/helper';

export const Sidebar = ({ bookings }) => {
  const style = useCreateStyle(styleSheet);
  const { data: shopServices } = useShopServices();
  const [bookingId, setBookingId] = useState(null);
  // const flatListRef = useRef();
  const times = useMemo(() => {
    let ranges = getTimeRange();
    return map(
      groupBy(ranges, (range) => range.format(TIME_FORMATS.hour)),
      (range, time) => {
        let bookingsData = Array.isArray(bookings)
          ? bookings.filter(
              (booking) =>
                dayjs(booking.date).format(TIME_FORMATS.hour) === time
            )
          : [];
        bookingsData = bookingsData.map((booking) => ({
          ...booking,
          services: Array.isArray(shopServices)
            ? shopServices?.filter((service) =>
                find(booking.serviceIds, (id) => service._id === id)
              )
            : [],
        }));
        return {
          lable: time,
          value: range,
          bookings: bookingsData,
        };
      }
    );
  }, [bookings, shopServices]);

  const hideBookingDetail = () => {
    setBookingId(null);
  };
  // const scrollToCurrentTime = () => {
  //   let currentTime = GetTodayDate().format("hh a");
  //   let currentTimeIndex = times.findIndex(
  //     (time) => time.lable === currentTime
  //   );
  //   flatListRef.current.scrollToIndex({ index: currentTimeIndex });
  // };

  return (
    <View
      style={style.container}
      // onLayout={scrollToCurrentTime}
    >
      <FlatList
        keyExtractor={(item) => item.lable}
        // ref={flatListRef}
        windowSize={12}
        // onScrollToIndexFailed={(info) => {
        //   const wait = new Promise((resolve) => setTimeout(resolve, 100));
        //   wait.then(() => {
        //     flatListRef.current?.scrollToIndex({
        //       index: info.index,
        //       animated: true,
        //     });
        //   });
        // }}
        data={times}
        renderItem={(props) => (
          <HourContainer
            showBookingDetail={setBookingId}
            style={style}
            {...props}
          />
        )}
      />
      {bookingId && (
        <BookingDetailModal
          bookingId={bookingId}
          visible={bookingId !== null}
          onDismiss={hideBookingDetail}
        />
      )}
    </View>
  );
};

const HourContainer = memo(
  ({ style, item: { lable, value, bookings }, showBookingDetail }) => {
    return (
      <View style={style.hour}>
        <View style={style.hourConatiner}>
          <Text dark>{lable}</Text>
        </View>
        <View style={{ flex: 1, position: 'relative' }}>
          {value.map((hourMinute, index) => {
            const endTime = dayjs(hourMinute).add(15, 'minutes');
            const minuteBookings = bookings.filter(
              (booking) =>
                dayjs(booking.date).minute() >= hourMinute.minute() &&
                (dayjs(booking.date).minute() < endTime.minute() ||
                  endTime.minute() === 0)
            );
            return (
              <View
                key={hourMinute.format(DATE_FORMATS.full)}
                style={style.hourContainer}
              >
                {minuteBookings.map((booking, bookingIndex) => {
                  const time = dayjs(booking.date);
                  const userName = booking.meta?.name;
                  const hourRatio = booking.duration / 60;
                  let top =
                    index * (ONE_HOUR_CONTAINER_HEIGHT / 4) + bookingIndex * 10;
                  return (
                    <View
                      style={[
                        style.meetingContainer,
                        {
                          top,
                          left: bookingIndex * 60 + index * 2 + 5,
                          minHeight: hourRatio * ONE_HOUR_CONTAINER_HEIGHT,
                        },
                      ]}
                      key={booking._id}
                    >
                      <TouchableOpacity
                        style={{ width: '100%', height: '100%' }}
                        onPress={() => showBookingDetail(booking._id)}
                      >
                        <View>
                          <View style={style.nameContainer}>
                            <Text
                              style={style.name}
                              numberOfLines={1}
                              dark
                              variant="headlineMedium"
                            >
                              {userName}
                            </Text>
                            <Text dark variant="headlineMedium">
                              |
                            </Text>
                            <Text variant="textSmall" dark>
                              {time.format(TIME_FORMATS.full)}
                            </Text>
                          </View>
                          <View style={style.servicesContainer}>
                            {booking.services.map((service) => (
                              <View style={style.serviceName}>
                                <Text light variant="textSmall">
                                  {service.name}
                                </Text>
                              </View>
                            ))}
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>
            );
          })}
        </View>
      </View>
    );
  }
);
const styleSheet = (
  { darkGray, lightGray, indigo_500, darkLight },
  isDark
) => ({
  container: {
    flex: 1,
    backgroundColor: isDark ? darkLight : lightGray,
  },
  hour: {
    flexDirection: 'row',
    alignItems: 'stretch',
    position: 'relative',
  },
  hourConatiner: {
    backgroundColor: isDark ? darkGray : darkGray,
    width: TIME_VIEW_WIDTH,
    height: ONE_HOUR_CONTAINER_HEIGHT, // for 15 minutes gap
  },
  hourContainer: {
    position: 'absolute',
    width: '100%',
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  name: {
    maxWidth: '50%',
  },
  meetingContainer: {
    position: 'absolute',
    backgroundColor: indigo_500,
    paddingHorizontal: 20,
    paddingVertical: 20,
    width: '90%',
    left: 2,
    borderRadius: 6,
    borderWidth: 0,
    borderColor: darkGray,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  serviceName: {
    backgroundColor: lightGray,
    paddingHorizontal: 6,
    paddingVertical: 4,
    borderRadius: 4,
  },
  servicesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginTop: 10,
  },
});
