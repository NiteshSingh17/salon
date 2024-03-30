import { TouchableOpacity, View } from "react-native"
import { useTheme } from "react-native-paper"
import { useColors } from "@salon/hook";
import { TextX } from "./Text";
import { Checkbox as PaperCheckbox } from "react-native-paper";
import { useEffect, useState } from "react";

export const Checkbox = ({ onChange, checked, title, toggle, titleStyle = {}, dark: isDark, light: isLight, }) => {
    let { dark } = useTheme();
    const gray = useColors('gray')
    dark = toggle ? !dark :  isDark ? true : isLight ? false : dark;

    return <TouchableOpacity onPress={ () => { onChange?.(!checked) } }  style={{ flexDirection: 'row', alignItems:'center' }}>
    <PaperCheckbox status={ checked ? 'checked' : 'unchecked' } uncheckedColor={ dark  ? gray : '#000000' } color={ dark ? '#ffffff' : '#000000' } />
    <TextX toggle={toggle} {...titleStyle}>{title}</TextX>
</TouchableOpacity>
}