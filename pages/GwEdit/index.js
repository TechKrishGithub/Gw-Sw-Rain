import React, { useEffect, useState } from "react";
import { View, Text, Alert, Button,TouchableOpacity,ActivityIndicator } from "react-native";
import styles from "./style";
import db from "../Db";
import Table from "./Table";
import * as Location from 'expo-location';
import { ScrollView } from "react-native-gesture-handler";

const GwEdit = ({ route, navigation }) => {

    const {station,data}=route.params;



  const [lat,setLat]=useState('');
  const [lon,setLon]=useState('');
  const [dataTabel,setDataTabel]=useState([]);
  const [error,setError]=useState('');
  const [success,setSuccess]=useState('');
  const [loading,setLoading]=useState(false);
  const [watLev,setWatLev]=useState('');
  const [com,setCom]=useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());


  

  const [selectedItem, setSelectedItem] = React.useState(null);

  const handleDropdownSelect = (item) => {
    setSelectedItem(item);
  };

  useEffect(()=>
  {
    setDataTabel(data);
    getLocationAsync();
    setTimeout(()=>
    {
    getLocationAsync()
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




  


  
  const onData=(e)=>
  {
    setDataTabel(e);
  }


  const onWat=(e)=>
  {
    setWatLev(e);
  }
  const onCom=(e)=>
  {
    setCom(e);
  }
  
  const onDate=(e)=>
  {
    setSelectedDate(e)
  }

  const onTime=(e)=>
  {
    setSelectedTime(e)
  }

  
  const dataInsert=()=>
  {
    db.transaction(tx=>
        {
    dataTabel.map((v,index)=>
    {
      tx.executeSql('INSERT INTO GWMasterLocalTable (gwStreamId,stationNumber,Date,Time,waterLevel,comment) VALUES (?, ?, ?, ?, ?, ?)',
      [station.gwStreamId,station.stationNumber,v.Date,v.Time,v.waterLevel,v.comment],
      (tx,result)=>
      {
        if(dataTabel.length-1===index)
        {
          setSuccess('Data Saved Successfully !');
          setLoading(false);
          setTimeout(()=>{
            navigation.goBack();
          },300)
         
        } 
       console.log("Data Updated success");
      }
     )
    })
})
  }


  const save=()=>
  {
    if(com&&watLev=='')
    {
      setError('Sorry Please Enter Water Level !')
    }
    else
    {
      if(watLev)
      {
        setError('')
        const my={
          id: Date.now().toString(),
          Date:selectedDate.toLocaleDateString(),
          Time:selectedTime.toLocaleTimeString(),
          waterLevel:watLev,
          comment:com
        }
        dataTabel.unshift(my);
        Delete();
      }
      else
      {
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
            tx.executeSql("DELETE FROM GWMasterLocalTable where gwStreamId=? AND stationNumber=?",
          [station.gwStreamId,station.stationNumber],
          (_, result) => {
            console.log('Rows affected:', result.rowsAffected);
            dataInsert();
        })
          }
        )
      }


  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    > 


    <ScrollView>
          <Table myDataForTable={onData} dataFrmIndex={data} lat={lat} lon={lon} onWat={onWat} onCom={onCom} onDate={onDate} onTime={onTime}/>

      {/* <Text style={styles.note}>
      <Text style={{color:'red'}}>(Note:</Text>"Once the Update button is clicked, any modifications made to the data cannot be reflected or updated in the table.")
    </Text> */}

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
    !loading?
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

export default GwEdit;