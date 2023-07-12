import "react-native-gesture-handler";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Drawernav from "./Drawernav";
import { Authentication } from "./pages";
import PinAccess from "./pages/PinAccess";
import PinGeneration from "./pages/PinGeneration";
import GwEdit from "./pages/GwEdit";
import SwEdit from "./pages/SwEdit";


// Prevent native splash screen from autohiding before App component declaration
SplashScreen.preventAutoHideAsync()
  .then((result) =>
    console.log(`SplashScreen.preventAutoHideAsync() succeeded: ${result}`)
  )
  .catch(console.warn); // it's good to explicitly catch and inspect any error

const Stack = createStackNavigator();

const DrawerStack = () => (
  <Stack.Navigator>
    <Stack.Screen
        name="Login"
        component={Authentication}
        options={{ headerShown: false }}
        />

        <Stack.Screen
        name="PinGeneration"
        component={PinGeneration}
        options={{ headerShown: false }}
        />
  

         <Stack.Screen
        name="PinAccess"
        component={PinAccess}
        options={{ headerShown: false }}
        />

          <Stack.Screen
      name="DrawerNavigator"
      component={Drawernav}
      options={{ headerShown: false }}
    />
     <Stack.Screen name="GW Monitoring Network" component={GwEdit} />
     <Stack.Screen name="SW Management Zone" component={SwEdit} />
  </Stack.Navigator>
);

export default function App() {
  useEffect(() => {
    // Hides native splash screen after 2s
    setTimeout(async () => {
      await SplashScreen.hideAsync();
    }, 2000);
  }, []);
  return (
    <NavigationContainer>
      <DrawerStack />
    </NavigationContainer>
  );
}