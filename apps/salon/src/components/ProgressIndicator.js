import { useEffect, useRef } from "react";
import { Dimensions } from "react-native";
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { useCreateStyle } from "@salon/hook";

export const ProgressIndicator = ({ visible }) => {
  const width = useSharedValue(0);
  const height = useSharedValue(0);
  const translateX = useSharedValue(0);
  const screenWidth = Dimensions.get("window").width;
  const style = useCreateStyle(styleSheet);
  const animationCancelTimout = useRef(null);

  useEffect(() => {
    if (visible) {
      clearTimeout(animationCancelTimout.current);
      cancelAnimation(width);
      cancelAnimation(translateX);
      height.value = 0;
      width.value = 0;
      translateX.value = 0;
      height.value = withTiming(4, { duration: 400 });
      const startTime = new Date().getTime();
      width.value = withRepeat(withTiming(400, { duration: 2000 }), -1);
      translateX.value = withRepeat(
        withDelay(1000, withTiming(screenWidth + 300, { duration: 1000 })),
        -1
      );
      return () => {
        const endTime = new Date().getTime();
        let ms = endTime - startTime > 2000 ? 0 : 2000 - (endTime - startTime);
        height.value = withTiming(0, { duration: 700 });
        animationCancelTimout.current = setTimeout(() => {
          cancelAnimation(width);
          cancelAnimation(translateX);
          translateX.value = 0;
          width.value = 0;
        }, ms);
      };
    }
  }, [translateX, width, screenWidth, visible, height]);

  const widthCalculateStyle = useDerivedValue(() => width.value + "%");
  const translateXCalculateStyle = useDerivedValue(() => translateX.value);

  const viewStyle = useAnimatedStyle(() => ({
    width: widthCalculateStyle.value,
    transform: [{ translateX: translateXCalculateStyle.value }],
    height: height.value,
  }));

  return (
    <Animated.View style={style.container}>
      <Animated.View style={[style.loader, viewStyle]}></Animated.View>
    </Animated.View>
  );
};

const styleSheet = ({ blue_500 }) => ({
  container: {
    position: "absolute",
    left: 0,
    top: 0,
    zIndex: 10000,
    width: "100%",
  },
  loader: {
    backgroundColor: blue_500,
    borderRadius: 10,
  },
});
