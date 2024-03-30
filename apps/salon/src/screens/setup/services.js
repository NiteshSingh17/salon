import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { useColors, useCreateStyle } from '@salon/hook';
import { FlushedBt, Input, PrimaryBt, ScreenLoader, Text } from '@salon/ui';
import { find, map, uniqBy } from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import {
  List,
  Modal,
  Portal,
  TextInput,
  TouchableRipple,
} from 'react-native-paper';
import { Container } from '../../components/Container';
import { CurrencySymbol } from '../../components/CurrencySymbol';
import { useServiceGroupWithService } from '../../services/serviceGroup';

export const Services = ({ isLoading, next }) => {
  const { data, isFetching, error } = useServiceGroupWithService();
  return (
    <ScreenLoader isFetching={isFetching} error={error}>
      <View>
        <ServicesList isLoading={isLoading} data={data} next={next} />
      </View>
    </ScreenLoader>
  );
};

const ServicesList = ({ data, next, isLoading }) => {
  const [primaryColor, goldColor] = useColors(['primary', 'gold']);
  const style = useCreateStyle(styleSheet);
  const [showServiceModal, setShowServiceModal] = useState({
    show: false,
    isUpdating: false,
    service: null,
  });
  const [selectedServices, setSelectedServices] = useState([]);

  const handleNext = useCallback(() => {
    next({ services: selectedServices });
  }, [next, selectedServices]);

  const hideModal = () => {
    setShowServiceModal({ show: false, isUpdating: false, service: null });
  };

  const onServicePress = (service) => {
    const prevData = selectedServices.find(
      (s) => s.parentService === service._id
    );
    setShowServiceModal({
      show: true,
      isUpdating: Boolean(prevData),
      service: {
        name: service.name,
        parentService: service._id,
        ...(prevData ?? {}),
      },
    });
  };

  const handlRemoveService = useCallback(
    (serviceId) => {
      hideModal();
      setSelectedServices((pre) =>
        pre.filter((s) => s.parentService !== serviceId)
      );
    },
    [setSelectedServices]
  );

  const handleAddService = useCallback(
    (data) => {
      hideModal();
      const isUpdating = selectedServices.find(
        (s) => s.parentService === data.parentService
      );
      const newServiceData = {
        name: data.name,
        parentService: data.parentService ?? null,
        price: data.price ?? 0,
        desc: data.desc ?? '',
        duration: data.duration ?? 0,
      };
      if (isUpdating) {
        setSelectedServices((pre) =>
          uniqBy(
            pre.map((s) =>
              s.parentService === newServiceData.parentService
                ? newServiceData
                : s
            ),
            'parentService'
          )
        );
      } else {
        setSelectedServices((pre) =>
          uniqBy([...pre, newServiceData], 'parentService')
        );
      }
    },
    [selectedServices, setSelectedServices]
  );

  return (
    <View>
      <ServiceAddModal
        isUpdating={showServiceModal.isUpdating}
        handlRemoveService={handlRemoveService}
        handleAddService={handleAddService}
        service={showServiceModal.service ?? ''}
        hideModal={hideModal}
        isVisible={showServiceModal.show}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
      >
        <Container>
          <View style={style.serviceTitle}>
            <Text variant="headlineMedium">Select services</Text>
          </View>
        </Container>
        {map(data, (serviceGroup) => (
          <List.Accordion
            key={serviceGroup._id}
            titleNumberOfLines={1}
            titleStyle={{
              fontWeight: 'bold',
              fontSize: 14,
            }}
            left={() => (
              <View style={{ paddingLeft: 10 }}>
                <AntDesign
                  style={{ marginTop: 6 }}
                  name="star"
                  size={20}
                  color={goldColor}
                />
              </View>
            )}
            style={style.accordian}
            title={serviceGroup.name}
            id={serviceGroup._id}
          >
            <View style={style.listContainerStyle}>
              {map(serviceGroup.services, (service) => {
                const isSelected = find(
                  selectedServices,
                  (s) => s.parentService === service._id
                );
                return (
                  <List.Item
                    titleStyle={{ fontSize: 14 }}
                    onPress={() => onServicePress(service)}
                    style={style.accordianItem}
                    right={() => (
                      <TouchableRipple>
                        <MaterialIcons
                          name={isSelected ? 'edit' : 'add-circle-outline'}
                          size={24}
                          color={primaryColor}
                        />
                      </TouchableRipple>
                    )}
                    key={service._id}
                    title={service.name}
                  />
                );
              })}
            </View>
          </List.Accordion>
        ))}

        <View
          style={{
            paddingHorizontal: 20,
            paddingVertical: 40,
          }}
        >
          <PrimaryBt isLoading={isLoading} onPress={handleNext}>
            Select Servies ( {selectedServices.length} )
          </PrimaryBt>
        </View>
      </ScrollView>
    </View>
  );
};

const DefaultServiceData = {
  parentService: null,
  name: '',
  price: '60',
  desc: '',
  duration: '30',
};

export const ServiceAddModal = ({
  handlRemoveService,
  handleAddService,
  isUpdating,
  service,
  isVisible,
  hideModal,
}) => {
  const style = useCreateStyle(styleSheet);
  const [serviceData, setServiceData] = useState(DefaultServiceData);

  const changeValue = (key, e) => {
    setServiceData((pre) => ({ ...pre, [key]: e }));
  };

  useEffect(() => {
    setServiceData((pre) => ({ ...pre, ...(service ?? {}) }));
  }, [service]);

  const handleAdd = useCallback(() => {
    setServiceData(DefaultServiceData);
    handleAddService(serviceData);
  }, [handleAddService, serviceData]);

  const handleRemove = useCallback(() => {
    handlRemoveService(service.parentService);
  }, [handlRemoveService, service.parentService]);
  console.log('serviceData', serviceData, serviceData.price);
  return (
    <Portal>
      <Modal
        visible={isVisible}
        avoidKeyboard
        onDismiss={hideModal}
        contentContainerStyle={style.modal}
      >
        <View style={style.modalBody}>
          <View style={style.header}>
            <Text light variant="headlineMedium">
              {isUpdating ? 'Update' : 'Add'} Service
            </Text>
            <TouchableRipple>
              <AntDesign
                onPress={hideModal}
                name="close"
                size={24}
                color="black"
              />
            </TouchableRipple>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ gap: 20 }}>
              <Input
                value={serviceData.name}
                onChangeText={(value) => changeValue('name', value)}
                light
                label="Service Name"
              />
              <Input
                value={serviceData.price}
                onChangeText={(value) => changeValue('price', value)}
                light
                label="Price"
                keyboardType="numeric"
                left={<TextInput.Icon icon={() => <CurrencySymbol light />} />}
              />
              <Input
                value={serviceData.desc}
                onChangeText={(value) => changeValue('desc', value)}
                numberOfLines={5}
                multiline={true}
                light
                label="Description"
              />
              <Input
                value={serviceData.duration}
                onChangeText={(value) => changeValue('duration', value)}
                light
                label="Time ( minutes )"
                keyboardType="numeric"
              />
            </View>
            <PrimaryBt
              disabled={serviceData.parentService === null}
              onPress={handleAdd}
              style={{ marginTop: 40 }}
              light
            >
              <Text dark> {isUpdating ? 'Update' : 'Add'}</Text>
            </PrimaryBt>
            {isUpdating && handleRemove && (
              <FlushedBt onPress={handleRemove} style={{ marginTop: 10 }} light>
                Remove
              </FlushedBt>
            )}
          </ScrollView>
        </View>
      </Modal>
    </Portal>
  );
};

const styleSheet = ({ darkGray, lightGray }, isDark) => ({
  serviceTitle: {
    paddingVertical: 40,
  },
  accordian: {
    borderBottomWidth: 1,
    borderColor: isDark ? darkGray : lightGray,
  },
  accordianItem: {
    marginLeft: -40,
    paddingLeft: 30,
    borderBottomWidth: 1,
    borderColor: isDark ? darkGray : lightGray,
  },
  modal: {
    height: '100%',
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalBody: {
    backgroundColor: '#ffffff',
    height: '82%',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
});
