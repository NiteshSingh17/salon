import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { View } from 'react-native';
import { SelectLocation } from '../../components/SelectLocation';
import { useUpdateProfile } from '../../services/authMe';

export const Location = ({}) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useUpdateProfile({
    onSuccess: (data) => {
      queryClient.setQueryData([URIS.authme], (prev) => {
        return { ...prev, ...data };
      });
    },
  });

  const onSelectLocation = useCallback(({ location }) => {
    mutate({
      ltd: location.latitude,
      lng: location.latitudeDelta,
    });
  }, []);
  return (
    <View>
      <SelectLocation
        isLoading={isPending}
        onSelectLocation={onSelectLocation}
      />
    </View>
  );
};
