import { useNavigation } from "@react-navigation/native";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { View } from "react-native";
import { ConfirmAlert } from "../../components/confirmAlert";
import { URIS } from "../../constants";
import { useCreateShopService } from "../../services";
import { Services } from "../setup/services";

export const AddNewService = () => {
  const [showConfirmModal, setShowConfirmModal] = useState({
    show: false,
    data: null,
  });
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const { isPending, mutate } = useCreateShopService({
    onSuccess: (res) => {
      console.log("Res", res);
      queryClient.setQueryData([URIS.shopServices], (prev) => {
        console.log("update", res, prev);
        return [...prev, ...res];
      });
      setShowConfirmModal({ show: false });
      navigation.navigate("ServiceAddedSuccess");
    },
  });

  const handleAddServices = () => {
    mutate(showConfirmModal.data);
  };

  const handleHideConfirmModal = useCallback(() => {
    setShowConfirmModal({ show: false, data: null });
  }, []);

  return (
    <View>
      <Services
        isLoading={isPending}
        next={({ services }) =>
          setShowConfirmModal({ show: true, data: services })
        }
      />
      {showConfirmModal.show && (
        <ConfirmAlert
          onCancel={handleHideConfirmModal}
          onConfirm={handleAddServices}
          isLoading={isPending}
          headerTitle="Create service"
          description="New services will be available for users to book"
        />
      )}
    </View>
  );
};
