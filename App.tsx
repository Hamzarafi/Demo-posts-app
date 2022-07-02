import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { MyGlobalContext } from "./hooks/globalContext";
import { useState } from "react";

export default function App() {
  const colorScheme = useColorScheme();

  const [posts, setPosts] = useState<PostType[]>([]);

  return (
    <MyGlobalContext.Provider value={{ posts, setPosts }}>
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    </MyGlobalContext.Provider>
  );
}
