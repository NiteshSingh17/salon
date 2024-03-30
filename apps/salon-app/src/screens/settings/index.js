import { View } from "react-native";
import { GallerySetting } from "./gallery";
import { ProfileSetting } from "./profile";
import { ServiceSetting } from "./services";
import { TimingSetting } from "./timing";
import { Location } from "./location";

export const Settings = ({ route }) => {
  const { path } = route.params;
  return (
    <View>
      {path === "profile" ? (
        <ProfileSetting />
      ) : path === "service" ? (
        <ServiceSetting />
      ) : path === "timing" ? (
        <TimingSetting />
      ) : path === "gallery" ? (
        <GallerySetting />
      ) : path === "address" ? (
        <Location />
      ) : null}
    </View>
  );
};
