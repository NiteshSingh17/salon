import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Divider, IconButton } from "react-native-paper";
import { Container } from "../../components/Container";
import { CurrencySymbol } from "../../components/CurrencySymbol";
import { MenuButton } from "../../components/MenuButton";
import { ScreenContainer } from "../../components/ScreenContainer";
import { ScreenHeader } from "../../components/ScreenHeader";
import { TextX } from "../../components/Text";
import { URIS } from "../../constants";
import { useColors, useCreateStyle } from "@salon/hook";
import { useDeleteShopService, useShopServices } from "../../services";
import { ServiceAddModal } from "../setup/services";

export const ServiceSetting = () => {
  const { data, isFetching } = useShopServices();
  const style = useCreateStyle(styleSheet);
  const [editServiceModal, setEditServiceModal] = useState(null);
  const [danger] = useColors(["danger"]);
  const deleteServiceId = useRef();
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  const { isPending, mutate } = useDeleteShopService({
    onSuccess: () => {
      queryClient.setQueryData([URIS.shopServices], (prev) => {
        return prev.filter(
          (service) => service._id !== deleteServiceId.current
        );
      });
      deleteServiceId.current = null;
    },
  });

  const handleDeleteItem = (id) => {
    console.log("handleDeleteItem", deleteServiceId);
    deleteServiceId.current = id;
    mutate({ id });
  };

  const getActionItems = (serviceId) => [
    {
      title: "Delete",
      leadingIcon: () => (
        <MaterialIcons name="delete-outline" size={20} color={danger} />
      ),
      onPress: () => handleDeleteItem(serviceId),
    },
  ];

  const headerActionItems = [
    {
      title: "Add new service",
      leadingIcon: (props) => <Ionicons name="add" size={24} {...props} />,
      onPress: () => {
        navigation.navigate("AddService");
      },
    },
  ];

  const handleEditService = (data) => {
    setEditServiceModal({
      ...data,
      price: Number(data.price ?? 0).toString(),
      duration: Number(data.duration ?? 0).toString(),
    });
  };

  return (
    <ScreenContainer isLoading={isFetching || isPending}>
      <ScreenHeader actionItems={headerActionItems} title="Services" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Container
          noHorizontalPadding
          noVerticalPadding
          style={style.detailsContainer}
        >
          {data?.map((service) => (
            <View key={service._id} style={style.serviceContainer}>
              <View style={style.service}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <TextX variant="headlineSmall">{service.name}</TextX>
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 0,
                      justifyContent: "flex-end",
                      padding: 0,
                      alignItems: "center",
                    }}
                  >
                    <IconButton
                      mode="contained"
                      onPress={() => handleEditService(service)}
                      size={16}
                      icon={(props) => (
                        <MaterialIcons name="mode-edit" size={18} {...props} />
                      )}
                    />
                    <MenuButton items={getActionItems(service._id)} />
                  </View>
                </View>
                {service.desc !== undefined && service.desc !== "" && (
                  <TextX secondary variant="textSmall" style={style.desc}>
                    {service.desc}
                  </TextX>
                )}
                <TextX style={style.price} secondary>
                  <CurrencySymbol secondary size="xs" /> {service.price}
                </TextX>
                <TextX secondary>Duration : {service.price} minutes</TextX>
              </View>
              <Divider style={style.divider} />
            </View>
          ))}
          {editServiceModal !== null && (
            <ServiceAddModal
              handleAddService={console.log}
              isUpdating={true}
              service={editServiceModal}
              isVisible={editServiceModal ? true : false}
              hideModal={() => setEditServiceModal(null)}
            />
          )}
        </Container>
      </ScrollView>
    </ScreenContainer>
  );
};

const styleSheet = () => ({
  detailsContainer: {
    gap: 0,
  },
  title: {
    marginBottom: 10,
  },
  divider: {
    marginTop: 20,
    height: 0.5,
  },
  desc: {
    marginTop: 10,
  },
  price: {
    marginTop: 10,
  },
  serviceContainer: {
    paddingTop: 20,
  },
  service: {
    paddingHorizontal: 20,
    borderRadius: 10,
  },
});
