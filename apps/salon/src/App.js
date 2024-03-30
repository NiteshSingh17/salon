import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "react-native-gesture-handler"; // Ref : https://reactnavigation.org/docs/stack-navigator/
import { setupURLPolyfill } from "react-native-url-polyfill";
import { Navigation } from "./navigation";
import { Providers } from "./providers/containerProvider";
dayjs.extend(customParseFormat); // Ref: https://github.com/iamkun/dayjs/issues/1786

setupURLPolyfill(); // Ref : https://github.com/charpeni/react-native-url-polyfill

export default function App() {
  return (
    <Providers>
      <Navigation />
    </Providers>
  );
}
