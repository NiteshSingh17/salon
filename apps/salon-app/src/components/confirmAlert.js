import { View } from "react-native";
import { useBackPress, useCreateStyle } from "@salon/hook";
import { BottomSlider } from "./BottomSlider";
import { FlushedBt, PrimaryBt } from "./Buttons";
import { TextX } from "./Text";

export const ConfirmAlert = ({
  headerTitle,
  description,
  onCancel,
  onConfirm,
  isLoading,
}) => {
  useBackPress({
    onBack: onCancel,
  });
  const style = useCreateStyle(styleSheet);
  return (
    <BottomSlider onClose={onCancel} show={true}>
      <View style={style.container}>
        <TextX variant="headlineLarge">{headerTitle ?? "Confirm"}</TextX>
        <TextX style={style.description}>
          {description ?? "Are you sure you want to continue"}
        </TextX>
        <View style={style.actionButton}>
          <FlushedBt onPress={onCancel} style={style.secondaryAction}>
            Cancel
          </FlushedBt>
          <PrimaryBt
            isLoading={isLoading}
            onPress={onConfirm}
            style={style.primaryAction}
          >
            <TextX toggle>Continue</TextX>
          </PrimaryBt>
        </View>
      </View>
    </BottomSlider>
  );
};

const styleSheet = () => ({
  container: {
    padding: 20,
  },
  description: {
    marginTop: 10,
  },
  actionButton: {
    paddingVertical: 40,
    flexDirection: "row",
  },
  secondaryAction: {
    flexGrow: 0.5,
  },
  primaryAction: {
    flexGrow: 1,
  },
});
