import { FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from '@salon/ui';
export const CurrencySymbol = ({
  secondary,
  toggle,
  light: isLight,
  size,
  color,
}) => {
  let { dark, colors } = useTheme();
  dark = toggle ? !dark : isLight ? !isLight : dark;
  return (
    <FontAwesome5
      name="rupee-sign"
      size={size === 'xs' ? 14 : 20}
      color={
        color ||
        (dark
          ? secondary
            ? colors.gray
            : '#ffffff'
          : secondary
          ? colors.gray
          : '#000000')
      }
    />
  );
};
