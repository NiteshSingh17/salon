import { StackActions } from '@react-navigation/native';
import { ScreenContainer } from '@salon/ui';
import { useCallback, useMemo } from 'react';
import Animated, { SlideInLeft, SlideInRight } from 'react-native-reanimated';
import { Availability } from './availability';
import { BasicDetails } from './basicDetails';
import { Final } from './final';
import { Images } from './images';
import { Location } from './location';
import { Services } from './services';
import { Welcome } from './welcome';

export const Setup = ({ route, navigation }) => {
  const currentStep = useMemo(() => {
    return parseInt(route.params?.step) || 1;
  }, [route.params?.step]);

  const handleNextStep = useCallback(
    (data) => {
      let pushAction = StackActions.push('Setup', {
        step: currentStep + 1,
        salonData: { ...(route.params?.salonData ?? {}), ...data },
      });
      navigation.dispatch(pushAction);
    },
    [navigation, currentStep, route.params]
  );

  const Steps = {
    1: <Welcome next={handleNextStep} />,
    2: <Location next={handleNextStep} />,
    3: (
      <ScreenContainer>
        <Services next={handleNextStep} />
      </ScreenContainer>
    ),
    4: (
      <ScreenContainer>
        <Availability next={handleNextStep} />
      </ScreenContainer>
    ),
    5: (
      <ScreenContainer>
        <Images next={handleNextStep} />
      </ScreenContainer>
    ),
    6: <BasicDetails next={handleNextStep} />,
    7: <Final data={route.params?.salonData} next={handleNextStep} />,
  };

  return (
    <Animated.View entering={SlideInRight} exiting={SlideInLeft}>
      {Steps[currentStep]}
    </Animated.View>
  );
};
