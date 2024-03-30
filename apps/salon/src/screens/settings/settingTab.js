import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useColors, useCreateStyle } from '@salon/hook';
import { Avatar, ScreenContainer, Text } from '@salon/ui';
import { Fragment } from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Divider, TouchableRipple } from 'react-native-paper';
import { useAuthContext } from '../../providers';

export const SettingsTab = () => {
  const style = useCreateStyle(styleSheet);
  const { shopData } = useAuthContext();
  const [primary, blue_500] = useColors(['primary', 'blue_500']);
  const navigation = useNavigation();

  const Options = [
    {
      title: 'Profile',
      path: 'profile',
      icon: <AntDesign name="form" size={18} color={primary} />,
      desc: 'name and contact',
    },
    {
      title: 'Services',
      path: 'service',
      icon: <Entypo name="add-to-list" size={18} color={primary} />,
      desc: 'services price and name',
    },
    {
      title: 'Timing',
      path: 'timing',
      icon: <AntDesign name="clockcircleo" size={18} color={primary} />,
      desc: 'opening and closing timings',
    },
    {
      title: 'Gallery',
      path: 'gallery',
      icon: <Ionicons name="image" size={18} color={primary} />,
      desc: 'service images',
    },
    {
      title: 'Address',
      path: 'address',
      icon: <Ionicons name="location-sharp" size={18} color={primary} />,
      desc: 'location and landmark',
    },
  ];

  const handleClick = (path) => {
    navigation.navigate({ name: 'Settings', params: { path } });
  };

  return (
    <ScreenContainer>
      <ScrollView style={style.scrollContainer}>
        <View style={style.headerContainer}>
          <Avatar
            color="white"
            backgroundColor={blue_500}
            type={'md'}
            name={shopData.name}
          />
          <View style={{ flexGrow: 1, paddingRight: 20 }}>
            <View style={style.nameConatiner}>
              <Text numberOfLines={1} variant="headlineMedium">
                {shopData.name}
              </Text>
            </View>
            <Text secondary>{shopData.email}</Text>
          </View>
          <View>
            <AntDesign name="right" size={24} color={primary} />
          </View>
        </View>
        <View>
          <View style={{ height: '100%' }}>
            {Options.map((option) => (
              <Fragment key={option.title}>
                <TouchableRipple onPress={() => handleClick(option.path)}>
                  <View style={style.settingItem}>
                    <Avatar type={'sm'} icon={option.icon} />
                    <View>
                      <Text variant="headlineSmall">{option.title}</Text>
                      <Text secondary>{option.desc}</Text>
                    </View>
                  </View>
                </TouchableRipple>
                <Divider />
              </Fragment>
            ))}
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

const styleSheet = ({ primaryContainer, secondary }) => ({
  scrollContainer: {
    height: '100%',
    backgroundColor: secondary,
  },
  headerContainer: {
    padding: 20,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    gap: 10,
    backgroundColor: primaryContainer,
  },
  settingItem: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  nameConatiner: {
    maxWidth: '90%',
  },
});
