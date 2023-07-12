import "react-native-gesture-handler";
import { View, Text, Image } from "react-native";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import {
  SimpleLineIcons,
  MaterialIcons,
  MaterialCommunityIcons,
  AntDesign,
  Feather
} from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import Logo from "./assets/logo.jpg";
import WiseLogo from "./assets/wise_logo.png";
import {
  GroundWaterMonitoringNetwork,
  DrillingComplaince,
  GroundWaterComplaince,
  SurfaceWaterComplaince,
  WasteWaterComplaince,
  Logout,
  DashBoard,
  DashBoardForSW
} from "./pages/index";
import db from "./pages/Db";


const Drawer = createDrawerNavigator();


export default function Drawernav() {

  return (

      <Drawer.Navigator
        drawerContent={(props) => {
          return (
            <SafeAreaView>
              <View
              style={{
                height: 250,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                borderBottomColor: "#f4f4f4",
                borderBottomWidth: 1,
                backgroundColor:'white',
                borderRadius:90,
              }}
            >
              <Image
                source={Logo}
                style={{
                  height: 130,
                  width: 130,
                }}
              />
               <Text
                 style={{
                  fontSize:12,
                  marginVertical: 6,
                  fontWeight: "bold",
                  color: "#156235"
                }}

              >
              Republic Of Uganda
              </Text>
           
              <Text
                style={{
                  marginVertical: 6,
                  fontWeight: "bold",
                  fontSize:13,
                  color: "#156235"
                }}
              >
              Ministry of Water and Environment
              </Text>
            
            </View>
            <DrawerItemList {...props} />

            <View
              style={{
                height: 100,
                width: "100%",
                justifyContent: "center",
                marginLeft:10,
                borderTopColor: "#f4f4f4",
                borderTopWidth: 1,
              }}
            >
              <Image
                source={WiseLogo}
                style={{
                  height: 100,
                  width: "60%",
                }}
              />
            </View>
          </SafeAreaView>
        );
      }}
      screenOptions={{
        drawerStyle: {
          backgroundColor: "#fff",
          width: 320,
        },
        headerStyle: {
          backgroundColor: "#0D47A1",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        drawerLabelStyle: {
          color: "#111",
        },
      }}
    >

      <Drawer.Screen
          name="Dashboard-GW"
          options={{
            headerTitle:()=>
            {
              return(
                <Text style={{color:'#fff',fontWeight:'bold',marginRight:20}}>Dashboard-GW</Text>
              )
             
            },
            headerRight: () => (
              <Image
                source={WiseLogo}
                style={{ width: 100, height: 50, marginRight: 10}}
              />
            ),
            title: "DashBoard-GW",
            drawerIcon: () => (
              <SimpleLineIcons name="home" size={20} color="#808080" />
            ),
          }}
          component={DashBoard}
        />

        <Drawer.Screen
          name="Dashboard-SW"
          options={{
            headerTitle:()=>
            {
              return(
                <Text style={{color:'#fff',fontWeight:'bold',marginRight:20}}>Dashboard-SW</Text>
              )
             
            },
            headerRight: () => (
              <Image
                source={WiseLogo}
                style={{ width: 100, height: 50, marginRight: 10}}
              />
            ),
            title: "DashBoard-SW",
            drawerIcon: () => (
              <MaterialCommunityIcons name="cup-water" size={20} color="#808080" />
              
            ),
          }}
          component={DashBoardForSW}
        />



        <Drawer.Screen
          name="Ground Water Monitoring Network"
          options={{
            headerTitle:()=>
            {
              return(
                <Text style={{color:'#fff',fontWeight:'bold',marginRight:20}}>Ground Water Monitoring Network</Text>
              )
             
            },
            headerRight: () => (
              <Image
                source={WiseLogo}
                style={{ width: 100, height: 50, marginRight: 10}}
              />
            ),
            title: "Ground Water Monitoring Network",
            drawerIcon: () => (
              <MaterialIcons name="group-work" size={22} color="#808080" />
            ),
          }}
          component={GroundWaterMonitoringNetwork}
        />


       <Drawer.Screen
          name="Surface Water Management Zone"
          options={{
            headerTitle:()=>
            {
              return(
                <Text style={{color:'#fff',fontWeight:'bold',marginRight:20}}>Surface Water Management Zone</Text>
              )
             
            },
            headerRight: () => (
              <Image
                source={WiseLogo}
                style={{ width: 100, height: 50, marginRight: 10}}
              />
            ),
            title: "Surface Water Management Zone",
            drawerIcon: () => (
              <MaterialIcons
                name="dashboard-customize"
                size={20}
                color="#808080"
              />
            ),
          }}
          component={SurfaceWaterComplaince}
        /> 


     {/* <Drawer.Screen
          name="RainFall"
          options={{
            headerTitle:()=>
            {
              return(
                <Text style={{color:'#fff',fontWeight:'bold',marginRight:20}}>RainFall</Text>
              )
             
            },
            headerRight: () => (
              <Image
                source={WiseLogo}
                style={{ width: 100, height: 50, marginRight: 10}}
              />
            ),
            title: "RainFall",
            drawerIcon: () => (
              <Feather name="cloud-rain" size={20} color="#808080" />
            ),
          }}
          component={WasteWaterComplaince}
        />  */}
       
       
      
        <Drawer.Screen
          name="Logout"
          options={{
            drawerLabel: "Logout",
            title: "Logout",
            drawerIcon: () => (
              <AntDesign name="logout" size={20} color="#808080" />
            ),
          }}
          component={Logout}
        />
      </Drawer.Navigator>
   
  );
}
