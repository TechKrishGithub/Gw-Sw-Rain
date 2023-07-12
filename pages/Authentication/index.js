import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet,Alert, Image,ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './style';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from "@react-native-async-storage/async-storage";
import db from '../Db';
import Icon from 'react-native-vector-icons/FontAwesome';


const Authentication = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [success,setSuccess]=useState('');
  const [error,setError]=useState('');
  const [loading,setLoading]=useState(false);



  useEffect(()=>
  {
    getData();
    createTable();
    setTimeout(() => {
      getData();
      createTable();
    }, 200);
  },[])


  const createTable=()=>
  {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS User_Master (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT,userid INTEGER,token VARCHAR)',
      );
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
    });
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


  const getData=async ()=>
  {
      try{
       await AsyncStorage.getItem('Username').then(
          async value=>
          {
              if(value!=null)
              {
                  await AsyncStorage.getItem('Password').then(
                      value=>{
                          if(value!=null)
                          {
                            navigation.navigate('PinGeneration');
                          }
                      }
                  )
              }
          }
       )

      }
      catch(error)
      {
          console.log(error);
      }
  }

  
  const Validate=async ()=>
  {
    const netInfo = await NetInfo.fetch();
    const isConnected = netInfo.isConnected;    
    if (isConnected==false) {
      Alert.alert(
        'No Network Connection',
        'Please connect to a network and try again.',
        [{ text: 'OK' }],
        { cancelable: false }
      );
    }
    else
    {
      try{
        if(username!=''&&password!='')
        { 
          fetch('http://182.18.181.115:8084/api/login/loginservice?username='+username+'&password='+password+'').
      then(response=>response.json()).
      then(responseText=>JSON.parse(responseText)).
      then(async (result)=>{
  
        if(result.length!==0)
        {
            setSuccess('Login Success Please Wait....');
            setLoading(true);
            insert();
            setTimeout(()=>
            {
              setLoading(false);
              setSuccess('');
            },8000)
          console.log(result[0].userid);
          console.log(result[0].token);
          await AsyncStorage.setItem('Username',username);
          await AsyncStorage.setItem('Password',password);
          db.transaction(tx => {
            tx.executeSql('INSERT INTO User_Master (username, password, userid,token) VALUES (? ,? ,?, ?)', [username,password,result[0].userid,result[0].token], (tx, results) => {
              if (results.rowsAffected > 0) {
                console.log('User added');
              } else {
                console.log('Error adding user');
              }
            });
          }); 
        
          navigation.navigate('PinGeneration');
          setUsername('');
          setPassword('');

        }
        else
        {
          // Alert.alert('warning','Username and password wrong');
          setError('Sorry,Please Enter Valid Username and password')
        }
      }).catch(error=>{ 
        console.log(error)
      })
        }
        else
        {
          //  Alert.alert('warning','Please Entered Username and Password')
          setError('Sorry, Please Entered Username and Password')
        }
       }
       catch(error)
       {
        console.log(error);
       }

    }
   

  }



  return(
    <View style={styles.user}>
     <View style={{height:'10%',width:'20%',justifyContent:'center',alignItems:'center',backgroundColor:'white',borderRadius:60}}>
     <Image source={require('../../assets/logo.jpg')} style={{height:'70%',width:'70%'}}/>
     </View>
     <Text></Text> 
      <View style={styles.Field}>
      <Image source={require('../../assets/wiselogo.png')} style={{height:'15%',width:'30%',marginTop:-20}}/>     
        <Text></Text>
        <Text style={{fontWeight:'500'}}>Please login when you are online</Text>
      <Text></Text>
      <View style={styles.InputContainer}>
      <TextInput placeholder="Enter username" placeholderTextColor='grey' style={styles.FieldInput} 
      onChangeText={
        (e)=>
        {
          setUsername(e);
          if(error)
          {
            setError('');
          }
          if(success)
          {
            setSuccess('')
          }}}
       value={username}/>
      <Icon name="user" size={20} color="#000" style={{ marginRight: 10 }} />
      </View>
      <Text></Text>
      <View style={styles.InputContainer}>
      <TextInput placeholder="Enter password" placeholderTextColor='gray'  secureTextEntry={true}  style={styles.FieldInput} onChangeText={(e)=>{setPassword(e);if(error){setError('')}if(success){setSuccess('')}}} value={password} />
      <Icon name="lock" size={20} color="#000" style={{ marginRight: 10 }} />
      </View>
      <Text></Text>
      <TouchableOpacity style={styles.button} onPress={Validate}>
      <Text style={styles.buttonText}>Submit</Text>
    </TouchableOpacity>
        <Text></Text>
        {error?<Text style={{color:'red'}}>{error}</Text>:null}
        {loading?<ActivityIndicator size="small" color="blue"/>:null}
        {success?<Text style={{color:'green'}}>{success}</Text>:null}
      </View>
        {/* <Warning visible={warningVis} change={WarningMessage}/> */}
        
    </View>
  )
}


export default Authentication;
