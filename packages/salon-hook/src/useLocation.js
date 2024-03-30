import * as Location from "expo-location";
import { useCallback, useLayoutEffect, useState } from "react";

export const useLocation = (defaultLocation) => {
  const [location, setLocation] = useState({
    latitudeDelta: 0.002,
    longitudeDelta: 0.0005,
    latitude: 37.78825,
    longitude: -122.4324,
  });
  const [error, setErrorMsg] = useState(null);
  // const isReady = navigationRef.getState();

  const getLocation = useCallback(async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }
    let newLocation = await Location.getCurrentPositionAsync({});
    setLocation((pre) => ({
      ...pre,
      latitude: newLocation.coords.latitude,
      longitude: newLocation.coords.longitude,
    }));
  }, []);

  console.log("defaultLocation",defaultLocation)

  useLayoutEffect(() => {
    if(defaultLocation){
      setLocation( prev => ({ 
        ...prev, 
        latitude: defaultLocation.latitude,
        longitude: defaultLocation.longitude,
      }) )
    }else{
      getLocation();
    }
  }, [getLocation, defaultLocation]);

  return { location: location, refetch: getLocation, error };
};
