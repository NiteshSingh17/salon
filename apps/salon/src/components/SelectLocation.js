import { FontAwesome } from '@expo/vector-icons';
import { useColors, useLocation } from '@salon/hook';
import { IconButton, PrimaryBt } from '@salon/ui';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Animated, Marker, PROVIDER_GOOGLE } from 'react-native-maps';

export const SelectLocation = ({
  isLoading,
  defaultLocation,
  onSelectLocation,
}) => {
  const { location, refetch } = useLocation(defaultLocation); // TODO : handle error
  const [white, black, rippleColor] = useColors([
    'white',
    'black',
    'rippleColor',
  ]);
  const [currentLocation, setCurrentLocation] = useState(location);
  const handleRegionChange = (cords) => {
    setCurrentLocation({ ...cords });
  };

  useEffect(() => {
    if (location) {
      setCurrentLocation((pre) => ({
        ...pre,
        latitude: location.latitude,
        longitude: location.longitude,
      }));
    }
  }, [location, setCurrentLocation]);

  const handleSelect = useCallback(() => {
    onSelectLocation({ location: currentLocation });
  }, [currentLocation, onSelectLocation]);

  return (
    <View>
      <View style={styles.buttonContainer}>
        <View style={styles.curentButtonContainer}>
          <IconButton
            rippleColor={rippleColor}
            size={24}
            mode="contained"
            onPress={refetch}
            style={{ backgroundColor: black }}
            icon={(props) => (
              <FontAwesome name="map-marker" {...props} color={white} />
            )}
          />
        </View>
        <PrimaryBt isLoading={isLoading} onPress={handleSelect} light>
          Select Location
        </PrimaryBt>
      </View>
      <Animated
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={currentLocation}
        region={currentLocation}
        onRegionChangeComplete={handleRegionChange}
      >
        <Marker
          zIndex={22}
          coordinate={currentLocation}
          onDragEnd={({ coordinate }) =>
            setCurrentLocation((pre) => ({ ...pre, ...coordinate }))
          }
          draggable
        />
      </Animated>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    position: 'absolute',
    width: '100%',
    paddingBottom: 20,
    paddingHorizontal: 20,
    bottom: 0,
    zIndex: 2,
  },
  curentButtonContainer: {
    alignItems: 'flex-end',
    marginBottom: 10,
  },
});
