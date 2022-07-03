import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";

import { RootStackParamList } from "../types";

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      Root: {
        screens: {
          Home: {
            screens: {
              TabOneScreen: "one",
            },
          },
          Settings: {
            screens: {
              TabTwoScreen: "two",
            },
          },
        },
      },
      Add: "modal",
      Detail: "modal",
      NotFound: "*",
    },
  },
};

export default linking;
