import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView,Animated,Text } from 'react-native';
import { Card, DataTable, Menu, Divider,Dialog,Provider,Button,Searchbar,IconButton, ActivityIndicator } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import db from '../Db';
import { TouchableOpacity } from 'react-native';
import styles from './style';
import moment from 'moment';

const DashBoard = ({navigation}) => {
  const [stations, setStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);
  const [data, setData] = useState([]);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchBarAnimation] = useState(new Animated.Value(0));
  const [autocompleteData, setAutocompleteData] = useState([]);
  const [searching,setSearching]=useState(false);
  const [userDet,setUserDet]=useState([]);

    useFocusEffect(
        React.useCallback(() => {
        GetSavedData();
        setTimeout(()=>
        {
            GetSavedData();
        },100)
        }, [])
      );
    

    useEffect(()=>
    {
        GetSavedData();
        setTimeout(()=>
        {
            GetSavedData();
        },100)
    },[]);


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
          setData(rows._array)
        }
        else
        {
          console.log("sorry")
        }
      })
      tx.executeSql("select * from User_Master",
      [],
      (_,{ rows })=>
      {
        if(rows.length>0)
        {
          setUserDet(rows._array)
        }
      })
      tx.executeSql("select * from GWMasterLocal",
      [],
      (_,{ rows })=>
      {
        if(rows.length>0)
        {
          setStations(rows._array)
          setAutocompleteData(rows._array.map(station => station.stationName));
        }
        else
        {
          console.log("sorry")
        }
      })
    })

    }

    useEffect(()=>
    {
      setSearching(true);
      setTimeout(()=>
      {
        setSearching(false)
      },400)
    },[searchQuery])


    const handleStationSelect = (station) => {
      setSelectedStation(station);
      setDialogVisible(true);
    };
    const hideDialog = () => {
      setSelectedStation(null);
      setDialogVisible(false);
    };

    const syncData= (selectedStation) =>
    {
      const myData=data.filter((item) => item.stationNumber === selectedStation.stationNumber)

      //remove some unwanted fields from data object.

      const updatedData = myData.map(({ gwStreamId,id, ...rest }) => rest);

      //add user details to the basic object.

      const object = { ...selectedStation, ...userDet[0] };

      //remove unwanted fields from the basic object.

      const { id, elivation, area, password, token,  ...updatedObject } = object;

      //merge that object and array object to the one.

      const newArray = updatedData.map(item => ({ ...item, ...updatedObject }));
      
      console.log(newArray);



      // fetch("api", {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({
      //     data:newArray                 
      //   })
      // })
      //   .then(response => response.json()).
      //   then(responseData=>JSON.parse(responseData))                   
      //   .then(data=>{
      //    if(data=='success')
      //    {

      //   }
      //   else
      //   {
      //    Alert.alert('WARNING','Sorry Data Not Sended,Please Try Again');
      //  }
      //   }
      //   ).catch((error) => {
      //     // Handle any error that occurred during the fetch request
      //     console.error(error);
      //   })
      //   .finally(() => {
      //   });

      
    }

    const handleSearch = (query) => {
      setSearchQuery(query);
    };

    const handleSearchIconPress = () => {
      setShowSearchBar(!showSearchBar);
      setSearchQuery('')
      Animated.timing(searchBarAnimation, {
        toValue: showSearchBar ? 0 : 1,
        duration: 200,
        useNativeDriver: false,
      }).start();
    };

  //   const filteredStations = stations.filter((station) =>
  //   station.stationName.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  const filteredStations = stations.filter((station) => {
    const formattedSearchQuery = searchQuery.toLowerCase().replace(/\s+/g, '');
    const formattedStationName = station.stationName.toLowerCase().replace(/\s+/g, '');
  
    return formattedStationName.includes(formattedSearchQuery);
  });

    const renderStationCards = () => {
      return (
        <ScrollView>
          {filteredStations.map((station) => (
            <Card key={station.id} style={styles.stationCard}>
              <TouchableOpacity  onPress={() => handleStationSelect(station)}>
              <Card.Title
                title={station.stationName}
                titleStyle={styles.title}
              />
              </TouchableOpacity>
            </Card>
          ))}
        </ScrollView>
      );
    };
  
    const renderDataTable = () => {
      return (
        <>
        <View style={styles.dataTableHeader}>
        <TouchableOpacity onPress={() =>{
          const myData=data.filter((item) => item.stationNumber === selectedStation.stationNumber)
           navigation.navigate('GW Monitoring Network',{station:selectedStation,data:myData});
        }}>
          <Text style={styles.stationNumber}>{parseInt(selectedStation.stationNumber)}</Text>
        </TouchableOpacity>
      </View>

        <DataTable>
          <DataTable.Header>
            <DataTable.Title style={styles.centeredCell}>Date</DataTable.Title>
            <DataTable.Title style={styles.centeredCell}>Time(hrs)</DataTable.Title>
            <DataTable.Title style={styles.centeredCell}>Water Level(m)</DataTable.Title>
            <DataTable.Title style={styles.centeredCell}>Comment</DataTable.Title>
          </DataTable.Header>
  
          <ScrollView style={{ maxHeight: 400 }}>
            {data
              .filter((item) => item.stationNumber === selectedStation.stationNumber)
              .map((item) =>
              {
                const [hours, minutes] = item.Time.split(':');
                const formattedMinutes = minutes.padStart(2, '0');
                const formattedTime = `${hours}:${formattedMinutes}`;
              return(
                <DataTable.Row key={item.id}>
                  <DataTable.Cell style={styles.centeredCell}>{moment(item.Date, 'DD/MM/YYYY').format('DD/MM/YY')}</DataTable.Cell>
                  <DataTable.Cell style={styles.centeredCell}>{formattedTime}</DataTable.Cell>
                  <DataTable.Cell style={styles.centeredCell}>{item.waterLevel}</DataTable.Cell>
                  <DataTable.Cell style={styles.centeredCell}>{item.comment.substring(0, Math.floor(item.comment.length * 0.8))}</DataTable.Cell> 
                </DataTable.Row>
              )})}
        
        </ScrollView>
        </DataTable>
        </>
      );
    };

    const searchBarOpacity = searchBarAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });
  
    const searchBarHeight = searchBarAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 56],
    });
  
    return (
      <Provider>
        {stations.length>0?
          <View style={styles.container}>

          <View style={styles.searchContainer}>
            {showSearchBar && (
              <Animated.View style={[styles.searchBarContainer, { opacity: searchBarOpacity, height: searchBarHeight }]}>
                <Searchbar
                  placeholder="Search for Station Name "
                  onChangeText={handleSearch}
                  placeholderTextColor="#888"
                  value={searchQuery}
                />
              </Animated.View>
            )}
            <TouchableOpacity onPress={handleSearchIconPress}>
              {showSearchBar ? (
                <IconButton icon="close" />
              ) : (
                <IconButton icon="magnify" style={{margin:0}}/>
              )}
            </TouchableOpacity>
          </View>
              {searching&&
               <View  style={{alignItems:'center',margin:5}}>
               <Text style={{color:'#888',fontWeight:'600'}}>Searching...</Text>
               </View>
              }
             
            {renderStationCards()}
    
            <Dialog visible={dialogVisible} onDismiss={hideDialog}>
              <Dialog.Title>
                {selectedStation ? selectedStation.stationName : 'No Station Selected'}
              </Dialog.Title>
              <Dialog.Content>
                {selectedStation && renderDataTable()}
              </Dialog.Content>
              <Dialog.Actions>
              <Button onPress={hideDialog}>Close</Button>
            </Dialog.Actions>
            <Dialog.Actions style={{
              justifyContent:'center',
              alignItems:'center'
            }}>
              <TouchableOpacity style={{
                backgroundColor:'#112a71',
                paddingHorizontal:15,
                paddingVertical:10,
                borderRadius:10
              }}
              onPress={()=>syncData(selectedStation)}
              ><Text style={{color:'white'}}>sync</Text></TouchableOpacity>
            </Dialog.Actions>
            </Dialog>
          </View>
          :
          <View style={styles.container}>
             <View style={styles.card}>
                <Text style={styles.cardTitle}>GW</Text>
                <Text style={[styles.cardTitle,{color:'#888'}]}>(0)</Text>
                </View>
          </View> 
      }
      </Provider>
    );
  };
  
   
export default DashBoard;

