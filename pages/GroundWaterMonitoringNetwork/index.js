import React, { useEffect, useState } from "react";
import { View, Text, Alert, Button,TouchableOpacity,ActivityIndicator } from "react-native";
import { TextInput } from 'react-native-paper';
import data from "../../constants";
import DropDownSearch from "../DropDownSearch";
import styles from "./style";
import db from "../Db";
import Dropdown from "../DropDownPicker";
import Table from "./Table";
import * as Location from 'expo-location';
import { ScrollView } from "react-native-gesture-handler";
import DropDown from "../DropDown";
import { useFocusEffect } from "@react-navigation/native";

const GroundWaterMonitoringNetwork = ({ route, navigation }) => {

  const [selectedStationId, setIsselectedStationId] = useState(null);
  const [selectedzone, setSelectedZone] = useState(null);
  const [stationName, setStationName] = React.useState(null);
  const [savedData,setSavedData]=useState([]);
  const[savedBasic,setSavedBasic]=useState([]);
 const [myTableData,setMyTableData]=useState([]);
  const [stationNumber,setStationNumber]=useState(null);
  const [details,setDetails]=useState([]);
  const [dataFromApi,setDataFromApi]=useState([]);
  const [lat,setLat]=useState('');
  const [lon,setLon]=useState('');
  const [dataTabel,setDataTabel]=useState([]);
  const [error,setError]=useState('');
  const [success,setSuccess]=useState('');
  const [loading,setLoading]=useState(false);
  const [hideSave,setHideSave]=useState(false);
  const [lod,setLoa]=useState(false);


  

  const [selectedItem, setSelectedItem] = React.useState(null);

  const handleDropdownSelect = (item) => {
    setSelectedItem(item);
  };

  useFocusEffect(
    React.useCallback(() => {
    setLoa(true);
    setStationName(null);
    setStationNumber(null);
    setMyTableData([])
    setHideSave(false);
    setSelectedZone(null)
    setError('');
    setSuccess('');
    setTimeout(()=>
    {
      setLoa(false);
    },500)
    }, [])
  );

  useEffect(()=>
  {

    getData();
    getLocationAsync();
    GetSavedData();
    setTimeout(()=>
    {
    getData();
    getLocationAsync();
      GetSavedData();
    },100)
  },[stationNumber])

  useEffect(()=>{
    setLoa(true);
    setStationName(null);
    setStationNumber(null);
    setMyTableData([])
    setHideSave(false);
    setSelectedZone(null)
    setError('');
    setSuccess('');
    setTimeout(()=>
    {
      setLoa(false);
    },500)
    }, [])
 

  async function getLocationAsync() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      return;
    }
    else
    {
        // Location permission granted, now get the user's location
  let location = await Location.getCurrentPositionAsync({});
  const { latitude, longitude } = location.coords;
  setLat(latitude.toString());
  setLon(longitude.toString())
  
    }
   
}


  const getData=()=>
  {
    db.transaction(tx=>
      {
        tx.executeSql("select * from GWMaster",
          [],
          (_,{ rows })=>
          {
            if(rows.length>0)
            {
                setDataFromApi(rows._array);
            }
          })
      })
  }

  const onChangeStationId = (id) => {
    setIsselectedStationId(id);
  };

  const onChangeZone = (zone) => {
    setSelectedZone(zone);
    success?setSuccess(''):null;
    error?setError(''):null;
  };
  
  const onChangeNumber=(num)=>
  {
    setStationNumber(num);
    console.log(myStationName)
  }

  const onChangeName=(name)=>
  {
    setStationName(name);
    const filter=myStationNumber.filter(v=>v.id===name?.id);
    onChangeNumber(filter);
    console.log(filter)
    const check=savedData.filter(v=>v.stationNumber===filter[0]?.name);
    setMyTableData(check);
    success?setSuccess(''):null;
    error?setError(''):null;
    setHideSave(false)
  }

  const onData=(e)=>
  {
    setDataTabel(e);
    console.log(e);
    setError('');
  }

  const myStationName=dataFromApi.map(v=>
    {
      return{
        id:v.gwStreamId,
        name:v.stationName,
        lat:v.latitude,
        lon:v.longitude
      }
    })


    const myStationNumber=dataFromApi.map(v=>
      {
        return{
          id:v.gwStreamId,
          name:v.stationNumber
        }
      })
  

      const dataInsert=()=>
      {
        setLoading(true);
        db.transaction(tx=>
          {
            tx.executeSql("select * from GWMasterLocalTable where gwStreamId=? AND stationNumber=?",
        [stationNumber[0].id,stationNumber[0].name],
        (_,{ rows })=>
        {
          if(rows.length>0)
          {
            setLoading(false);
            setError('Sorry Data Already Saved !');
            setSuccess('');
           console.log('Data Already Exist in Table') 
          }
          else
          {
            dataTabel.map((v,index)=>
              {
                tx.executeSql('INSERT INTO GWMasterLocalTable (gwStreamId,stationNumber,Date,Time,waterLevel,comment) VALUES (?, ?, ?, ?, ?, ?)',
                [stationNumber[0].id,stationNumber[0].name,v.Date,v.Time,v.waterLevel,v.comment],
                (tx,result)=>
                {
                  if(dataTabel.length-1===index)
                  {
                    setSuccess('Data Saved Successfully');
                    setLoading(false);
                    setHideSave(true);
                    setTimeout(()=>
                    {
                      setLoa(true);
                      setTimeout(()=>
                      {
                        setLoa(false)
                      },100)
                      setStationName(null);
                      setStationNumber(null);
                      setMyTableData([])
                      setHideSave(false);
                      setSelectedZone(null)
                     setError('');
                     setSuccess('');
                    },300)
                  } 
                 console.log("Data saved success");
                }
               )
              })
          
          }
        })
          }
        )

      }

     const savfe=()=>
      {
       console.log(dataTabel.length<=0)
      }

      const save=()=>
      {
        if(stationName&&selectedzone)
        {
          if(dataTabel.length<=0)
          {
            setSuccess('');
            setError('Sorry Please Enter Table Data !');
          }
          else
          {
            dataInsert();
            setError('');
            const filter=dataFromApi.filter(v=>v.gwStreamId === stationNumber[0].id)
            db.transaction(tx=>
              {
                tx.executeSql("select * from GWMasterLocal where gwStreamId=? AND stationNumber=?",
            [stationNumber[0].id,stationNumber[0].name],
            (_,{ rows })=>
            {
              if(rows.length>0)
              {
                setLoading(false);
               console.log('Data Already Exist Basic Info') 
              }
              else
              {
                tx.executeSql('INSERT INTO GWMasterLocal (gwStreamId, zone, stationName,stationNumber,latitude,longitude,elivation,area) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [stationNumber[0].id,selectedzone.name,stationName.name,stationNumber[0].name,lat,lon,filter[0].elivation,filter[0].area],
                (tx,result)=>
                {
                  setLoading(false);
                 console.log("Data saved success");
                 setDataTabel([]);
                }
               )
              }
            })
              }
            )
          }
        
        }
        else
        {
          !selectedzone?setError('Sorry Please Select Zone !'):setError('Sorry Please Select Station Name !');
          
        }
      
      }

      const GetSavedData=()=>
      {
        db.transaction(tx=>
          {
            tx.executeSql("select * from GWMasterLocalTable",
        [],
        (_,{ rows })=>
        {
          if(rows.length>0)
          {
            setSavedData(rows._array)
          }
          else
          {
            console.log("sorry")
          }
        })
        tx.executeSql("select * from GWMasterLocal",
        [],
        (_,{ rows })=>
        {
          if(rows.length>0)
          {
            setSavedBasic(rows._array)
          }
          else
          {
            console.log("sorry")
          }
        })
      })
      }


      if(lod)
      {
        return(
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <ActivityIndicator size="small" color="#00f"/>
            <Text>Loading ...</Text>
          </View>
        )
      }


  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
     
    <DropDown
    placeholderText="Select Zone"
    data={data.zone}
    label="Select Zone"
    handleChange={onChangeZone}
    iconName="dotchart"
    myItem={selectedzone}
    />

  
    <DropDown
    placeholderText="Station Name"
    data={myStationName}
    label="Station Name"
    handleChange={onChangeName}
    iconName="creditcard"
    myItem={stationName}
    />

         <Dropdown
          items={myStationNumber}
          stationName={stationName}
          label="Station Number"
          placeholder="Search..."
          onSelect={onChangeNumber}
          loading={lod}
        /> 
  <ScrollView>
    
          <Table myDataForTable={onData} savedData={savedData} stationNumber={stationNumber?stationNumber[0]:null} hideSave={hideSave} loading={lod} lat={lat} lon={lon}/>
    
          {!hideSave ?
          myTableData.length<=0 &&
      <Text style={styles.note}>
      (<Text style={{color:'red'}}>Note:</Text>"Once the save button is clicked, any modifications made to the data cannot be reflected or updated in the table.")
    </Text>
    :
    null
}

{hideSave ||  myTableData.length>0 ?
  <Text style={styles.note}>
  (<Text style={{color:'red'}}>Note:</Text>"To update this data, navigate to the dashboard and search for the corresponding station. From there, you can make the necessary updates.")
</Text>
:
null
}

    {loading&&
    <View style={{alignItems:'center'}}>
    <ActivityIndicator size="small" color="blue"/>
    <Text>Saving...</Text>
    </View>
    }
    {
      success&&
      <Text style={{color:'green',margin:16}}>{success}</Text>
    }
    {
      error&&
      <Text style={{color:'red',margin:16}}>{error}</Text>
    }
   
    {myTableData.length<=0 ? 
    !loading&& !hideSave &&
    <View style={{alignItems:'center',marginTop:20}}>
    <TouchableOpacity style={styles.button} onPress={save}>
    <Text style={styles.buttonTextSave}>Save</Text>
  </TouchableOpacity>
  </View>
  :
  null
    }
    </ScrollView>
    </View>
  );

 
};

export default GroundWaterMonitoringNetwork;