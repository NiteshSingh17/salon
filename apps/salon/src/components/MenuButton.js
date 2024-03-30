import { Entypo } from '@expo/vector-icons';
import { useColors, useIsDarkMode } from '@salon/hook';
import { IconButton, Menu } from '@salon/ui';
import { useState } from 'react';

export const MenuButton = ({ icon, items }) => {
  const [isVisible, setIsVisible] = useState(false);
  const isDarkMode = useIsDarkMode();
  const [primary, white, darkLight, darkGray] = useColors([
    'primary',
    'white',
    'darkLight',
    'darkGray',
  ]);

  return (
    <Menu
      contentStyle={{
        backgroundColor: isDarkMode ? darkLight : white,
        borderWidth: 1,
        borderColor: isDarkMode ? darkGray : white,
        minWidth: '50%',
      }}
      visible={isVisible}
      onDismiss={() => setIsVisible(false)}
      anchorPosition="bottom"
      anchor={
        <IconButton
          onPress={() => setIsVisible(true)}
          icon={() => (
            <>
              {icon || (
                <Entypo name="dots-three-vertical" size={20} color={primary} />
              )}
            </>
          )}
        />
      }
    >
      {items?.map((item) => (
        <Menu.Item
          key={item.title}
          onPress={() => {
            setIsVisible(false);
            item.onPress();
          }}
          titleStyle={{
            fontSize: 14,
          }}
          leadingIcon={item.leadingIcon}
          title={item.title}
        />
      ))}
    </Menu>
  );
};
