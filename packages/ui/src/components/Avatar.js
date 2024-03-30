import { useColors } from '@salon/hook';
import { View } from 'react-native';
import { Avatar as PaperAvatar, useTheme } from 'react-native-paper';

const SIZES = {
  xs: 24,
  sm: 40,
  md: 60,
  lg: 80,
  xl: 100,
};

export const Avatar = ({
  icon,
  uri,
  name,
  type = 'md',
  backgroundColor,
  color,
  onPress,
}) => {
  const getAvatarName = (name = '') => {
    if (!name) return '';
    let splitText = name.split(' ').filter((a) => a.length);
    if (splitText?.length > 1) {
      return splitText[0].at(0) + splitText[1].at(0);
    }
    return splitText[0].slice(0, 2);
  };
  const [darkLight, lightGray] = useColors(['darkLight', 'lightGray']);
  const { dark } = useTheme();
  const size = SIZES[type];
  const avatarBackground = backgroundColor || (dark ? darkLight : lightGray);
  return uri ? (
    <PaperAvatar.Image
      onPress={onPress}
      style={{ borderWidth: 0 }}
      size={size}
      source={{ uri }}
    />
  ) : icon ? (
    <View
      onPress={onPress}
      style={{
        width: size,
        height: size,
        borderRadius: size,
        overflow: 'hidden',
        backgroundColor: avatarBackground,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {icon}
    </View>
  ) : (
    <PaperAvatar.Text
      onPress={onPress}
      style={{
        borderWidth: 0,
        backgroundColor: avatarBackground,
      }}
      color={color || (dark ? '#000000' : '#ffffff')}
      size={size}
      label={getAvatarName(name)}
    />
  );
};
