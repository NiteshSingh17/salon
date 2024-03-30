import { useBackPress, useCreateStyle } from '@salon/hook';
import { BottomSlider, FlushedBt, PrimaryBt } from '@salon/ui';
import { View } from 'react-native';

export const ConfirmAlert = ({
  headerTitle,
  description,
  onCancel,
  onConfirm,
  isLoading,
}) => {
  useBackPress({
    onBack: onCancel,
  });
  const style = useCreateStyle(styleSheet);
  return (
    <BottomSlider onClose={onCancel} show={true}>
      <View style={style.container}>
        <Text variant="headlineLarge">{headerTitle ?? 'Confirm'}</Text>
        <Text style={style.description}>
          {description ?? 'Are you sure you want to continue'}
        </Text>
        <View style={style.actionButton}>
          <FlushedBt onPress={onCancel} style={style.secondaryAction}>
            Cancel
          </FlushedBt>
          <PrimaryBt
            isLoading={isLoading}
            onPress={onConfirm}
            style={style.primaryAction}
          >
            <Text toggle>Continue</Text>
          </PrimaryBt>
        </View>
      </View>
    </BottomSlider>
  );
};

const styleSheet = () => ({
  container: {
    padding: 20,
  },
  description: {
    marginTop: 10,
  },
  actionButton: {
    paddingVertical: 40,
    flexDirection: 'row',
  },
  secondaryAction: {
    flexGrow: 0.5,
  },
  primaryAction: {
    flexGrow: 1,
  },
});
