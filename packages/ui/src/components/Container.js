import { View } from "react-native";

export const Container = ({
  noVerticalPadding,
  noHorizontalPadding,
  style,
  children,
  ...props
}) => {
  return (
    <View
      style={{
        paddingHorizontal: noHorizontalPadding ? 0 : 20,
        paddingBottom: noVerticalPadding ? 0 : 10,
        paddingTop: noVerticalPadding ? 0 : 10,
        ...(style ?? {}),
      }}
      {...props}
    >
      {children}
    </View>
  );
};
