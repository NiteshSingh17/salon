import { GLOBAL_URIS } from '@salon/constant';
import { useCreateStyle } from '@salon/hook';
import { PrimaryBt } from '@salon/ui';
import * as SecureStore from 'expo-secure-store';
import * as WebBrowser from 'expo-web-browser';
import { useCallback, useEffect } from 'react';
import { Image, Text, View } from 'react-native';
import { GOOGLE_SIGN_UP_URL } from 'react-native-dotenv';
import { useTheme } from 'react-native-paper';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { URL } from 'react-native-url-polyfill';
import { LOCAL_STORAGE_CONSTANT } from '../../constants';
import { useAuthMe } from '../../services/authMe';

export const SignUpScreen = () => {
  return (
    <View style={{ flex: 1 }}>
      <Header />
      <LoginButton />
    </View>
  );
};

const LoginButton = () => {
  const { refetch } = useAuthMe(false);
  const style = useCreateStyle(styleSheet);

  const handleLoginWithGoogle = useCallback(
    () =>
      (async () => {
        const result = await WebBrowser.openAuthSessionAsync(
          GOOGLE_SIGN_UP_URL,
          GLOBAL_URIS.app
        );
        if (result.type === 'success') {
          const url = new URL(result.url);
          const params = new URLSearchParams(url.search);
          const token = params.get('token');
          await SecureStore.setItemAsync(
            LOCAL_STORAGE_CONSTANT.token,
            token
          ).then(refetch);
        }
      })(),
    [refetch]
  );
  return (
    <View style={style.loginSection}>
      <PrimaryBt light icon="google" onPress={handleLoginWithGoogle}>
        Continue With Google
      </PrimaryBt>
    </View>
  );
};

const Header = () => {
  const theme = useTheme();
  const style = useCreateStyle(styleSheet);
  return (
    <View
      style={[style.header, style[theme.dark ? 'headerDark' : 'headerLight']]}
    >
      <Image1 />
    </View>
  );
};

const Image1 = () => {
  const theme = useTheme();
  const opacity = useSharedValue(0);
  const opacityStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  useEffect(() => {
    opacity.value = withTiming(1, {
      duration: 1000,
    });
  }, [opacity]);

  return (
    <Animated.View style={[opacityStyle, { marginVertical: 20 }]}>
      <View>
        <Image
          style={[{ width: '100%', height: '90%' }]}
          source={require('../../assets/images/loginHeader1.jpg')}
        />
        <View style={{ marginTop: -20 }}>
          <Text
            style={{
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 40,
              color: theme?.colors.primary,
            }}
          >
            Salon
          </Text>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 10,
              color: theme?.colors.primary,
            }}
          >
            Book your salon online.
          </Text>
        </View>
      </View>
    </Animated.View>
  );
};

const styleSheet = () => ({
  header: {
    flex: 1,
  },
  headerLight: {
    backgroundColor: '#ffffff',
    color: '#000000',
  },
  headerDark: {
    backgroundColor: '#000000',
    color: '#ffffff',
  },
  loginSection: {
    borderTopWidth: 0,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200,
    backgroundColor: '#F7FAFC',
  },
  loginHeader: {
    fontWeight: 'bold',
    paddingVertical: 10,
    fontSize: 15,
    color: 'rgba(0, 0, 0, 0.6)',
  },
});
