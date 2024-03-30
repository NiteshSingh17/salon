import { StatusBar } from "expo-status-bar";
import { useColors, useIsDarkMode } from "@salon/hook";

export const AppStatuBar = () => {
  const isDark = useIsDarkMode();
  const [white, black] = useColors(["white", "black"]);

  return (
    <StatusBar
      backgroundColor={isDark ? black : white}
      style={isDark ? "light" : "dark"}
    />
  );
};
