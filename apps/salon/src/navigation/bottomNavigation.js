/* eslint-disable react-native/no-unused-styles */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {
  AntDesign,
  Entypo,
  FontAwesome,
  Ionicons,
  MaterialIcons,
  SimpleLineIcons,
} from '@expo/vector-icons';
import { useColors } from '@salon/hook';
import { Text, TouchableRipple, useTheme } from '@salon/ui';
import { StyleSheet, View } from 'react-native';
import { Bookings } from '../screens/bookings';
import { HomeScreen } from '../screens/home';
import { SettingsTab } from '../screens/settings/settingTab';

const Tab = createBottomTabNavigator();

export const TabNavigataion = () => {
  const theme = useTheme();
  console.log('theme', theme.dark);
  return (
    <Tab.Navigator
      theme={theme}
      tabBar={(props) => <BottomTab isDarkMode={theme.dark} {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Bookings" component={Bookings} />
      <Tab.Screen name="Search" component={NavigationBt} />
      <Tab.Screen name="History" component={NavigationBt} />
      <Tab.Screen name="Setting" component={SettingsTab} />
    </Tab.Navigator>
  );
};

const NavigationBt = () => {
  // const navigation = useNavigation();
  // const { bees, add } = useBeeStore();
  // const handleClick = () => {
  //     navigation.goBack();
  // }
  // useEffect( () => {
  //     console.log("run effect")
  // },[])
  return (
    <>
      <Text>ssss</Text>
      <Text>Some</Text>
      {/* <PrimaryBt>Back</PrimaryBt> */}
    </>
  );
};

export const BottomTab = ({ isDarkMode, state, descriptors, navigation }) => {
  const style = styleSheet(isDarkMode);
  const rippleColor = useColors('rippleColor');
  const handlePress = (route, isFocused) => {
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      // The `merge: true` option makes sure that the params inside the tab screen are preserved
      navigation.navigate({ name: route.name, merge: true });
    }
  };

  const inActiveColor = '#A0AEC0';
  const activeColor = isDarkMode ? 'white' : '#000000';
  const TAB_ICONS = {
    Home: {
      true: <Entypo name="home" size={24} color={activeColor} />,
      false: <SimpleLineIcons name="home" size={24} color={inActiveColor} />,
    },
    Bookings: {
      true: <Ionicons name="library" size={24} color={activeColor} />,
      false: (
        <Ionicons name="library-outline" size={24} color={inActiveColor} />
      ),
    },
    Search: {
      true: <FontAwesome name="search" size={24} color={activeColor} />,
      false: <AntDesign name="search1" size={24} color={inActiveColor} />,
    },
    History: {
      true: <MaterialIcons name="history" size={24} color={activeColor} />,
      false: <MaterialIcons name="history" size={24} color={inActiveColor} />,
    },
    Setting: {
      true: <Ionicons name="settings" size={24} color={activeColor} />,
      false: (
        <Ionicons name="settings-outline" size={24} color={inActiveColor} />
      ),
    },
  };

  return (
    <View style={[style.container]}>
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
        }}
      >
        {state &&
          state.routes &&
          state.routes?.map((route, index) => {
            const { options } = descriptors[route.key];
            const isFocused = index === state.index;
            let label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;
            return (
              <TouchableRipple
                rippleColor={rippleColor}
                key={route.key}
                style={[
                  isFocused ? style.activeTab : style.inActiveTab,
                  style.tab,
                ]}
                onPress={() => handlePress(route, isFocused)}
              >
                <View>
                  <View style={{ alignItems: 'center' }}>
                    {TAB_ICONS[label][isFocused]}
                  </View>
                  <View>
                    <Text
                      style={{
                        color: isFocused ? activeColor : inActiveColor,
                        fontSize: 12,
                      }}
                    >
                      {label}
                    </Text>
                  </View>
                </View>
              </TouchableRipple>
            );
          })}
      </View>
    </View>
  );
};
const styleSheet = (isDark) =>
  StyleSheet.create({
    tab: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 10,
      paddingVertical: 5,
    },
    container: {
      width: '100%',
      maxHeight: '250px',
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: isDark ? '#000000' : '#ffffff',
      paddingVertical: 0,
    },
  });
