import { StackActions } from '@react-navigation/native';
import { useCallback, useMemo } from 'react';
import Animated, { SlideInLeft, SlideInRight } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CompleteProfile } from './completeProfile';
import { Location } from './location';

export const Setup = ({ route, navigation }) => {
  const currentStep = useMemo(() => {
    return parseInt(route.params?.step) || 1;
  }, [route.params?.step]);

  const handleNextStep = useCallback(() => {
    let pushAction = StackActions.push('Setup', {
      step: currentStep + 1,
    });
    navigation.dispatch(pushAction);
  }, [navigation, currentStep]);

  const Steps = {
    1: <CompleteProfile next={handleNextStep} />,
    2: <Location />,
  };

  return (
    <SafeAreaView>
      <Animated.View entering={SlideInRight} exiting={SlideInLeft}>
        {Steps[currentStep]}
      </Animated.View>
    </SafeAreaView>
  );
};
