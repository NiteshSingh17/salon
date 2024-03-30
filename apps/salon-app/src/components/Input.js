import dayjs from "dayjs";
import { useState } from "react";
import { Pressable, View } from "react-native";
import { TextInput, useTheme } from "react-native-paper";
import {
  DatePickerModal,
  en,
  registerTranslation,
} from "react-native-paper-dates";
import { DATE_FORMATS } from "../constants";
import { useColors, useCreateStyle } from "@salon/hook";
import { TextX } from "./Text";

import { MaterialIcons } from "@expo/vector-icons";
registerTranslation("en", en);

export const Input = ({ required, label, light, bordered = true, ...rest }) => {
  const [darkLight, error] = useColors([
    "darkLight",
    "lightGray",
    "error",
  ]);
  let { dark } = useTheme();
  dark = light ? false : dark;
  return (
    <View>
      <View style={{ flexDirection: "row", gap: 4 }}>
        <TextX style={{ marginBottom: 10 }}>{label}</TextX>
        {required && <TextX color={error}>*</TextX>}
      </View>
      <TextInput
        autoCorrect={false}
        autoCapitalize="none"
        underlineColor="transparent"
        theme={{
          colors: {
            surfaceVariant: dark ? "#000000" : "#ffffff",
            onSurfaceVariant: dark ? "#ffffff" : "#000000",
            primary: dark ? "#ffffff" : "#000000",
            secondary: dark ? "#ffffff" : "black",
          },
        }}
        style={{
          borderWidth: bordered ? 1 : 0,
          borderColor: dark ? darkLight : "#EBEBEB",
          borderTopLeftRadius: 4,
          borderTopRightRadius: 4,
          borderRadius: 4,
          overflow: "hidden",
          backgroundColor: dark ? darkLight : "transparent",
        }}
        {...rest}
      />
    </View>
  );
};

export const DatePicker = ({ children, date, onSelect }) => {
  const style = useCreateStyle(styleSheet);
  const [isOpen, setIsOpen] = useState(false);
  const [primary] = useColors(["primary"]);
  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSelect = (value) => {
    onSelect(value);
    handleClose();
  };
  return (
    <View>
      <Pressable onPress={() => setIsOpen(true)}>
        {children || (
          <View style={style.datePickerBox}>
            <MaterialIcons name="calendar-today" size={24} color={primary} />
            <TextX>{dayjs(date).format(DATE_FORMATS.large)}</TextX>
          </View>
        )}
      </Pressable>
      <DatePickerModal
        locale="en"
        mode="single"
        visible={isOpen}
        onDismiss={handleClose}
        date={dayjs(date).toDate()}
        onConfirm={handleSelect}
        inputMode="start"
      />
    </View>
  );
};

const styleSheet = ({ darkLight }, isDark) => ({
  datePickerBox: {
    padding: 20,
    borderWidth: 1,
    borderColor: isDark ? darkLight : "#EBEBEB",
    borderRadius: 4,
    overflow: "hidden",
    backgroundColor: isDark ? darkLight : "transparent",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
