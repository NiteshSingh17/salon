import { useBackPress } from '@salon/hook';
import React, { useCallback, useEffect } from 'react';
import { Dimensions } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export const StepsSlider = ({ children, currentStep, setCurrentStep }) => {
  const trasnlateX = useSharedValue(0);
  const screenWidth = Dimensions.get('window').width;
  const handleBackPress = useCallback(() => {
    // Ref : https://reactnative.dev/docs/backhandler
    if (currentStep === 0) {
      return false;
    } else {
      setCurrentStep((prev) => prev - 1);
      return true;
    }
  }, [currentStep, setCurrentStep]);

  useBackPress({
    onBack: handleBackPress,
  });

  useEffect(() => {
    trasnlateX.value = withTiming(currentStep * screenWidth * -1, {
      duration: 300,
      easing: Easing.inOut(Easing.quad),
    });
  }, [currentStep, screenWidth, trasnlateX]);

  const style = useAnimatedStyle(() => ({
    transform: [{ translateX: trasnlateX.value }],
  }));

  return (
    <Animated.View
      style={[
        style,
        {
          borderWidth: 0,
          height: '100%',
          flex: 1,
          flexDirection: 'row',
          flexGrow: 1,
        },
      ]}
    >
      {React.Children.map(children, (child) =>
        React.cloneElement(child, {
          style: {
            ...child.props.style,
            width: '100%',
            // flex: 1,
            flexGrow: 1,
          },
        })
      )}
    </Animated.View>
  );
};
