import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useCreateStyle } from '@salon/hook';
import { ImageViewer, PrimaryBt, Text } from '@salon/ui';
import * as ImagePicker from 'expo-image-picker';
import { useCallback, useEffect, useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Container } from '../../components/Container';
import { MINIMUM_GALLARY_IMAGES_COUNT } from '../../constants';

export const Images = ({ isLoading, value, next }) => {
  const [perviewImage, setPerviewImage] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (value) {
      setImages(value);
    } else {
      setImages([
        { uri: '', type: '', name: '' },
        { uri: '', type: '', name: '' },
        { uri: '', type: '', name: '' },
        { uri: '', type: '', name: '' },
      ]);
    }
  }, [value]);

  const canNext =
    images.filter((image) => image.uri?.length > 0)?.length >=
    MINIMUM_GALLARY_IMAGES_COUNT;

  const handleImageClick = (index) => {
    if (images[index].uri === '') {
      pickImage(index);
    } else {
      setPerviewImage(images[index].uri);
    }
  };

  const handleDelete = () => {
    setImages((prev) => {
      return prev.filter((image) => image.uri !== perviewImage);
    });
    setPerviewImage(null);
  };

  const pickImage = async (index) => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImages((pre) => {
        const uri = result.assets[0].uri;
        let filename = uri.split('/').pop();

        // Infer the type of the image
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : 'image';
        if (index === -1) {
          pre = [
            ...pre,
            {
              uri,
              name: filename,
              type: type,
            },
          ];
        } else {
          pre[index] = {
            uri,
            name: filename,
            type: type,
          };
        }
        return [...pre];
      });
    }
  };

  const handleNext = useCallback(() => {
    if (canNext) {
      next({ images });
    }
  }, [canNext, images, next]);

  const style = useCreateStyle(styleSheet);
  return (
    <ScrollView>
      <Container>
        <View style={style.mainContainer}>
          <View>
            <View style={style.screenTitle}>
              <Text variant="headlineLarge">Add photos of your work</Text>
            </View>
            <View style={style.subTitle}>
              <Text secondary variant="titleSmall">
                Having a profile with a minimum of 4 photos can increase your
                chances of getting a booking by 3 times.
              </Text>
            </View>
            <View style={style.imagesParentElement}>
              {images.map((image, index) => (
                <View key={index + image?.uri} style={style.boxContainer}>
                  <TouchableOpacity
                    onPress={() => handleImageClick(index)}
                    style={style.imageContainer}
                  >
                    {image.uri ? (
                      <Image source={{ uri: image.uri }} style={style.image} />
                    ) : (
                      <FontAwesome name="image" size={24} color="black" />
                    )}
                  </TouchableOpacity>
                </View>
              ))}
              <View style={style.boxContainer}>
                <TouchableOpacity
                  onPress={() => pickImage(-1)}
                  style={style.imageContainer}
                >
                  <MaterialIcons name="add" size={30} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{ marginTop: 40 }}>
            <PrimaryBt
              isLoading={isLoading}
              disabled={!canNext}
              onPress={handleNext}
            >
              Save Images
            </PrimaryBt>
          </View>
        </View>
      </Container>
      <ImageViewer
        image={perviewImage}
        show={perviewImage ? true : false}
        onDelete={handleDelete}
        onClose={() => setPerviewImage(null)}
      />
    </ScrollView>
  );
};

const styleSheet = ({ lightGray }) => ({
  mainContainer: {
    height: '100%',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  screenTitle: {
    marginTop: 40,
  },
  subTitle: {
    marginTop: 10,
    marginBottom: 50,
  },
  imagesParentElement: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  boxContainer: {
    width: '50%',
    paddingRight: 10,
    paddingBottom: 20,
  },
  imageContainer: {
    backgroundColor: lightGray,
    minHeight: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});
