import { GENDERS } from '@salon/constant';
import { useCreateStyle } from '@salon/hook';
import {
  Avatar,
  Container,
  Dropdown,
  FormContainer,
  Input,
  Label,
  PrimaryBt,
  Text,
} from '@salon/ui';
import { useQueryClient } from '@tanstack/react-query';
import * as ImagePicker from 'expo-image-picker';
import { useCallback, useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { URIS } from '../../constants';
import { useAuthMe, useUpdateProfile } from '../../services/authMe';

const genderList = [
  {
    value: GENDERS.male,
    label: 'Male',
  },
  {
    value: GENDERS.female,
    label: 'Female',
  },
];

export const CompleteProfile = ({ next }) => {
  const { data: userData } = useAuthMe(true);
  const queryClient = useQueryClient();

  const style = useCreateStyle(styleSheet);
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    gender: null,
  });
  const { mutate, isPending } = useUpdateProfile({
    onSuccess: (data) => {
      queryClient.setQueryData([URIS.authme], (prev) => {
        return { ...prev, ...data };
      });
      console.log('onSuccess', next);
      next();
    },
  });
  const [avtarData, setAvatarData] = useState(null);

  const changeValue = useCallback((key, value) => {
    setData((pre) => ({ ...pre, [key]: value }));
  }, []);

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
      setAvatarData(imageData);
    }
  };

  const handleSaveData = () => {
    let formData = new FormData();
    if (avtarData !== null) {
      formData.append('avatar', avtarData);
    }
    formData.append('firstName', data.firstName);
    formData.append('lastName', data.lastName);
    formData.append('contact', data.phone);
    formData.append('gender', data.gender);
    mutate(formData);
  };

  const isDisabled =
    !data.firstName ||
    !data.lastName ||
    !data.gender ||
    !data.phone ||
    data.phone.length !== 10;

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      firstName: userData?.firstName ?? '',
      lastName: userData?.lastName ?? '',
    }));
  }, [userData]);

  return (
    <Container style={style.container}>
      <ScrollView showsVerticalScrollIndicator style={style.scrollView}>
        <View style={style.content}>
          <View>
            <Text style={style.headingText} variant="headlineLarge">
              Complete Your Profile
            </Text>
            <Text style={style.headingText} secondary>
              provide more information about yourself so that we can offer you
              an even better experience
            </Text>
          </View>
          <View>
            <View>
              <View style={style.avatarContainer}>
                <TouchableOpacity onPress={pickImage}>
                  <Avatar
                    type="xl"
                    uri={avtarData?.uri ?? ''}
                    name={data.firstName + ' ' + data.lastName ?? ''}
                  />
                </TouchableOpacity>
              </View>
              <FormContainer>
                <Input
                  label="First Name"
                  value={data.firstName}
                  onChangeText={(value) => changeValue('firstName', value)}
                />
                <Input
                  label="Last Name"
                  value={data.lastName}
                  onChangeText={(value) => changeValue('lastName', value)}
                />
                <Input
                  label="Phone number"
                  keyboardType="number-pad"
                  maxLength={10}
                  value={data.phone}
                  onChangeText={(value) => changeValue('phone', value)}
                />
                <View>
                  <Label>Gender</Label>
                  <Dropdown
                    value={data.gender}
                    onChange={(value) => changeValue('gender', value)}
                    list={genderList}
                  />
                </View>
              </FormContainer>
            </View>
          </View>
          <PrimaryBt
            isLoading={isPending}
            disabled={isDisabled === true}
            onPress={handleSaveData}
          >
            Complete Profile
          </PrimaryBt>
        </View>
      </ScrollView>
    </Container>
  );
};

const styleSheet = () => ({
  scrollView: {
    height: '100%',
  },
  container: {
    height: '100%',
  },
  content: {
    height: '100%',
    paddingTop: 40,
    paddingBottom: 40,
    gap: 20,
    justifyContent: 'space-between',
  },
  headingText: {
    textAlign: 'center',
  },
  avatarContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
});
