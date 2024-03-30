import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import { IconButton } from "react-native-paper";
import { useColors, useIsDarkMode } from "@salon/hook";
import { MenuButton } from "./MenuButton";
import { TextX } from "./Text";

export const ScreenHeader = ({ title, actionItems }) => {
  const isDark = useIsDarkMode();
  const [white, darkLight, rippleColor, lightGray] = useColors([
    "white",
    "darkLight",
    "rippleColor",
    "lightGray",
  ]);
  const navigation = useNavigation();

  return (
    <View
      style={{
        borderBottomWidth: 1,
        backgroundColor: isDark ? "#121212" : white,
        borderBottomColor: isDark ? darkLight : lightGray,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent:
            actionItems?.length > 0 ? "space-between" : "flex-start",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
          }}
        >
          <IconButton
            rippleColor={rippleColor}
            mode="contained"
            backgroundColor={isDark ? "#121212" : white}
            onPress={() => navigation.goBack()}
            icon={() => (
              <Ionicons
                name="arrow-back"
                size={24}
                color={isDark ? "#ffffff" : "#000000"}
              />
            )}
          />
          <TextX variant="titleMedium">{title}</TextX>
        </View>
        {actionItems?.length > 0 && (
          <View>
            <MenuButton items={actionItems} />
          </View>
        )}
      </View>
    </View>
  );
};
