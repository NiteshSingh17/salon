import { View } from "react-native";
import { Divider, TouchableRipple } from "react-native-paper";
import { useColors, useIsDarkMode } from "@salon/hook";
import { BottomSlider } from "./BottomSlider";
import { TextX } from "./Text";

export const FastActions = ({ header, actions, show, onClose }) => {
  const isDark = useIsDarkMode();
  const [lightGray, darkGray] = useColors(["lightGray", "darkGray"]);
  return (
    <BottomSlider
      style={{
        borderRadius: 10,
        marginHorizontal: 10,
        marginBottom: 10,
      }}
      show={show}
      header={header}
      onClose={onClose}
    >
      <View>
        {actions.map((action, index) => (
          <View key={action.title}>
            <TouchableRipple
              onPress={
                action.actionHanlder
                  ? () => {
                      action.actionHanlder();
                      onClose();
                    }
                  : null
              }
              style={{
                paddingHorizontal: 10,
                paddingVertical: 20,
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <View style={{ marginRight: 16 }}>{action.icon}</View>
                <TextX variant="headlineSmall">{action.title}</TextX>
              </View>
            </TouchableRipple>
            {index + 1 !== actions.length && (
              <Divider
                style={{
                  backgroundColor: isDark ? darkGray : lightGray,
                }}
              />
            )}
          </View>
        ))}
      </View>
    </BottomSlider>
  );
};
