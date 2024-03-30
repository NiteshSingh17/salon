import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useColors, useCreateStyle } from '@salon/hook';
import { Dropdown, PrimaryBt, Text } from '@salon/ui';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Switch } from 'react-native-paper';
import { Container } from '../../components/Container';
import { DAYS_ARRAY } from '../../constants';
import { getTimeDate, getTimeRange } from '../../utils/helper';

const DaysSelector = ({ day, changeDay }) => {
  const style = useCreateStyle(styleSheet);
  const [error, gray] = useColors(['error', 'gray']);

  const timeRanges = useMemo(() => {
    let range = getTimeRange();
    return range.map((time) => ({
      value: time.format('hh:mm a'),
      label: time.format('hh:mm a'),
    }));
  }, []);

  return (
    <View style={style.dayContainer}>
      <View style={style.dayHeader}>
        <Text variant="headlineMedium">{day.name}</Text>
        <Switch
          value={day.isCheck}
          onValueChange={(value) => changeDay('isCheck', value)}
        />
      </View>
      {day.isCheck && (
        <View style={{ paddingBottom: 20, paddingTop: 10 }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={style.inputContainer}>
              <Text style={{ marginBottom: 10, color: gray }}>Start</Text>
              <Dropdown
                value={day.open}
                onChange={(value) => changeDay('open', value)}
                list={timeRanges}
              />
            </View>
            <View style={style.inputContainer}>
              <Text style={{ marginBottom: 10, color: gray }}>End</Text>
              <Dropdown
                value={day.close}
                onChange={(value) => changeDay('close', value)}
                list={timeRanges}
              />
            </View>
          </View>
          {day.breakEnable && (
            <View>
              {/* <Text style={{ marginTop: 30, marginBottom: 10 , color: gray}}>Break</Text> */}
              <View style={{ flexDirection: 'row', marginTop: 20 }}>
                <View style={style.inputContainer}>
                  <Text style={{ marginBottom: 10, color: gray }}>
                    Break Start
                  </Text>
                  <Dropdown
                    value={day.breakStart}
                    onChange={(value) => changeDay('breakStart', value)}
                    list={timeRanges}
                  />
                </View>
                <View style={style.inputContainer}>
                  <Text style={{ marginBottom: 10, color: gray }}>
                    Break End
                  </Text>
                  <Dropdown
                    value={day.breakEnd}
                    onChange={(value) => changeDay('breakEnd', value)}
                    list={timeRanges}
                  />
                </View>
              </View>
            </View>
          )}
          <View style={{ marginTop: 20 }}>
            {day.breakEnable ? (
              <View>
                <TouchableOpacity
                  style={{ flexDirection: 'row' }}
                  onPress={() => changeDay('breakEnable', false)}
                >
                  <MaterialIcons
                    name="delete-outline"
                    size={20}
                    color={error}
                  />
                  <Text style={{ color: gray }}>Remove Break</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                <TouchableOpacity
                  style={{ flexDirection: 'row' }}
                  onPress={() => changeDay('breakEnable', true)}
                >
                  <Ionicons name="add" size={20} color={gray} />
                  <Text style={{ color: gray }}>Add Break</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      )}
    </View>
  );
};

export const Availability = ({ isLoading, data, next }) => {
  const [selectedDays, setSelectedDays] = useState(
    DAYS_ARRAY.map((d) => ({
      name: d,
      isCheck: false,
      open: '09:00 am',
      close: '09:00 pm',
      breakEnable: false,
      breakStart: '01:00 pm',
      breakEnd: '02:00 pm',
    }))
  );

  useEffect(() => {
    if (Array.isArray(data))
      setSelectedDays((prev) =>
        prev.map(
          (day) => data.find((dayData) => dayData.name === day.name) ?? day
        )
      );
  }, [data]);

  const changeSelectedDay = (day, key, value) => {
    setSelectedDays((pre) => [
      ...pre.map((d) => (d.name === day ? { ...d, [key]: value } : d)),
    ]);
  };

  const handleNext = useCallback(() => {
    let filterAvailability = selectedDays.filter((d) => d.isCheck === true);
    filterAvailability = filterAvailability
      .map((time) =>
        time.breakEnable ? time : { ...time, breakStart: null, breakEnd: null }
      )
      .map((time) => {
        return {
          day: DAYS_ARRAY.indexOf(time.name),

          open: time.open ? getTimeDate(time.open).format() : null,
          close: time.close ? getTimeDate(time.close).format() : null,
          breakStart:
            time.breakEnable && time.breakStart
              ? getTimeDate(time.breakStart).format()
              : null,
          breakEnd:
            time.breakEnable && time.breakEnd
              ? getTimeDate(time.breakEnd).format()
              : null,
        };
      });
    next({ avaialbility: filterAvailability });
  }, [next, selectedDays]);

  const style = useCreateStyle(styleSheet);

  const canGoNext =
    selectedDays.find(
      (day) =>
        day.isCheck === true &&
        day.breakEnable === true &&
        (day.breakStart === null || day.breakEnd === null)
    ) === undefined;

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={style.screenTitle}>
          <Text variant="headlineLarge">When are you available</Text>
        </View>
        <View style={style.subTitle}>
          <Text secondary variant="titleSmall">
            Pros who have at least 4 days/week are more likely to get booked.
            clients are booking on weekends!
          </Text>
        </View>
        <View>
          {selectedDays.map((day) => (
            <DaysSelector
              key={day.name}
              day={day}
              changeDay={(key, value) =>
                changeSelectedDay(day.name, key, value)
              }
            />
          ))}
        </View>
        <View style={style.buttonContainer}>
          <PrimaryBt
            isLoading={isLoading}
            disabled={canGoNext === false}
            onPress={handleNext}
          >
            Save Availability
          </PrimaryBt>
        </View>
      </ScrollView>
    </Container>
  );
};

const styleSheet = ({ lightGray }) => ({
  screenTitle: {
    marginTop: 40,
  },
  subTitle: {
    marginTop: 10,
    marginBottom: 40,
  },
  dayContainer: {
    paddingVertical: 10,
    borderBottomColor: lightGray,
    borderBottomWidth: 1,
  },
  dayHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputContainer: {
    width: '50%',
    paddingRight: 6,
  },
  buttonContainer: {
    marginTop: 100,
    marginBottom: 100,
  },
});
