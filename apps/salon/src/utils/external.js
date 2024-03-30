import { Linking, Platform } from "react-native";

export const OpenPhonDialogue = (phoneNumber) => {
  if (Platform.OS === "android") {
    Linking.openURL(`tel:${phoneNumber}`);
    return;
  }

  if (Platform.OS === "ios") {
    Linking.openURL(`telprompt:${phoneNumber}`);
    return;
  }
};

export const SendMail = (email, subject = "", body = "") => {
  return Linking.openURL(`mailto:${email}?subject=${subject}&body=${body}`);
};
