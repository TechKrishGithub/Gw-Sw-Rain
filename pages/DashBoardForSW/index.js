import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView,Animated,Text } from 'react-native';
import { Card, DataTable, Menu, Divider,Dialog,Provider,Button,Searchbar,IconButton, ActivityIndicator } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native';
import db from '../Db';
import { TouchableOpacity } from 'react-native';
import styles from './style';
import moment from 'moment';
import Autocomplete from 'react-native-autocomplete-input';

const DashBoardForSW = ({navigation}) => {
  const [stations, setStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);
  const [dataAm,setDataAm]=useState([]);
  const [dataPm,setDataPm]=useState([]);
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

    const MergeData=(am,pm)=>
    {
        if(am!==undefined&&pm!==undefined)
        {
            const mergedArray = am.map(obj1 => {
                const mergedObj = {
                  Date: obj1.Date,
                  commentAm: obj1.comment,
                  id: obj1.id,
                  readingAm: obj1.readingAm,
                  stationNumber: obj1.stationNumber,
                  swStreamId: obj1.swStreamId,
                  timeAm: obj1.time
                };
              
                const matchingObj = pm.find(obj2 => obj2.id === obj1.id);
                if (matchingObj) {
                  mergedObj.commentPm = matchingObj.comment;
                  mergedObj.readingPm = matchingObj.readingPm;
                  mergedObj.timePm = matchingObj.time;
                }
                return mergedObj;
              });
           setData(mergedArray)
        }
        else
        {
            console.log('am and pm are undefined please change !')
        }
    }

    const GetSavedData=()=>
    {
      //  let myAm;
      //  let myPm;
      db.transaction(tx=>
        {
          tx.executeSql("select * from SWMasterLocalTableAm",
      [],
      (_,{ rows })=>
      {
        if(rows.length>0)
        {
          setDataAm(rows._array);
          // myAm=rows._array;
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
      tx.executeSql("select * from SWMasterLocalTablePm",
      [],
      (_,{ rows })=>
      {
        if(rows.length>0)
        {
          setDataPm(rows._array);
          // myPm=rows._array;
          // MergeData(myAm,myPm)
        }
        else
        {
          console.log("sorry")
        }
      })
      tx.executeSql("select * from SWMasterLocal",
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


    const syncData= (selectedStation) =>
    {
      const myData=dataAm.filter((item) => item.stationNumber === selectedStation.stationNumber)

      //remove swStreamId,id from data

      const updatedData = myData.map(({ swStreamId,id, ...rest }) => rest);

      //add userDetails to the selectedStation info

      const object = { ...selectedStation, ...userDet[0] };

      //take only required data from object

      const { id, elivation, area, password, token,  ...updatedObject } = object;

      //merge that two array objects into the only one object 

      const newArray = updatedData.map(item => ({ ...item, ...updatedObject }));

      //change readingAm name as reading 
      
      const modifiedArray = newArray.map(obj => {
        const { readingAm, ...rest } = obj;
        return { ...rest, reading: readingAm };
      });

      
      console.log(modifiedArray);



      // fetch("api", {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({
      //     data:modifiedArray                 
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

    const handleStationSelect = (station) => {
      setSelectedStation(station);
      setDialogVisible(true);
    };
    const hideDialog = () => {
      setSelectedStation(null);
      setDialogVisible(false);
    };

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
  


  const ChangeTime=(time)=>
  {
    if(time!==undefined)
    {
        const [hours, minutes] = time.split(':');
        const formattedHours= hours.padStart(2,'0');
        const formattedMinutes = minutes.padStart(2, '0');
        const formattedTime = `${formattedHours}:${formattedMinutes}`;
        return formattedTime;
    }
 
  }

    const renderStationCards = () => {
      return (
        <ScrollView>
          {filteredStations.map((station) => (
            <Card key={station.id} style={styles.stationCard}>
              <TouchableOpacity  onPress={() => handleStationSelect(station) }>
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
        <TouchableOpacity
         onPress={() =>{
          const myDataAm=dataAm.filter((item) => item.stationNumber === selectedStation.stationNumber);
          const myDataPm=dataPm.filter((item) => item.stationNumber === selectedStation.stationNumber);
           navigation.navigate('SW Management Zone',{station:selectedStation,dataAm:myDataAm,dataPm:myDataPm});
        }}
        >
          <Text style={styles.stationNumber}>{parseInt(selectedStation.stationNumber)}</Text>
        </TouchableOpacity>
      </View>

        <DataTable>
          <DataTable.Header>
            <DataTable.Title style={styles.centeredCell}>Date</DataTable.Title>
            <DataTable.Title style={styles.centeredCell}>Time(hrs)</DataTable.Title>
            {/* <DataTable.Title style={styles.centeredCell}>TimePm(h)</DataTable.Title> */}
            <DataTable.Title style={styles.centeredCell}>Reading</DataTable.Title>
            {/* <DataTable.Title style={styles.centeredCell}>ReadingPm</DataTable.Title> */}
            <DataTable.Title style={styles.centeredCell}>Comment</DataTable.Title>
            {/* <DataTable.Title style={styles.centeredCell}>CommentPm</DataTable.Title> */}
          </DataTable.Header>
  
          <ScrollView style={{ maxHeight: 400 }}>
            {dataAm
              .filter((item) => item.stationNumber === selectedStation.stationNumber)
              .map((item) =>
              {
                const time1=ChangeTime(item.time);
                // const time2=ChangeTime(item.timePm);
              return(
                <DataTable.Row key={item.id}>
                  <DataTable.Cell style={styles.centeredCell}>{moment(item.Date, 'DD/MM/YYYY').format('DD/MM/YY')}</DataTable.Cell>
                  <DataTable.Cell style={styles.centeredCell}>{time1}</DataTable.Cell>
                  {/* <DataTable.Cell style={styles.centeredCell}>{time2}</DataTable.Cell> */}
                  <DataTable.Cell style={styles.centeredCell}>{item.readingAm}</DataTable.Cell>
                  {/* <DataTable.Cell style={styles.centeredCell}>{item.readingPm}</DataTable.Cell> */}
                  <DataTable.Cell style={styles.centeredCell}>{item.comment}</DataTable.Cell> 
                  {/* <DataTable.Cell style={styles.centeredCell}>{item.commentPm}</DataTable.Cell>  */}
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
        {
          stations.length>0?
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
             <Text style={styles.cardTitle}>SW</Text>
             <Text style={[styles.cardTitle,{color:'#888'}]}>(0)</Text>
        </View>
       </View> 
          }
      </Provider>
    );
  };
  
   
export default DashBoardForSW;

