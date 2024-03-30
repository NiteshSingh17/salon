import { useColors } from '@salon/hook';
import { Text } from '@salon/ui';
import { TouchableOpacity } from 'react-native';
import { Checkbox as PaperCheckbox, useTheme } from 'react-native-paper';

export const Checkbox = ({
  onChange,
  checked,
  title,
  toggle,
  titleStyle = {},
  dark: isDark,
  light: isLight,
}) => {
  let { dark } = useTheme();
  const gray = useColors('gray');
  dark = toggle ? !dark : isDark ? true : isLight ? false : dark;

  return (
    <TouchableOpacity
      onPress={() => {
        onChange?.(!checked);
      }}
      style={{ flexDirection: 'row', alignItems: 'center' }}
    >
      <PaperCheckbox
        status={checked ? 'checked' : 'unchecked'}
        uncheckedColor={dark ? gray : '#000000'}
        color={dark ? '#ffffff' : '#000000'}
      />
      <Text toggle={toggle} {...titleStyle}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};
