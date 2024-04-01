import { useDebouncedValue } from '@salon/hook';
import { ScreenContainer } from '@salon/ui';
import { useState } from 'react';
import { View } from 'react-native';
import { ProgressIndicator } from '../../components/ProgressIndicator';
import { DATE_FORMATS } from '../../constants';
import { useGetDateBooking } from '../../services';
import { GetTodayDate } from '../../utils/helper';
import { Header } from './header';
import { Sidebar } from './sidebar';

export const TIME_VIEW_WIDTH = 60;
export const ONE_HOUR_CONTAINER_HEIGHT = 160;
export const CALENDAR_DATE_FORMATES = {
  threeDay: 'threeDay',
  week: 'week',
};

export const Bookings = () => {
  const [selectedDay, setSelectedDay] = useState(GetTodayDate());
  const derivedDate = useDebouncedValue(selectedDay);
  const { data: bookings, isFetching } = useGetDateBooking(
    derivedDate.format(DATE_FORMATS.server)
  );

  return (
    <ScreenContainer>
      <View
        style={{
          paddingTop: 2,
          flex: 1,
          flexDirection: 'column',
        }}
      >
        <Header selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
        <View
          style={{
            flex: 1,
            position: 'relative',
            height: '100%',
          }}
        >
          <ProgressIndicator visible={isFetching} />
          <Sidebar bookings={bookings} />
        </View>
      </View>
    </ScreenContainer>
  );
};
