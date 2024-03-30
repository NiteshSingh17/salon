import { Text as PaperText, useTheme } from "react-native-paper";

export const Text = ({
  secondary,
  toggle,
  dark: isDark,
  light: isLight,
  variant = "titleSmall",
  style,
  children,
  color,
  numberOfLines
}) => {
  let { dark, colors } = useTheme();
  dark = toggle ? !dark : isDark ? true : isLight ? false : dark;

  return (
    <PaperText
      variant={variant}
      numberOfLines={numberOfLines}
      style={{
        color: color
          ? color
          : dark
          ? secondary
            ? colors.gray
            : "#ffffff"
          : secondary
          ? colors.gray
          : "#000000",
        ...(style ?? {}),
      }}
    >
      {children}
    </PaperText>
  );
};
