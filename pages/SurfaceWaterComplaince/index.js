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


const SurfaceWaterComplaince = ({ route, navigation }) => {
  const [selectedStationId, setIsselectedStationId] = useState(null);
  const [selectedzone, setSelectedZone] = useState(null);
  const [stationName, setStationName] = React.useState(null);
  // const [stationName,setStationName]=useState(null);
  const [myTableData,setMyTableData]=useState([]);
  const [stationNumber,setStationNumber]=useState(null);
  const [details,setDetails]=useState([]);
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

  const [savedData,setSavedData]=useState([]);
  const [savedDataForAm,setSavedDataForAm]=useState([]);
  const [savedDataForPm,setSavedDataForPm]=useState([])

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
    setDataTabelForPm([]);
    setDataTabelForAm([]);
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
    GetSavedData();
    getLocationAsync();
     
    },100)
  },[stationNumber])
 



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
        tx.executeSql("select * from SWMaster",
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
    // const filter=myStationName.filter(v=>v.id===num?.id);
    // onChangeName(filter);
    // if(error)
    // {
    //   setError('')
    // }
  }

  const onChangeName=(name)=>
  {
    setStationName(name);
    const filter=myStationNumber.filter(v=>v.id===name?.id);
    onChangeNumber(filter);
    const check=savedData.filter(v=>v.stationNumber===filter[0]?.name);
    setMyTableData(check);
    success?setSuccess(''):null;
    error?setError(''):null;
    setHideSave(false)
  }

  
  const onDataAm=(e)=>
  {
    setDataTabelForAm(e);
    setError('');
    console.log(e)
  }

  const onDataPm=(e)=>
  {
    setDataTabelForPm(e);
    setError('');
  }

  const myStationName=dataFromApi.map(v=>
    {
      return{
        id:v.swStreamId,
        name:v.stationName,
        lat:v.latitude,
        lon:v.longitude
      }
    })

    const myStationNumber=dataFromApi.map(v=>
      {
        return{
          id:v.swStreamId,
          name:v.stationNumber
        }
      })

     
      const GetSavedData=()=>
      {
        db.transaction(tx=>
          {
            tx.executeSql("select * from SWMasterLocalTableAm",
        [],
        (_,{ rows })=>
        {
          if(rows.length>0)
          {
            setSavedDataForAm(rows._array)
          }
        })
        tx.executeSql("select * from SWMasterLocal",
        [],
        (_,{ rows })=>
        {
          if(rows.length>0)
          {
            setSavedData(rows._array)
          }
        })
        tx.executeSql("select * from SWMasterLocalTablePm",
        [],
        (_,{ rows })=>
        {
          if(rows.length>0)
          {
            setSavedDataForPm(rows._array)
          }
        })
      })
    }

    const InsertToPm=()=>
    {
      if(dataTabelForPm.length>0)
      {
        setLoading(true)
        db.transaction(tx=>
          {
              tx.executeSql("select * from SWMasterLocalTablePm where swStreamId=? AND stationNumber=?",
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
                 dataTabelForPm.map((v,index)=>
                 {
                  tx.executeSql('INSERT INTO SWMasterLocalTablePm (swStreamId,stationNumber,Date,time,readingPm,comment) VALUES (?, ?, ?, ?, ?, ?)',
                  [stationNumber[0].id,stationNumber[0].name,v.Date,v.time,v.readingPm,v.comment],
                  (tx,result)=>
                  {

                    if(dataTabelForPm.length-1===index)
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
                        setDataTabelForPm([]);
                        setStationName(null);
                        setStationNumber(null);
                        setMyTableData([])
                        setHideSave(false);
                        setSelectedZone(null)
                       setError('');
                       setSuccess('');
                      },200)
                    }
                   console.log("Data saved SWMasterLocalTablePm success");
                  }
                 )
                 })
                }
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
           
              tx.executeSql("select * from SWMasterLocalTableAm where swStreamId=? AND stationNumber=?",
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
                  dataTabelForAm.map((v,index)=>
                  {
                    tx.executeSql('INSERT INTO SWMasterLocalTableAm (swStreamId,stationNumber,Date,time,readingAm,comment) VALUES (?, ?, ?, ?, ?, ?)',
                    [stationNumber[0].id,stationNumber[0].name,v.Date,v.time,v.readingAm,v.comment],
                    (tx,result)=>
                    {
                      if(dataTabelForAm.length-1===index)
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
                          },100);
                          setDataTabelForAm([]);
                          setStationName(null);
                          setStationNumber(null);
                          setMyTableData([])
                          setHideSave(false);
                          setSelectedZone(null)
                         setError('');
                         setSuccess('');
                        },200)
                      }
                     console.log("Data saved SWMasterLocalTableAm success");
                    }
                   )
                  })
                
                }
              })
            })
        }
      }

      // const savef=()=>
      // {
      //  if(dataTabelForAm.length === dataTabelForPm.length)
      //  {
      //   console.log('Yes')
      //  }
      //  else
      //  {
      //   console.log('Sorry !')
      //  }
      // }

      const save=()=>
      {
        if(stationName&&selectedzone)
        {
          if(dataTabelForAm.length<=0)
          {
            setSuccess('');
            setError('Sorry Please Enter Table Data !')
          }

      else{
            setError('');
            InsertToAm();
            setError('');
            const filter=dataFromApi.filter(v=>v.swStreamId===stationNumber[0].id)
            db.transaction(tx=>
              {
                tx.executeSql("select * from SWMasterLocal where swStreamId=? AND stationNumber=?",
            [stationNumber[0].id,stationNumber[0].name],
            (_,{ rows })=>
            {
              if(rows.length>0)
              {
               console.log('Data Already Exist Basic Info') 
              }
              else
              {
                tx.executeSql('INSERT INTO SWMasterLocal (swStreamId, zone, stationName,stationNumber,latitude,longitude,elivation,area) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [stationNumber[0].id,selectedzone.name,stationName.name,stationNumber[0].name,lat,lon,filter[0].elivation,filter[0].area],
                (tx,result)=>
                {
                 console.log("Data saved success");
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
          !selectedzone?setError('Sorry Please Select Zone !'):setError('Sorry Please Select station Name !')
        }
      
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
      
      {/* <Button
      title="know"
      onPress={()=>console.log(stationName,stationNumber,selectedzone,selectedStationId)}
      /> */}

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
        /> 
     
       
      
   
      {/* <Table  myDataForTable={onData}/> */}
    
      <TableAm myDataForTable={onDataAm} savedData={savedDataForAm} stationNumber={stationNumber?stationNumber[0]:null} hideSave={hideSave} loading={lod} lat={lat} lon={lon}/>

      {/* <TablePm myDataForTable={onDataPm} savedData={savedDataForPm} stationNumber={stationNumber?stationNumber[0]:null} hideSave={hideSave} loading={lod} lat={lat} lon={lon}/> */}
      {!hideSave ?
      myTableData.length<=0 &&
      <Text style={styles.note}>
      <Text style={{color:'red'}}>(Note:</Text>"Once the save button is clicked, any modifications made to the data cannot be reflected or updated in the table.")
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

   
    </View>
    </ScrollView>
  );
};

export default SurfaceWaterComplaince;