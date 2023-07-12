import React, { 
    useState,
    useEffect,
  } from 'react';
  import {
     View,
     TextInput,
     Text ,
     TouchableOpacity,
     Animated,
     ImageBackground,
     BackHandler
    
    } from 'react-native';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import styles from './style';
  import { EvilIcons } from '@expo/vector-icons';
  import db from '../Db';
  import { useFocusEffect } from '@react-navigation/native';

  
  
  
  const PinAccess = ({navigation}) => {
    const [pin, setPin] = useState('');
    const [count,setCount]=useState(1);
    const [forgetText,setForgetText]=useState(false);
    const [textShake] = useState(new Animated.Value(0));
    
    const [error,setError]=useState('');
    const [user,setUser]=useState('');
  
    const backgroundImage = require('../../assets/top.png')
  
    const handleChangeText = (value) => {
      if(error!='')
      {
        setError('');
      }
      setPin(value);
      
    };
    
  
    useEffect(() => {
      getUser();
      setError('');
      setTimeout(()=>
      {
        getUser();
      },100)
      const backAction = () => {
        // do nothing to prevent going back
        return true;
      };
  
    },[])
  
    useFocusEffect(
      React.useCallback(() => {
        getUser();
        setError('');
        const backAction = () => {
          // do nothing to prevent going back
          return true;
        };
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
        setTimeout(()=>
        {
          getUser();
          return () => backHandler.remove();
        },100)
      }, [])
    );
  
    const getUser=()=>
    {
     db.transaction(tx=>
      {
          tx.executeSql(
          'SELECT username FROM User_Master',
          [],
          (_, { rows }) => setUser(rows._array[0].username)
          )
      })
    }
  
  
  
    const Validate=async ()=>
    {
      if(pin=='')
      {
        setError('Please Enter Pin')
      }
   else{
      try{
        
          const jsonValue=await AsyncStorage.getItem('Pin');
          const output=jsonValue != null ? JSON.parse(jsonValue) : null;
        if(output!=null)
        {
          if(output==pin)
          {
            setCount(1);
            setForgetText(false)
            navigation.navigate('DrawerNavigator') ;
            setPin('');
          }
          else{
            setError('Please Enter Correct Pin.')
            setCount(count+1);
            if(count==3)
            {
              setForgetText(true);
            }
            if(count>=3)
            {
              handleButtonClick();
            }
            setPin('');
          }
        }
        else{
         setError('Data Not Found.')
         setTimeout(()=>
         {
          setError('');
         },1000)
        }
        }
        catch(error)
        {
          console.log(error)
        }
     
    }
     
    }
  
    const handleButtonClick = () => {
      Animated.sequence([
        Animated.timing(textShake, { toValue: 10, duration: 100, useNativeDriver: true }),
        Animated.timing(textShake, { toValue: -10, duration: 100, useNativeDriver: true }),
        Animated.timing(textShake, { toValue: 10, duration: 100, useNativeDriver: true }),
        Animated.timing(textShake, { toValue: 0, duration: 100, useNativeDriver: true })
      ]).start();
    };
  
    const animatedStyle = {
      transform: [{ translateX: textShake }]
    };
  
    const circleSize = 60;
    const dotSize = 20;
  
    return (
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}   blurRadius={5}>
        
      <View style={[styles.container]}>    
        <View style={[styles.containerInside]}>
  
          <View  style={styles.user}>
        <EvilIcons name="user" size={55} color="black" style={styles.userLogo}/>
        <Text style={styles.userText}>{user}</Text>
       
        </View>
        <View style={[styles.user,{marginTop:50}]}>
        <Text style={styles.EnterPin}>Enter 4 Digit Login Pin</Text>
        <Text></Text>
        <Text></Text>
        <View style={styles.circle}>
          <View style={styles.dot}>
            {pin.length >= 1 && <View style={styles.dotFilled} />}
          </View>
          <View style={styles.dot}>
            {pin.length >= 2 && <View style={styles.dotFilled} />}
          </View>
          <View style={styles.dot}>
            {pin.length >= 3 && <View style={styles.dotFilled} />}
          </View>
          <View style={styles.dot}>
            {pin.length >= 4 && <View style={styles.dotFilled} />}
          </View>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            maxLength={4}
            onChangeText={handleChangeText}
            value={pin}
          />
           {/* <Image source={lockIcon} style={{height:50,width:50}}/> */}
        </View>
  
        {error && 
  <Text style={styles.error}>{error}</Text>
  }
  <Text></Text>
  <TouchableOpacity onPress={Validate}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>submit</Text>
        </View>
      </TouchableOpacity>
  
  <Text></Text>
  
  {forgetText &&
      <TouchableOpacity
      onPress={()=>
      {
        AsyncStorage.removeItem('Pin');
        navigation.navigate('PinGeneration');
        setCount(1);
        setForgetText(false);
      }}
      >
        <Animated.Text style={[styles.text, animatedStyle]}>Forget Pin?</Animated.Text>
  
      </TouchableOpacity>
  }
  
  </View>
  
  
  </View>
      </View>
      </ImageBackground>
    );
  };
  
  
  export default PinAccess;