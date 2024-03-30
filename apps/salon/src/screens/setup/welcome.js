import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useCreateStyle } from '@salon/hook';
import { Avatar, PrimaryBt, Text } from '@salon/ui';
import { startCase } from 'lodash';
import { useCallback } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Container } from '../../components/Container';
import { useAuthContext } from '../../providers';

export const Welcome = ({ next }) => {
  const style = useCreateStyle(styleSheet);

  const handleNextStep = useCallback(() => {
    next();
  }, [next]);

  return (
    <SafeAreaView>
      <Container style={style.mainConainer}>
        <View>
          <Header />
          <Steps />
        </View>
        <PrimaryBt onPress={handleNextStep}>Start</PrimaryBt>
      </Container>
    </SafeAreaView>
  );
};

const Header = () => {
  const style = useCreateStyle(styleSheet);
  const { userData } = useAuthContext();
  return (
    <View style={style.headerContainer}>
      <Avatar
        uri={userData?.avatar}
        name={userData?.firstName + ' ' + userData?.lastName}
      />
      <View style={{ padding: 20 }}>
        <Text variant="headlineLarge">
          Welcome {startCase(userData?.firstName)}
        </Text>
        <Text secondary variant="titleSmall">
          Finish setting up your account
        </Text>
      </View>
    </View>
  );
};

const Steps = () => {
  const style = useCreateStyle(styleSheet);
  return (
    <View style={{ paddingTop: 30 }}>
      <Text variant="headlineMedium">
        You're just 2 minutes away from completing your setup!
      </Text>
      <View style={style.stepsContainer}>
        <View style={style.singleStep}>
          <AntDesign name="checkcircle" style={[style.icon, style.checkIcon]} />
          <Text>Create Account</Text>
        </View>
        <View style={style.singleStep}>
          <MaterialIcons name="pending" style={[style.icon]} />
          <Text>Add your location</Text>
        </View>
        <View style={style.singleStep}>
          <MaterialIcons name="pending" style={[style.icon]} />
          <Text>Add your services</Text>
        </View>
        <View style={style.singleStep}>
          <MaterialIcons name="pending" style={[style.icon]} />
          <Text>Managge your Availability</Text>
        </View>
        <View style={style.singleStep}>
          <MaterialIcons name="pending" style={[style.icon]} />
          <Text>Add Images</Text>
        </View>
      </View>
    </View>
  );
};

const styleSheet = ({ primary, secondary, success }) => ({
  mainConainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    paddingBottom: 40,
  },
  headerContainer: {
    flexDirection: 'row',
    paddingVertical: 20,
    alignItems: 'center',
  },
  stepsContainer: {
    paddingHorizontal: 10,
    marginVertical: 40,
    borderWidth: 0,
    borderColor: primary,
    borderRadius: 2,
    gap: 20,
  },
  singleStep: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 27,
    borderRadius: 50,
    marginRight: 15,
    color: primary,
  },
  checkIcon: {
    color: success,
    backgroundColor: secondary,
  },
});
