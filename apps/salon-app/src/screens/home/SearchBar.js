import { useNavigation } from '@react-navigation/native';
import { useCreateStyle } from '@salon/hook';
import { Container } from '@salon/ui';
import { Pressable, View } from 'react-native';
import { TextInput } from 'react-native-paper';

export const SearchBar = () => {
  const navigation = useNavigation();
  const style = useCreateStyle(styleSheet);
  const handleClick = () => {
    navigation.navigate({ name: 'Search' });
  };

  return (
    <Container>
      <View style={style.searchContainer}>
        <Pressable onPress={handleClick}>
          <TextInput
            mode="outlined"
            editable={false}
            outlineStyle={style.searchInputOutline}
            style={style.searchInput}
            placeholder="search shops near you"
          />
        </Pressable>
      </View>
    </Container>
  );
};

const styleSheet = ({ secondaryContainer }) => ({
  searchContainer: {
    marginVertical: 40,
  },
  searchInputOutline: {
    borderWidth: 0,
    backgroundColor: secondaryContainer,
  },
  searchInput: {
    backgroundColor: 'white',
    borderColor: 'none',
    borderWidth: 0,
    borderRadius: 100,
    overflow: 'hidden',
  },
});
