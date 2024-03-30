import Animated, { SlideInLeft, SlideInRight } from "react-native-reanimated";

export const Setup = () => {
  return (
    <Animated.View entering={SlideInRight} exiting={SlideInLeft}>
      welcome
    </Animated.View>
  );
};
