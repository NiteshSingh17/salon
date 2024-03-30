import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useCreateStyle } from '@salon/hook';
import { FlushedBt, PrimaryBt, TextX } from '@salon/ui';
import { debounce } from 'lodash';
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { View } from 'react-native';
import { Modal, Portal, useTheme } from 'react-native-paper';

const ErrorContext = createContext();

export const useErrorContext = () => useContext(ErrorContext);

const ErrorDefaultValue = {
  show: false,
  msg: '',
  desc: '',
  image: '',
  retryHandler: null,
  closable: true,
};

const ErrorModal = ({
  msg,
  desc,
  handleRetry,
  visible,
  hideModal,
  canClose,
}) => {
  const style = useCreateStyle(styleSheet);
  const { colors } = useTheme();

  return (
    <Portal>
      <Modal
        dismissable={false}
        visible={visible}
        contentContainerStyle={style.modal}
      >
        <View style={style.modalContainer}>
          <View style={style.iconConatiner}>
            <MaterialIcons
              name="error-outline"
              size={60}
              color={colors.onError}
            />
          </View>
          <View style={style.modalBody}>
            <TextX variant="headlineMedium" style={style.modalTitle}>
              {msg}
            </TextX>
            <TextX secondary>{desc}</TextX>
          </View>
          <View style={style.footer}>
            {canClose && <FlushedBt onPress={hideModal}>Close</FlushedBt>}
            <PrimaryBt
              onPress={handleRetry}
              icon={(props) => (
                <MaterialCommunityIcons name="reload" size={24} {...props} />
              )}
            >
              Retry
            </PrimaryBt>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

export const ErrorProvider = ({ children }) => {
  const [error, setError] = useState(ErrorDefaultValue);
  const style = useCreateStyle(styleSheet);

  const showError = useCallback(
    ({ msg, desc, image, retryHandler, closable }) => {
      setError({
        show: true,
        msg,
        desc,
        image,
        retryHandler,
        closable: closable ?? false,
      });
    },
    [setError]
  );

  const hideError = useCallback(() => {
    setError(ErrorDefaultValue);
  }, []);

  const handleRetry = useMemo(
    () =>
      debounce(() => {
        if (error.retryHandler) {
          error.retryHandler();
        }
        hideError();
      }, 500),
    [hideError, error]
  );

  const closeModal = useCallback(() => {
    setError(ErrorDefaultValue);
  }, [setError]);

  const value = useMemo(
    () => ({
      showError: showError,
      hideError: hideError,
    }),
    [showError, hideError]
  );

  return (
    <ErrorContext.Provider value={value}>
      {error.show && (
        <ErrorModal
          canClose={error.closable}
          visible={error.show}
          hideModal={closeModal}
          handleRetry={handleRetry}
          msg={error.msg}
          desc={error.desc}
        />
      )}
      <View style={style.childrenContainer}>{children}</View>
    </ErrorContext.Provider>
  );
};

const styleSheet = ({ error, primary, secondary }) => ({
  modal: {
    width: '100%',
    padding: 20,
  },
  modalContainer: {
    overflow: 'hidden',
    borderRadius: 10,
    backgroundColor: secondary,
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
    paddingHorizontal: 30,
    flexDirection: 'row',
    flexGrow: 1,
    width: '100%',
    alignItems: 'stretch',
    justifyContent: 'flex-end',
  },
  childrenContainer: {
    width: '100%',
    height: '100%',
  },
});
