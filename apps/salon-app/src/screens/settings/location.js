import { useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { SelectLocation } from "../../components/SelectLocation";
import { URIS } from "../../constants";
import { useAuthContext } from "../../providers";
import { useUpdateShop } from "../../services";

export const Location = () => {
  const queryClient = useQueryClient();
  const { shopData } = useAuthContext();
  const { isPending, mutate } = useUpdateShop({
    onSuccess: async (data) => {
      queryClient.setQueryData([URIS.myShops], (prev) => {
        return prev.map((shop) => (shop.id === data.id ? data : shop));
      });
    },
  });

  const handleSelect = (data) => {
    const formData = new FormData();
    formData.append("ltd", data.location?.latitude);
    formData.append("lng", data.location?.longitude);
    formData.append("id", shopData._id);
    mutate(formData);
  };

  const locationData = useMemo(
    () => ({
      latitude: parseFloat(shopData.ltd),
      longitude: parseFloat(shopData.lng),
    }),
    [shopData]
  );

  return (
    <SelectLocation
      defaultLocation={locationData}
      isLoading={isPending}
      onSelectLocation={handleSelect}
    />
  );
};
