import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import { Fontisto, SimpleLineIcons } from '@expo/vector-icons';
import { useColors, useCreateStyle, useIsDarkMode } from '@salon/hook';
import {
  Avatar,
  BottomSlider,
  ImageViewer,
  Input,
  PrimaryBt,
  ScreenContainer,
  ScreenHeader,
  Text,
} from '@salon/ui';
import { useQueryClient } from '@tanstack/react-query';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useMemo, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Chip, Divider, IconButton } from 'react-native-paper';
import { Container } from '../../components/Container';
import { GENDERS, URIS } from '../../constants';
import { useAuthContext } from '../../providers';
import { useUpdateShop } from '../../services';
import { formDataAppendObject } from '../../utils/helper';

export const ProfileSetting = () => {
  const queryClient = useQueryClient();
  const { shopData } = useAuthContext();
  const [viewAvatar, setViewAvatar] = useState(null);
  const isDark = useIsDarkMode();
  const { isPending, mutate } = useUpdateShop({
    onSuccess: async (data) => {
      queryClient.setQueryData([URIS.myShops], (prev) => {
        return prev.map((shop) => (shop.id === data.id ? data : shop));
      });
      setEditDetail({
        key: null,
        value: '',
        type: 'text',
        name: '',
      });
    },
  });
  const [editDetail, setEditDetail] = useState({
    key: null,
    value: '',
    type: 'text',
    name: '',
  });
  const [blue_500, white, darkLight] = useColors([
    'blue_500',
    'white',
    'darkLight',
  ]);
  const style = useCreateStyle(styleSheet);

  const actionItems = useMemo(
    () => [
      {
        title: 'Edit tagline',
        leadingIcon: (props) => (
          <Ionicons name="pricetag-outline" size={20} {...props} />
        ),
        onPress: () =>
          setEditDetail({
            key: 'tagline',
            value: shopData.tagline,
            type: 'text',
            name: 'tagline',
          }),
      },
      {
        title: 'Edit contact',
        leadingIcon: (props) => (
          <SimpleLineIcons name="phone" size={20} {...props} />
        ),
        onPress: () =>
          setEditDetail({
            key: 'contact',
            value: shopData.contact + '',
            type: 'numeric',
            name: 'contact',
          }),
      },
      {
        title: 'Edit email',
        leadingIcon: (props) => <Fontisto name="email" size={20} {...props} />,
        onPress: () =>
          setEditDetail({
            key: 'email',
            value: shopData.email,
            type: 'email-address',
            name: 'email',
          }),
      },
    ],
    [shopData.contact, shopData.email, shopData.tagline]
  );

  const onEditSubmit = (key, newValue) => {
    let formData = new FormData();
    formData.append('id', shopData._id);
    formData.append(key, newValue);
    mutate(formData);
  };

  const handleToogleGender = (gender) => {
    let newGenders = [];
    console.log('press');
    if (shopData.genders.find((g) => g === gender)) {
      newGenders = shopData.genders.filter((g) => g !== gender);
    } else {
      newGenders = [...shopData.genders, gender];
    }

    let formData = new FormData();
    formData.append('id', shopData._id);
    if (newGenders.length > 0) {
      formDataAppendObject(formData, newGenders, 'genders');
    } else {
      formData.append('genders', newGenders);
    }
    mutate(formData);
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      let filename = uri.split('/').pop();

      // Infer the type of the image
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : 'image';

      let imageData = {
        uri,
        name: filename,
        type: type,
      };
      let formData = new FormData();
      formData.append('id', shopData._id);
      formData.append('logo', imageData);
      mutate(formData);
    }
  };

  return (
    <ScreenContainer>
      <ScreenHeader title="Profile" actionItems={actionItems} />
      <ScrollView>
        <Container style={style.detailsContainer}>
          <View style={style.avatarContainer}>
            <View>
              <TouchableOpacity
                onPress={() => setViewAvatar(shopData.logo ? true : false)}
              >
                <Avatar
                  backgroundColor={blue_500}
                  color={white}
                  type="xl"
                  onPress={console.log}
                  uri={shopData.logo}
                  name={shopData.name}
                />
              </TouchableOpacity>
              <View style={style.uploadIcon}>
                <IconButton
                  backgroundColor={isDark ? darkLight : white}
                  mode="contained"
                  onPress={pickImage}
                  icon={(props) => (
                    <MaterialCommunityIcons
                      name="camera-plus-outline"
                      size={24}
                      {...props}
                    />
                  )}
                />
              </View>
            </View>
          </View>
          <View>
            <View style={style.detailContainer}>
              <View>
                <Text style={style.title} secondary variant="textSmall">
                  Shop name
                </Text>
                <Text variant="headlineSmall">{shopData.name}</Text>
              </View>
              <IconButton
                onPress={() =>
                  setEditDetail({
                    key: 'name',
                    value: shopData.name,
                    type: 'text',
                    name: 'name',
                  })
                }
                size={18}
                icon={(props) => <Feather name="edit-2" {...props} />}
              />
            </View>
            <Divider style={style.divider} />
          </View>
          <View>
            <Text style={style.title} secondary variant="textSmall">
              Tagline
            </Text>
            <Text variant="headlineSmall">{shopData.tagline ?? '-'}</Text>
            <Divider style={style.divider} />
          </View>
          <View>
            <Text style={style.title} secondary variant="textSmall">
              Conatct
            </Text>
            <Text variant="headlineSmall">{shopData.contact ?? '-'}</Text>
            <Divider style={style.divider} />
          </View>
          <View>
            <Text style={style.title} secondary variant="textSmall">
              Email
            </Text>
            <Text variant="headlineSmall">{shopData.email ?? '-'}</Text>
            <Divider style={style.divider} />
          </View>

          <View>
            <Text style={style.title} secondary variant="textSmall">
              Genders
            </Text>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              {shopData.genders.map((gender) => (
                <Chip key={gender} onPress={() => handleToogleGender(gender)}>
                  {gender === GENDERS.male
                    ? 'Male'
                    : gender === GENDERS.female
                    ? 'Female'
                    : ''}
                </Chip>
              ))}
              {Object.keys(GENDERS)
                .filter(
                  (g) =>
                    shopData.genders.find((gender) => gender === g) ===
                    undefined
                )
                .map((gender) => (
                  <Chip
                    key={gender}
                    mode="outlined"
                    onPress={() => handleToogleGender(gender)}
                  >
                    {gender === GENDERS.male
                      ? 'Male'
                      : gender === GENDERS.female
                      ? 'Female'
                      : ''}
                  </Chip>
                ))}
            </View>
          </View>
          {editDetail.key !== null && (
            <EditSlider
              show={editDetail.key}
              type={editDetail.type}
              title={editDetail.name}
              defaultValue={editDetail.value}
              isLoading={isPending}
              onSubmit={(value) => onEditSubmit(editDetail.key, value)}
              onClose={() =>
                setEditDetail({
                  key: null,
                  value: '',
                  type: 'text',
                })
              }
            />
          )}
        </Container>
      </ScrollView>

      <ImageViewer
        image={shopData.logo}
        show={viewAvatar}
        onClose={() => setViewAvatar(false)}
      />
    </ScreenContainer>
  );
};

const EditSlider = ({
  show,
  title,
  defaultValue,
  isLoading,
  type,
  onClose,
  onSubmit,
}) => {
  const style = useCreateStyle(styleSheet);
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  return (
    <BottomSlider show={show} header={'Edit ' + title} onClose={onClose}>
      <View style={style.editContainer}>
        <Input
          autoFocus={true}
          onChangeText={setValue}
          value={value}
          keyboardType={type}
        />
        <PrimaryBt isLoading={isLoading} onPress={() => onSubmit(value)}>
          Submit
        </PrimaryBt>
      </View>
    </BottomSlider>
  );
};

const styleSheet = () => ({
  detailsContainer: {
    gap: 20,
  },
  title: {
    marginBottom: 10,
  },
  divider: {
    marginTop: 10,
    padding: 0,
  },
  uploadIcon: {
    position: 'absolute',
    bottom: -10,
    right: '-10%',
  },
  avatarContainer: {
    maxWidth: 'fit-content',
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  detailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'bottom',
  },
  editContainer: {
    paddingHorizontal: 10,
    gap: 20,
    marginBottom: 20,
  },
});
