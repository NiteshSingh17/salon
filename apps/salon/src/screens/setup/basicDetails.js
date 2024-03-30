import {
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';
import { useCreateStyle } from '@salon/hook';
import { Checkbox, Input, PrimaryBt, Text } from '@salon/ui';
import { trim } from 'lodash';
import { useCallback, useState } from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Container } from '../../components/Container';
import { GENDERS } from '../../constants';

export const BasicDetails = ({ next }) => {
  const style = useCreateStyle(styleSheet);

  const [details, setDetails] = useState({
    shopName: '',
    about: '',
    phone: null,
    genders: Object.values(GENDERS),
  });

  const changeValue = (key, e) => {
    setDetails((pre) => ({ ...pre, [key]: e }));
  };

  const handleGenderChange = (gender) => {
    if (details.genders.indexOf(gender) !== -1) {
      changeValue(
        'genders',
        details.genders.filter((g) => g !== gender)
      );
    } else {
      changeValue('genders', details.genders.concat(gender));
    }
  };

  const handleAllGenderChange = () => {
    if (Object.keys(GENDERS).length === details.genders.length) {
      changeValue('genders', []);
    } else {
      changeValue('genders', Object.values(GENDERS));
    }
  };

  const canGoToNext =
    trim(details.shopName).length > 0 &&
    details?.phone?.length === 10 &&
    details.genders.length > 0;

  const handleNext = useCallback(() => {
    next({ basic: details });
  }, [details, next]);

  return (
    <SafeAreaView>
      <Container>
        <View style={style.container}>
          <View>
            {/* <ScreenHeader title="Basic Detail" /> */}
            <Text variant="headlineLarge">Basic Detail</Text>
            <View style={{ gap: 10, marginTop: 20 }}>
              <Input
                value={details.shopName}
                onChangeText={(value) => changeValue('shopName', value)}
                bordered={false}
                left={
                  <TextInput.Icon
                    icon={() => (
                      <MaterialCommunityIcons
                        name="shield-home"
                        size={24}
                        color="black"
                      />
                    )}
                  />
                }
                label="Shop Name"
              />
              <Input
                value={details.about}
                onChangeText={(value) => changeValue('about', value)}
                bordered={false}
                left={
                  <TextInput.Icon
                    icon={() => (
                      <AntDesign name="star" size={24} color="black" />
                    )}
                  />
                }
                label="About"
              />
              <Input
                value={details.phone}
                onChangeText={(value) => changeValue('phone', value)}
                bordered={false}
                keyboardType="numeric"
                left={
                  <TextInput.Icon
                    icon={() => (
                      <MaterialIcons name="phone" size={24} color="black" />
                    )}
                  />
                }
                label="Phone Number"
                maxLength={10}
              />
              <View style={style.servicesForContainer}>
                <Text variant="headlineMedium" toggle>
                  services offered for
                </Text>
                <View style={style.checkboxContainer}>
                  <Checkbox
                    checked={
                      Object.keys(GENDERS)?.length === details.genders.length
                    }
                    onChange={handleAllGenderChange}
                    toggle
                    title="All"
                  />
                  {Object.entries(GENDERS).map(([title, value]) => (
                    <Checkbox
                      checked={details.genders.indexOf(value) !== -1}
                      onChange={() => handleGenderChange(value)}
                      key={value}
                      value={value}
                      toggle
                      title={title}
                    />
                  ))}
                </View>
              </View>
            </View>
          </View>
          <View style={style.buttonContainer}>
            <PrimaryBt onPress={handleNext} disabled={canGoToNext === false}>
              <Text toggle>Create Account</Text>
            </PrimaryBt>
          </View>
        </View>
      </Container>
    </SafeAreaView>
  );
};

const styleSheet = ({ primary }) => ({
  container: {
    justifyContent: 'space-between',
    height: '100%',
    paddingTop: 20,
    paddingBottom: 20,
  },
  servicesForContainer: {
    paddingHorizontal: 30,
    paddingVertical: 30,
    backgroundColor: primary,
    borderRadius: 10,
    marginTop: 20,
  },
  checkboxContainer: {
    marginTop: 20,
    marginLeft: -5,
    flexDirection: 'column',
    gap: 12,
  },
  buttonContainer: {
    marginTop: 40,
  },
});
