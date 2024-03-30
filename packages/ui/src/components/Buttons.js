import { Feather } from '@expo/vector-icons';
import { useRef, useState } from 'react';
import { Button, useTheme } from 'react-native-paper';

const LoaderIcon = ({ color }) => {
  return <Feather name="loader" size={24} color={color} />;
};

export const PrimaryBt = ({
  disabled,
  toggle,
  onPress,
  icon,
  children,
  dark: isDark,
  light: isLight,
  style = {},
  isLoading,
}) => {
  const [canPress, setCanPress] = useState(true);
  const debounceTimerRef = useRef();
  const theme = useTheme();
  let { dark } = theme;
  dark = toggle ? !dark : isDark ? true : isLight ? false : dark;

  const handlePress = () => {
    if (canPress && typeof onPress === 'function') {
      onPress();
      setCanPress(false);
      clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = setTimeout(() => setCanPress(true), 600);
    }
  };
  return (
    <Button
      disabled={disabled}
      loading={isLoading}
      icon={
        isLoading === true
          ? () => <LoaderIcon color={dark ? '#ffffff' : '#000000'} />
          : icon
      }
      mode={'contained'}
      onPress={handlePress}
      buttonColor={dark ? '#ffffff' : '#000000'}
      textColor={dark ? '#000000' : '#ffffff'}
      style={{
        // gap: 30,
        // flexDirection: "row",
        // justifyContent: "center",
        // alignItems: "stretch",
        ...style,
      }}
    >
      {children}
    </Button>
  );
};

export const FlushedBt = ({
  disabled,
  toggle,
  onPress,
  icon,
  children,
  dark: isDark,
  light: isLight,
  style = {},
}) => {
  const theme = useTheme();
  let { dark } = theme;
  dark = toggle ? !dark : isDark ? true : isLight ? false : dark;
  const [canPress, setCanPress] = useState(true);
  const debounceTimerRef = useRef();

  const handlePress = () => {
    if (canPress && typeof onPress === 'function') {
      onPress();
      setCanPress(false);
      clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = setTimeout(() => setCanPress(true), 600);
    }
  };
  return (
    <Button
      disabled={disabled}
      icon={icon}
      mode={'text'}
      onPress={handlePress}
      buttonColor={'transparent'}
      textColor={dark ? '#ffffff' : '#000000'}
      style={style}
    >
      {children}
    </Button>
  );
};

export const OutlineBt = ({
  disabled,
  toggle,
  onPress,
  icon,
  children,
  dark: isDark,
  light: isLight,
  style = {},
  isLoading,
}) => {
  const [canPress, setCanPress] = useState(true);
  const debounceTimerRef = useRef();
  const theme = useTheme();
  let { dark } = theme;
  dark = toggle ? !dark : isDark ? true : isLight ? false : dark;

  const handlePress = () => {
    if (canPress && typeof onPress === 'function') {
      onPress();
      setCanPress(false);
      clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = setTimeout(() => setCanPress(true), 600);
    }
  };

  return (
    <Button
      disabled={disabled}
      loading={isLoading}
      icon={
        isLoading
          ? () => <LoaderIcon color={dark ? '#ffffff' : '#000000'} />
          : icon
      }
      mode={'contained'}
      onPress={handlePress}
      buttonColor={dark ? '#000000' : '#ffffff'}
      textColor={dark ? '#ffffff' : '#000000'}
      style={{
        borderWidth: 1,
        borderColor: dark ? '#ffffff' : '#000000',
        ...style,
      }}
    >
      {children}
    </Button>
  );
};

export const SuccessBt = ({
  disabled,
  onPress,
  icon,
  children,
  style = {},
}) => {
  const theme = useTheme();
  const [canPress, setCanPress] = useState(true);
  const debounceTimerRef = useRef();

  const handlePress = () => {
    if (canPress && typeof onPress === 'function') {
      onPress();
      setCanPress(false);
      clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = setTimeout(() => setCanPress(true), 600);
    }
  };
  return (
    <Button
      disabled={disabled}
      icon={icon}
      mode={'contained'}
      onPress={handlePress}
      buttonColor={theme.colors.success}
      textColor={'#ffffff'}
      style={style}
    >
      {children}
    </Button>
  );
};
