import { useEffect } from "react";
import { BackHandler } from "react-native";

export const useBackPress = ({ onBack }) => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        return onBack() ?? true;
      }
    );
    return () => backHandler.remove();
  }, [onBack]);
};
