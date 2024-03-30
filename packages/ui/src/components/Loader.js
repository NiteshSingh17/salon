import { Feather } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { ActivityIndicator, useTheme } from "react-native-paper";

export const ScreenLoader = ({ isFetching, children }) => {
  // handle error
  const theme = useTheme();
  return isFetching ? (
    <View
      style={[
        styleSheet.loaderContainer,
        { backgroundColor: theme.colors.secondary },
        // ...(style ?? {}),
      ]}
    >
      <ActivityIndicator color={theme.colors.primary} animating={true} />
    </View>
  ) : (
    children
  );
};

export const LoaderIcon = ({ color }) => {
  return <Feather name="loader" size={24} color={color} />;
};

const styleSheet = StyleSheet.create({
  loaderContainer: {
    zIndex: 9,
    height: "100%",
    width: "100%",
    direction: "row",
    justifyContent: "center",
  },
});
