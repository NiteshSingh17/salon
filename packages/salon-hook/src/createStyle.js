import { map } from "lodash";
import { useMemo } from "react";
import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

export const useCreateStyle = (styleFunction, otherParams) => {
  const theme = useTheme();
  const style = useMemo(() => {
    return StyleSheet.create(
      styleFunction(theme.colors, theme.dark, otherParams)
    );
  }, [otherParams, styleFunction, theme.colors, theme.dark]);
  return style;
};

export const useIsDarkMode = () => {
  const theme = useTheme();
  return theme.dark;
};

export const useColors = (chooseColors) => {
  const { colors } = useTheme();
  const selectedColors = map(
    Array.isArray(chooseColors) ? chooseColors : [chooseColors],
    (c) => colors[c]
  );
  return Array.isArray(chooseColors) ? selectedColors : selectedColors[0];
};
