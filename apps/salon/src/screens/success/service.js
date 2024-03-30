import { Octicons } from '@expo/vector-icons';
import { CommonActions } from '@react-navigation/native';
import { useColors, useCreateStyle } from '@salon/hook';
import { PrimaryBt, ScreenContainer, Text } from '@salon/ui';
import { View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

export const ServiceAddedSuccessScreen = ({ navigation }) => {
  const style = useCreateStyle(styleSheet);
  const [success] = useColors(['success']);

  const handleGoToHome = () => {
    let resetAction = CommonActions.reset({
      index: 0,
      routes: [{ name: 'Main' }],
    });
    navigation.dispatch(resetAction);
  };

  return (
    <ScreenContainer>
      <Animated.View
        style={style.animatedContainer}
        entering={FadeInDown.duration(500)}
      >
        <Animated.View entering={FadeInDown.delay(100).duration(500)}>
          <View style={style.successIconContainer}>
            <View>
              <Octicons
                name="check-circle-fill"
                size={80}
                color={success}
                style={style.successIcon}
              />
            </View>
            <Text style={style.successMessage} variant="headlineLarge">
              Services created
            </Text>
            <View style={style.actionContainer}>
              <PrimaryBt onPress={handleGoToHome}>
                <Text toggle>Go to home</Text>
              </PrimaryBt>
            </View>
          </View>
        </Animated.View>
      </Animated.View>
    </ScreenContainer>
  );
};

const styleSheet = ({ white }) => ({
  animatedContainer: {
    height: '100%',
  },
  successIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    height: '100%',
  },
  successMessage: {
    marginTop: 20,
  },
  successIcon: {
    backgroundColor: white,
    borderRadius: 80,
  },
  actionContainer: {
    paddingTop: 20,
  },
});
