import { SafeAreaView } from "react-native-safe-area-context";
import { ScreenLoader } from "./Loader";

export const ScreenContainer = ({ style, children, isLoading }) => {
  if (isLoading) return <ScreenLoader isFetching={true} />;
  return (
    <SafeAreaView style={{ height: "100%", ...(style ?? {}) }}>
      {children}
    </SafeAreaView>
  );
};
