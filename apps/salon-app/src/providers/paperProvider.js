import { useMaterial3Theme } from "@pchmn/expo-material3-theme";
import { loadAsync } from "expo-font";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import {
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
  configureFonts,
} from "react-native-paper";

export const PaperProviderContainer = ({ children }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const colorScheme = useColorScheme();
  const { theme } = useMaterial3Theme("dark");

  const globalColors = {
    success: "#22c55e",
    error: "#fb923c",
    onError: "#ffffff",
    gray: "#8e8e90",
    lightGray: "#f3f3f2",
    darkGray: "#2D3748",
    gold: "#FCE96A",
    indigo_500: "#6366f1",
    blue_500: "#3b82f6",
    white: "#ffffff",
    black: "#000000",
    darkLight: "#222121",
    rippleColor: "gray",
    dangerLight: "#fee2e2",
    danger: "#ef4444",
  };

  useEffect(() => {
    loadAsync({
      "MartelSans-bold": require("../assets/fonts/MartelSans-SemiBold.ttf"),
      "MartelSans-light": require("../assets/fonts/MartelSans-Light.ttf"),
    }).then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) return null;
  const fontConfig = {
    headlineLarge: {
      // "fontFamily": "MartelSans-bold",
      fontSize: 24,
      fontWeight: "bold",
      letterSpacing: 0,
      lineHeight: 32,
    },
    headlineMedium: {
      // "fontFamily": "MartelSans-bold",
      fontSize: 20,
      fontWeight: "bold",
      letterSpacing: 0,
      lineHeight: 24,
    },
    headlineSmall: {
      // "fontFamily": "MartelSans-bold",
      fontSize: 16,
      fontWeight: "bold",
      letterSpacing: 0,
      lineHeight: 22,
    },
    titleSmall: {
      // "fontFamily": "MartelSans-light",
      fontSize: 14,
      fontWeight: "400",
      letterSpacing: 0.1,
      lineHeight: 20,
    },
    titleLarge: {
      // "fontFamily": "MartelSans-light",
      fontSize: 18,
      fontWeight: "400",
      letterSpacing: 0,
      lineHeight: 20,
    },
    titleMedium: {
      // "fontFamily": "MartelSans-light",
      fontSize: 16,
      fontWeight: "400",
      letterSpacing: 0.15,
      lineHeight: 18,
    },
    textSmall: {
      fontSize: 12,
      fontWeight: "400",
      letterSpacing: 0,
      lineHeight: 16,
    },
  };

  const fontsConfig = configureFonts({ config: fontConfig });

  const paperTheme =
    colorScheme === "dark"
      ? {
          ...MD3DarkTheme,
          fonts: fontsConfig,
          colors: {
            ...theme.dark,
            ...globalColors,
            outline: globalColors.lightGray,
            surface: globalColors.darkLight,
            background: globalColors.black,
            surfaceVariant: "#0F0F0F",
            onSurfaceVariant: "#ffffff",
            primaryContainer: globalColors.darkLight,
            secondaryContainer: globalColors.darkGray,
            onSecondaryContainer: globalColors.white,
            primary: "#ffffff",
            onPrimary: "#000000",
            secondary: "#0F0F0F",
          },
        }
      : {
          ...MD3LightTheme,
          fonts: fontsConfig,
          colors: {
            ...theme.light,
            ...globalColors,
            outline: globalColors.darkGray,
            surface: globalColors.white,
            background: "#fcfcfc",
            surfaceVariant: "#ffffff",
            onSurfaceVariant: "#000000",
            primaryContainer: "#ffffff",
            secondaryContainer: globalColors.lightGray,
            onSecondaryContainer: globalColors.black,
            primary: "#000000",
            onPrimary: "#ffffff",
            secondary: "#ffffff",
          },
        };

  return <PaperProvider theme={paperTheme}>{children}</PaperProvider>;
};
