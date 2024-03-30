import { useColors, useIsDarkMode } from '@salon/hook';
import { BottomSlider, Divider, Text, TouchableRipple } from '@salon/ui';
import { View } from 'react-native';

export const FastActions = ({ header, actions, show, onClose }) => {
  const isDark = useIsDarkMode();
  const [lightGray, darkGray] = useColors(['lightGray', 'darkGray']);
  return (
    <BottomSlider
      style={{
        borderRadius: 10,
        marginHorizontal: 10,
        marginBottom: 10,
      }}
      show={show}
      header={header}
      onClose={onClose}
    >
      <View>
        {actions.map((action, index) => (
          <View key={action.title}>
            <TouchableRipple
              onPress={
                action.actionHanlder
                  ? () => {
                      action.actionHanlder();
                      onClose();
                    }
                  : null
              }
              style={{
                paddingHorizontal: 10,
                paddingVertical: 20,
              }}
            >
              <View style={{ flexDirection: 'row' }}>
                <View style={{ marginRight: 16 }}>{action.icon}</View>
                <Text variant="headlineSmall">{action.title}</Text>
              </View>
            </TouchableRipple>
            {index + 1 !== actions.length && (
              <Divider
                style={{
                  backgroundColor: isDark ? darkGray : lightGray,
                }}
              />
            )}
          </View>
        ))}
      </View>
    </BottomSlider>
  );
};
