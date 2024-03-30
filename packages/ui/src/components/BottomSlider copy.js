import { useCreateStyle, useIsDarkMode } from '@salon/hook';
import { Text } from '@salon/ui';
import { useEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Portal } from 'react-native-paper';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export const BottomSlider = ({
  contentStyle,
  show,
  header,
  onClose,
  children,
}) => {
  const topStyle = useSharedValue(100);
  const isDark = useIsDarkMode();

  const style = useCreateStyle(styleSheet);

  const topPos = useDerivedValue(() => {
    return `${topStyle.value}%`;
  });

  const viewStyle = useAnimatedStyle(() => ({
    top: topPos.value,
    backgroundColor: interpolateColor(
      topStyle.value,
      [0, 1, 100],
      [isDark ? '#000b' : '#0004', '#0000', '#0000'],
      'RGB',
      {
        useCorrectedHSVInterpolation: true,
      }
    ),
  }));

  useEffect(() => {
    if (show) {
      topStyle.value = withTiming(0);
    } else {
      topStyle.value = withTiming(100);
    }
  }, [show, topStyle]);
  return (
    <Portal>
      <Animated.View
        style={[
          {
            position: 'absolute',
            width: '100%',
            justifyContent: 'flex-end',
            height: '100%',
            // backgroundColor: "rgba(0, 0, 0, 0.5);",
          },
          viewStyle,
        ]}
      >
        <TouchableOpacity style={{ flex: 1 }} onPress={onClose}>
          <View></View>
        </TouchableOpacity>
        <View style={[style.content, contentStyle ?? {}]}>
          {header && (
            <Text
              variant="headlineMedium"
              style={{
                padding: 20,
                // paddingHorizontal: 20,
              }}
            >
              {header}
            </Text>
          )}
          <View>{children}</View>
        </View>
      </Animated.View>
    </Portal>
  );
};

const styleSheet = ({ secondary }) => ({
  content: {
    backgroundColor: secondary,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});
