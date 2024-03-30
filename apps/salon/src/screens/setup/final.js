import { FontAwesome } from '@expo/vector-icons';
import { useColors, useCreateStyle } from '@salon/hook';
import { PrimaryBt, Text } from '@salon/ui';
import dayjs from 'dayjs';
import * as SecureStore from 'expo-secure-store';
import { useCallback } from 'react';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { LOCAL_STORAGE_CONSTANT } from '../../constants';
import { useCreateAccount, useRenewToken } from '../../services';
import { useMyShops } from '../../services/shops';
import { formDataAppendObject } from '../../utils/helper';

export const Final = ({ data }) => {
  const success = useColors('success');
  const style = useCreateStyle(styleSheet);
  const { refetch } = useMyShops(false);
  const { mutate: renewToken } = useRenewToken({
    onSuccess: async (token) => {
      await SecureStore.setItemAsync(LOCAL_STORAGE_CONSTANT.token, token);
    },
  });
  const { isPending, mutate } = useCreateAccount({
    onSuccess: async () => {
      try {
        await renewToken();
      } finally {
        refetch();
      }
    },
  });

  const handelCreateAccount = useCallback(async () => {
    const createData = {
      name: data.basic.shopName,
      tagline: data.basic.about,
      contact: parseInt(data.basic.phone),
      ltd: data.location?.latitude,
      lng: data.location?.longitude,
    };
    let formData = new FormData();
    Object.entries(createData).forEach(([key, value]) => {
      if (value !== undefined) {
        formData.append(key, value);
      }
    });
    data.basic.genders.map((value) => formData.append('genders[]', value));
    data.images.map((image) => formData.append('images', image));

    const availability =
      Array.isArray(data.avaialbility) === true && data.avaialbility?.length > 0
        ? data.avaialbility.map((time) => ({
            ...time,
            open: dayjs(time.open).toDate(),
            close: dayjs(time.close).toDate(),
            breakStart: time.breakStart
              ? dayjs(time.breakStart).toDate()
              : null,
            breakEnd: time.breakEnd ? dayjs(time.breakEnd).toDate() : null,
          }))
        : undefined;
    availability?.forEach((timing) =>
      formData.append('timings', JSON.stringify(timing))
    );
    const services = data.services.map((service) => ({
      name: service.name,
      desc: service.desc,
      duration: service.duration ? parseInt(service.duration) : 0,
      price: service.price ? parseInt(service.price) : 0,
      serviceTypeId: service.parentService,
    }));
    formDataAppendObject(formData, services, 'shopServices');
    mutate(formData);
  }, [data, mutate]);

  return (
    <Animated.View
      entering={FadeInDown.delay(600).duration(500)}
      style={style.conatiner}
    >
      <FontAwesome name="check-circle" size={50} color={success} />
      <Text variant="headlineLarge" style={{ marginTop: 20 }}>
        Finish Setup
      </Text>
      <PrimaryBt
        icon="check"
        onPress={handelCreateAccount}
        style={{ marginTop: 20 }}
        isLoading={isPending}
      >
        Create My Account
      </PrimaryBt>
    </Animated.View>
  );
};

const styleSheet = () => ({
  conatiner: {
    height: '100%',

    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {},
});
