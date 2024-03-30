import { useCallback } from "react";
import { View } from "react-native";
import { SelectLocation } from "../../components/SelectLocation";

export const Location = ({ next }) => {
  const onSelectLocation = useCallback(
    ({ location }) => {
      next({ location });
    },
    [next]
  );
  return (
    <View>
      <SelectLocation onSelectLocation={onSelectLocation} />
    </View>
  );
};
