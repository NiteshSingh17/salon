import { ScreenContainer, ScreenHeader } from '@salon/ui';
import { useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { URIS } from '../../constants';
import { useAuthContext } from '../../providers';
import { useUpdateShop } from '../../services';
import { getImageMetaData, isLocalImage } from '../../utils/helper';
import { Images } from '../setup/images';

export const GallerySetting = () => {
  const { shopData } = useAuthContext();
  const queryClient = useQueryClient();
  const { isPending, mutate } = useUpdateShop({
    onSuccess: async (data) => {
      queryClient.setQueryData([URIS.myShops], (prev) => {
        return prev.map((shop) => (shop.id === data.id ? data : shop));
      });
    },
  });

  const imagesData = useMemo(() => {
    return shopData.images.map(getImageMetaData);
  }, [shopData.images]);

  const handleSave = ({ images }) => {
    let formData = new FormData();
    const localImages = images.filter((image) => isLocalImage(image.uri));
    const prevImages = images.filter(
      (image) => isLocalImage(image.uri) === false
    );
    formData.append('id', shopData._id);
    localImages.map((image) => formData.append('newImages', image));
    prevImages.map((image) => formData.append('images', image.uri));
    mutate(formData);
  };

  return (
    <ScreenContainer>
      <ScreenHeader title="Gallery" />
      <Images isLoading={isPending} next={handleSave} value={imagesData} />
    </ScreenContainer>
  );
};
