import React, { useEffect, useState } from "react";
import { View,Button ,TouchableOpacity,ActivityIndicator,Text,SafeAreaView} from "react-native";
import { TextInput } from 'react-native-paper';
import data from "../../constants";
import db from "../Db";
import Dropdown from "../DropDownPicker";
import TableAm from "./TableAm";
import TablePm from "./TablePm";
import * as Location from 'expo-location';
import styles from "./style";
import DropDown from "../DropDown";
import { ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";


const SwEdit = ({ route, navigation }) => {
    const {station,dataAm,dataPm}=route.params;

  const [myTableData,setMyTableData]=useState([]);
  const [dataFromApi,setDataFromApi]=useState([]);
  const [lat,setLat]=useState('');
  const [lon,setLon]=useState('');
  const [dataTabelForAm,setDataTabelForAm]=useState([]);
  const [dataTabelForPm,setDataTabelForPm]=useState([]);
  const [error,setError]=useState('');
  const [success,setSuccess]=useState('');
  const [loading,setLoading]=useState(false);
  const [hideSave,setHideSave]=useState(false);
  const [lod,setLoa]=useState(false);
  const [readAm,setReadAm]=useState('');
  const [readPm,setReadPm]=useState('');
  const [comAm,setComAm]=useState('');
  const [comPm,setComPm]=useState('');
  const [selectedDateAm, setSelectedDateAm] = useState(new Date());
  const [selectedTimeAm, setSelectedTimeAm] = useState(new Date());
  const [selectedDatePm, setSelectedDatePm] = useState(new Date());
  const [selectedTimePm, setSelectedTimePm] = useState(new Date());



 
  useEffect(()=>
  {
    getLocationAsync();
    setDataTabelForAm(dataAm);
    setDataTabelForPm(dataPm);
    setLoading(false)
    setTimeout(()=>
    {
    getLocationAsync();
    },100)
  },[])
 



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


  
  const onDataAm=(e)=>
  {
    setDataTabelForAm(e);
    setError('');
  }

  const onDataPm=(e)=>
  {
    setDataTabelForPm(e);
    setError('');
  }

  const onReadAm=e=>setReadAm(e)
  const onReadPm=e=>setReadPm(e)
  const onComAm=e=>setComAm(e)
  const onComPm=e=>setComPm(e)
  const onDateAm=e=>setSelectedDateAm(e)
  const onDatePm=e=>setSelectedDatePm(e)
  const onTimeAm=e=>setSelectedTimeAm(e)
  const onTimePm=e=>setSelectedTimePm(e)

    const InsertToPm=()=>
    {
      if(dataTabelForPm.length>0)
      {
        setLoading(true)
        db.transaction(tx=>
          {
                 dataTabelForPm.map((v,index)=>
                 {
                  tx.executeSql('INSERT INTO SWMasterLocalTablePm (swStreamId,stationNumber,Date,time,readingPm,comment) VALUES (?, ?, ?, ?, ?, ?)',
                  [station.swStreamId,station.stationNumber,v.Date,v.time,v.readingPm,v.comment],
                  (tx,result)=>
                  {

                    if(dataTabelForPm.length-1===index)
                    {
                        setLoading(false);
                      setSuccess('Data Saved Successfully');
                      setTimeout(()=>
                      {
                       setError('');
                       setSuccess('');
                       navigation.goBack();
                      },200)
                    }
                   console.log("Data saved SWMasterLocalTablePm success");
                  }
                 )
                 })
            }
        )
      }
    }


      const InsertToAm=()=>
      {
       
        if(dataTabelForAm.length>0)
        {
          setLoading(true);
         db.transaction(tx=>
          {   
                  dataTabelForAm.map((v,index)=>
                  {
                    tx.executeSql('INSERT INTO SWMasterLocalTableAm (swStreamId,stationNumber,Date,time,readingAm,comment) VALUES (?, ?, ?, ?, ?, ?)',
                    [station.swStreamId,station.stationNumber,v.Date,v.time,v.readingAm,v.comment],
                    (tx,result)=>
                    {
                      if(dataTabelForAm.length-1===index)
                      {
                        setLoading(false);
                        setSuccess('Data Saved Successfully');
                        setTimeout(()=>
                        {
                         setError('');
                         setSuccess('');
                         navigation.goBack();
                        },200)
                      }
                     console.log("Data saved SWMasterLocalTableAm success");
                    }
                   )
                  })     
            })
        }
      }


      const save=()=>
      {
        if(comAm&&readAm=='')
        {
                setError('Sorry Please Enter Reading !')
        }
        else
        {
          
            if(readAm)
            {
                setError('')
                const my={
                    id: Date.now().toString(),
                    Date: selectedDateAm.toLocaleDateString(),
                    time: selectedTimeAm.toLocaleTimeString(),
                    readingAm: readAm,
                    comment: comAm,
                }
                dataTabelForAm.unshift(my);
                // const pm={
                //     id: Date.now().toString(),
                //     Date: selectedDatePm.toLocaleDateString(),
                //     time: selectedTimePm.toLocaleTimeString(),
                //     readingPm: readPm,
                //     comment: comPm,
                // }
                // dataTabelForPm.unshift(pm);
                Delete();
            }
            else
            {
                // if(readAm&&readPm==''||readPm&&readAm=='')
                // {
                //   setSuccess('');
                //   setError('Regrettably, it is essential for both tables to have identical length !'); 
                // }
                console.log(dataTabelForAm.length);
                  setError('');
                  Delete();

            }
        }
      
      }


      const Delete=()=>
      {
        setLoading(true);
        db.transaction(tx=>
          {
            tx.executeSql("DELETE FROM SWMasterLocalTableAm where swStreamId=? AND stationNumber=?",
          [station.swStreamId,station.stationNumber],
          (_, result) => {
            console.log('Rows affected:', result.rowsAffected);
            InsertToAm();
        })
      //   tx.executeSql("DELETE FROM SWMasterLocalTablePm where swStreamId=? AND stationNumber=?",
      //   [station.swStreamId,station.stationNumber],
      //   (_, result) => {
      //     console.log('Rows affected:', result.rowsAffected);
      //      InsertToPm();
      // })
          }
        )
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
    <ScrollView style={{
      flex: 1,
      backgroundColor: "white",
    }}>
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
       
    
      <TableAm 
      myDataForTable={onDataAm}
      savedData={dataAm} 
      lat={lat} 
      lon={lon}
      onComAm={onComAm}
      onReadAm={onReadAm}
      onDateAm={onDateAm}
      onTimeAm={onTimeAm}
      />

      {/* <TablePm 
      myDataForTable={onDataPm} 
      savedData={dataPm} 
      lat={lat} 
      lon={lon}
      onComPm={onComPm}
      onReadPm={onReadPm}
      onDatePm={onDatePm}
      onTimePm={onTimePm}
      /> */}

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
      {
    !loading ?
    <View style={{alignItems:'center',marginTop:20}}>
    <TouchableOpacity style={styles.button} onPress={save}>
    <Text style={styles.buttonTextSave}>Save</Text>
  </TouchableOpacity>
  </View>
  :
  null
    }

   
    </View>
    </ScrollView>
  );
};

export default SwEdit;