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
import { NavigationContainer } from "@react-navigation/native";
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
  DashBoard
} from "./pages/index";
import {Authentication} from "./pages/index";
import db from "./pages/Db";

const Drawer = createDrawerNavigator();

// Prevent native splash screen from autohiding before App component declaration
SplashScreen.preventAutoHideAsync()
  .then((result) =>
    console.log(`SplashScreen.preventAutoHideAsync() succeeded: ${result}`)
  )
  .catch(console.warn); // it's good to explicitly catch and inspect any error

export default function DrawerNavigation() {
  useEffect(() => {
    // Hides native splash screen after 2s
    insert();
    createTable();
    setTimeout(async () => {
      await SplashScreen.hideAsync();
    }, 2000);
  }, []);


  const createTable=()=>
  {
    db.transaction(tx=>
      {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS GWMaster(id INTEGER PRIMARY KEY AUTOINCREMENT,gwStreamId VARCHAR,zone VARCHAR,stationName VARCHAR,stationNumber VARCHAR,latitude VARCHAR,longitude VARCHAR,elivation VARCHAR,area VARCHAR )',
        );
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS SWMaster(id INTEGER PRIMARY KEY AUTOINCREMENT,swStreamId VARCHAR,zone VARCHAR,streamType varchar,stationName VARCHAR,stationNumber VARCHAR,latitude VARCHAR,longitude VARCHAR,elivation VARCHAR,area VARCHAR )',
        );
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS GWMasterLocal(id INTEGER PRIMARY KEY AUTOINCREMENT,gwStreamId VARCHAR,zone VARCHAR,stationName VARCHAR,stationNumber VARCHAR,latitude VARCHAR,longitude VARCHAR,elivation VARCHAR,area VARCHAR )',
        );
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS GWMasterLocalTable(id INTEGER PRIMARY KEY AUTOINCREMENT,gwStreamId VARCHAR,stationNumber VARCHAR,Date datetime,Time varchar,waterLevel varchar,comment varchar)',
        );
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS SWMasterLocal(id INTEGER PRIMARY KEY AUTOINCREMENT,swStreamId VARCHAR,zone VARCHAR,stationName VARCHAR,stationNumber VARCHAR,latitude VARCHAR,longitude VARCHAR,elivation VARCHAR,area VARCHAR )',
        );
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS SWMasterLocalTableAm(id INTEGER PRIMARY KEY AUTOINCREMENT,swStreamId VARCHAR,stationNumber VARCHAR,Date datetime,time varchar,readingAm integer,comment varchar)',
        );
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS SWMasterLocalTablePm(id INTEGER PRIMARY KEY AUTOINCREMENT,swStreamId VARCHAR,stationNumber VARCHAR,Date datetime,time varchar,readingPm integer,comment varchar)',
        );
      })
  }


  const isTableEmpty = (tableName) => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `SELECT COUNT(*) as count FROM ${tableName}`,
          [],
          (_, result) => {
            const count = result.rows.item(0).count;
            resolve(count === 0);
          },
          (_, error) => {
            reject(error);
          }
        );
      });
    });
  };

  

  const insertToGw=(res)=>
  {

    isTableEmpty('GWMaster')
    .then((empty) => {
      if(empty)
      {
        res.map(v=>
          {
    
            db.transaction(tx => {
              tx.executeSql('INSERT INTO GWMaster (gwStreamId,zone,stationName,stationNumber,latitude,longitude,elivation,area) VALUES(?,?,?,?,?,?,?,?)',
              [v.gwStreamId,v.zone,v.stationName,v.stationNumber,v.latitude,v.longitude,v.elivation,v.area],
               (tx, results) => {
                if (results.rowsAffected > 0) {
                  console.log('data added');
                } else {
                  console.log('Error adding user');
                }
              })
            })
    
          })
      }
      else
      {
        console.log('Gw already having data')
      }
    })
    .catch((error) => {
      console.log('Error:', error);
    });
    
  }


  const insertToSw=(res)=>
  {
    isTableEmpty('SWMaster')
    .then((empty) => {
      if(empty)
      {
        res.map(v=>
          {
    
            db.transaction(tx => {
              tx.executeSql('INSERT INTO SWMaster (swStreamId,zone,streamType,stationName,stationNumber,latitude,longitude,elivation,area) VALUES(?,?,?,?,?,?,?,?,?)',
              [v.swStreamId,v.zone,v.streamType,v.stationName,v.stationNumber,v.latitude,v.longitude,v.elivation,v.area],
               (tx, results) => {
                if (results.rowsAffected > 0) {
                  console.log('data added');
                } else {
                  console.log('Error adding user');
                }
              })
            })
    
          })
      }
      else
      {
        console.log('Sw already having data')
      }
    })
  

  }

  const insert=()=>
  {

    fetch("http://182.18.181.115:8097/api/GroundWaterMaster/GetGWMaster")
    .then(response=>response.json())
    .then(result=>JSON.parse(result))
    .then(res=>{
      insertToGw(res)
    })

    fetch("http://182.18.181.115:8097/api/SurfaceWaterMaster/GetSWMaster")
    .then(response=>response.json())
    .then(result=>JSON.parse(result))
    .then(res=>insertToSw(res))
   
  }




  return (
    <NavigationContainer>
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
          name="Authentication"
          options={{
            headerTitle:()=>
            {
              return(
                <Text style={{color:'#fff',fontWeight:'bold',marginRight:20}}>Authentication</Text>
              )
             
            },
            headerRight: () => (
              <Image
                source={WiseLogo}
                style={{ width: 100, height: 50, marginRight: 10}}
              />
            ),
            title: "Authentication",
            drawerIcon: () => (
              <SimpleLineIcons name="home" size={20} color="#808080" />
            ),
          }}
         component={Authentication}
        />

      <Drawer.Screen
          name="Dashboard"
          options={{
            headerTitle:()=>
            {
              return(
                <Text style={{color:'#fff',fontWeight:'bold',marginRight:20}}>Dashboard</Text>
              )
             
            },
            headerRight: () => (
              <Image
                source={WiseLogo}
                style={{ width: 100, height: 50, marginRight: 10}}
              />
            ),
            title: "DashBoard",
            drawerIcon: () => (
              <SimpleLineIcons name="home" size={20} color="#808080" />
            ),
          }}
          component={DashBoard}
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


     <Drawer.Screen
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
        /> 
       
       
      
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
    </NavigationContainer>
  );
}
