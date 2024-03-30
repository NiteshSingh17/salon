import { Feather, FontAwesome, Ionicons } from '@expo/vector-icons';
import { useColors, useCreateStyle } from '@salon/hook';
import {
  Chip,
  IconButton,
  Modal,
  OutlineBt,
  Portal,
  PrimaryBt,
  ScreenLoader,
  Text,
} from '@salon/ui';
import dayjs from 'dayjs';
import { find } from 'lodash';
import { View } from 'react-native';
import { DATE_FORMATS, TIME_FORMATS } from '../constants';
import { useAuthContext } from '../providers/authProvider';
import { useBooking, useShopServices } from '../services';
import { OpenPhonDialogue, SendMail } from '../utils/external';
import { CurrencySymbol } from './CurrencySymbol';

export const BookingDetailModal = ({ bookingId, visible, onDismiss }) => {
  const style = useCreateStyle(styleSheet);
  const { data: bookingDetails, isFetching } = useBooking(bookingId);
  const { data: shopServices } = useShopServices();
  const { shopData } = useAuthContext();
  const rippleColor = useColors('rippleColor');

  const userName = bookingDetails?.meta?.name;
  const phoneNo = bookingDetails?.meta?.phone;
  const email = bookingDetails?.meta?.email;
  const services =
    shopServices?.filter((service) =>
      find(bookingDetails?.serviceIds, (id) => service._id === id)
    ) ?? [];

  return (
    <Portal>
      <Modal
        dismissable={true}
        onDismiss={onDismiss}
        visible={visible}
        contentContainerStyle={style.modal}
      >
        <View style={style.modalContainer}>
          <ScreenLoader isFetching={isFetching}>
            {bookingDetails && (
              <View style={style.content}>
                <View style={style.detailsContainer}>
                  <View>
                    <Text variant="headlineLarge">{userName}</Text>
                    <Text variant="textSmall" secondary>
                      Name
                    </Text>
                  </View>
                  <View>
                    <View style={style.priceContainer}>
                      <CurrencySymbol />
                      <Text variant="headlineMedium">
                        {bookingDetails.amount}
                      </Text>
                    </View>
                    <Text variant="textSmall" secondary>
                      Amount
                    </Text>
                  </View>

                  <View>
                    <Text>
                      {dayjs(bookingDetails.date).format(DATE_FORMATS.large)} |{' '}
                      {dayjs(bookingDetails.date).format(TIME_FORMATS.full)}
                    </Text>
                    <Text variant="textSmall" secondary>
                      Date
                    </Text>
                  </View>
                  <View style={style.servicesContainer}>
                    {services.map((service) => (
                      <Chip mode="outlined" key={service._id}>
                        {service.name}
                      </Chip>
                    ))}
                  </View>
                </View>
                <View style={style.footer}>
                  {email && (
                    <OutlineBt
                      icon={(props) => (
                        <Feather name="mail" size={24} {...props} />
                      )}
                      onPress={() =>
                        SendMail(email, 'Booking - ' + shopData.name, '')
                      }
                    >
                      Mail
                    </OutlineBt>
                  )}
                  {phoneNo && (
                    <PrimaryBt
                      style={style.callBt}
                      icon={(props) => (
                        <FontAwesome name="phone" size={24} {...props} />
                      )}
                      onPress={() => OpenPhonDialogue(phoneNo)}
                    >
                      Call {}
                    </PrimaryBt>
                  )}
                </View>
              </View>
            )}
          </ScreenLoader>

          <View style={style.closeButton}>
            <IconButton
              mode="contained"
              onPress={onDismiss}
              icon={(props) => <Ionicons name="close" {...props} />}
              rippleColor={rippleColor}
              size={24}
            />
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

const styleSheet = ({ error, primary, secondary }) => ({
  modal: {
    width: '100%',
    padding: 10,
  },
  modalContainer: {
    overflow: 'hidden',
    borderRadius: 10,
    backgroundColor: secondary,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
    height: '90%',
  },
  modalBody: {
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  iconConatiner: {
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: error,
  },
  modalTitle: {
    color: primary,
  },
  footer: {
    paddingVertical: 20,
    flexDirection: 'row',
    gap: 10,
  },
  childrenContainer: {
    width: '100%',
    height: '100%',
  },
  detailsContainer: {
    gap: 10,
  },
  servicesContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },
  callBt: {
    flex: 1,
  },
  priceContainer: {
    flexDirection: 'row',
    gap: 4,
  },
  content: {
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  closeButton: {
    position: 'absolute',
    top: 2,
    right: 0,
  },
});
