import { AntDesign } from '@expo/vector-icons';
import { useColors, useCreateStyle } from '@salon/hook';
import { TouchableOpacity, View } from 'react-native';
import {
  Dropdown as DropDown,
  MultiSelect,
} from 'react-native-element-dropdown';
import { Text } from 'react-native-paper';

export const Dropdown = ({
  loading,
  value,
  placeholder = ' ',
  list,
  onChange,
}) => {
  const style = useCreateStyle(styleSheet);
  return (
    <DropDown
      autoScroll={true}
      style={style.dropdown}
      placeholderStyle={style.placeholderStyle}
      selectedTextStyle={style.selectedTextStyle}
      data={list}
      // maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={loading ? 'loading...' : placeholder}
      value={value}
      mode="default"
      onChange={(d) => {
        onChange(d?.value, d);
      }}
    />
  );
};

export const MutliSelectDropdown = ({
  loading,
  value,
  placeholder = ' ',
  list,
  onChange,
}) => {
  const style = useCreateStyle(styleSheet);
  const [secondary] = useColors(['secondary']);

  const renderItem = (item) => {
    return (
      <View style={style.item}>
        <Text style={style.selectedTextStyleLableMultiple}>{item.label}</Text>
      </View>
    );
  };

  return (
    <MultiSelect
      style={style.dropdownMutliselect}
      placeholderStyle={style.placeholderStyleMutlitselect}
      selectedTextStyle={style.selectedTextStyleMutilselect}
      inputSearchStyle={style.inputSearchStyle}
      iconStyle={style.iconStyle}
      data={list}
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={loading ? 'loading...' : placeholder}
      value={value}
      onChange={onChange}
      renderItem={renderItem}
      renderSelectedItem={(item, unSelect) => (
        <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
          <View style={style.selectedStyle}>
            <Text style={style.textSelectedStyle}>{item.label}</Text>
            <AntDesign color={secondary} name="delete" size={17} />
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

const styleSheet = ({ primary, secondary, darkLight, black }, dark) => ({
  dropdown: {
    backgroundColor: dark ? darkLight : '#e2e8f0',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: dark ? darkLight : '#e2e8f0',
  },
  selectedTextStyle: {
    color: primary,
  },
  selectedTextStyleLableMultiple: {
    color: black,
  },
  placeholderStyle: {
    color: black,
  },
  container: { padding: 16 },
  dropdownMutliselect: {
    height: 50,
    shadowColor: '#000',
    backgroundColor: dark ? darkLight : '#e2e8f0',
    padding: 10,
    borderRadius: 10,
  },
  placeholderStyleMutlitselect: {
    fontSize: 16,
    color: primary,
  },
  selectedTextStyleMutilselect: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    color: secondary,
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    backgroundColor: primary,
    marginTop: 8,
    marginRight: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  textSelectedStyle: {
    color: secondary,
    marginRight: 5,
    fontSize: 16,
  },
});
