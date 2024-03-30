import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { useCallback, useEffect, useState } from "react";
import { Image, View } from "react-native";
import { IconButton } from "react-native-paper";
import { useBackPress, useColors, useCreateStyle } from "@salon/hook";
import { BottomSlider } from "./BottomSlider";
import { TextX } from "./Text";

export const ImageViewer = ({ image, show, header, onClose, onDelete }) => {
  const style = useCreateStyle(styleSheet, onDelete ? true : false);
  const [prevImage, setPrevImage] = useState(image);
  const [primary, danger] = useColors(["primary", "danger"]);

  useEffect(() => {
    if (show) setPrevImage(image);
    else {
      let timer = window.setTimeout(() => {
        setPrevImage(null);
      }, 200);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [show, image]);

  const handleBack = useCallback(() => {
    onClose();
    if (show) {
      return true;
    }
    return false;
  }, [onClose, show]);

  useBackPress({
    onBack: handleBack,
  });

  return (
    <BottomSlider
      contentStyle={style.bottomSlider}
      show={show}
      header={header ?? ""}
      onClose={handleBack}
    >
      <View style={style.closeButton}>
        <IconButton
          onPress={onClose}
          icon={() => <AntDesign name="close" size={24} color={primary} />}
        />
      </View>
      <View style={style.containerStyle}>
        <Image
          source={{ uri: prevImage }}
          style={{
            width: "100%",
            aspectRatio: 1, // Maintain the aspect ratio of the image
          }}
          resizeMode="contain"
        />
      </View>
      {onDelete && (
        <View style={style.actionButtonContainer}>
          <View style={style.actionButton}>
            <View onPress={onDelete} style={[style.action]}>
              <IconButton
                onPress={onDelete}
                icon={() => (
                  <MaterialCommunityIcons
                    name="delete"
                    size={20}
                    color={danger}
                  />
                )}
              />
              <TextX style={style.deleteText} variant="textSmall">
                Delete
              </TextX>
            </View>
          </View>
        </View>
      )}
    </BottomSlider>
  );
};

const styleSheet = (_colors, _isDark, hasActions) => ({
  bottomSlider: {
    position: "absolute",
    bottom: 0,
    flex: 1,
    paddingTop: 10,
    paddingBottom: hasActions ? 0 : 20,
  },
  containerStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    alignItems: "flex-end",
    marginBottom: 20,
  },
  actionButtonContainer: {
    paddingTop: 20,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  actionButton: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    flex: 1,
  },
  action: {
    gap: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteText: {
    marginTop: -16,
  },
});
