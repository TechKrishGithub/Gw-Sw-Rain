import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import styles from './style';
import moment from 'moment';

const Table = ({myDataForTable,dataFrmIndex,lat,lon,onWat,onCom,onDate,onTime}) => {

  const [data, setData] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [waterLevel, setWaterLevel] = useState('');
  const [comment, setComment] = useState('');
  const [addHide,setAddHide]=useState(false);
  const [hideSubmit,setHidSubmit]=useState(false);
  const [editRowId, setEditRowId] = useState('');
  const [error,setError]=useState('');
  const hoursRef = useRef(null);

useEffect(()=>
{
 setData(dataFrmIndex);

},[])



  const handleEditRow = (id) => {
    if(error)
    {
      setError('')
    }
    const myData=data.filter(v=>v.id === id);
      setHidSubmit(true);
      const firstRecord=myData[0];
      const [hours, minutes] = firstRecord.Time.split(':');
      const editedTime = new Date();
      editedTime.setHours(hours);
      editedTime.setMinutes(minutes);
  
      setSelectedTime(editedTime);
setWaterLevel(firstRecord.waterLevel);
setComment(firstRecord.comment);

const convertToDateObject = (dateString) => {
  const parts = dateString.split('/');
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1; // Months in JavaScript are zero-based
  const year = parseInt(parts[2], 10);
  return new Date(year, month, day);
};

const defaultDate = convertToDateObject(firstRecord.Date);
setSelectedDate(defaultDate);


  };


  const handleAddRow = () => {
    if(waterLevel=='')
    {
      setError('Sorry Please Enter Water Level !');
    }
    else
    {
      const formattedTime = `${selectedTime.getHours()}:${selectedTime.getMinutes()}`;
      const newRow = {
        id: Date.now().toString(),
        Date: selectedDate.toLocaleDateString(),
        Time: formattedTime,
        waterLevel,
        comment,
      };
    
      setData([newRow, ...data]);
      setWaterLevel('');
      setComment('');
      onWat('');
      onCom('');
      onDate(new Date());
      onTime(new Date());
      if (newRow.id === editRowId) {
        setEditRowId('');
      }
      if(data.length<=0)
      {
        myDataForTable([newRow,...data]);
      }
      else
      {
        const upDate=[newRow,...data]
          myDataForTable(upDate)
      }
    }
  };

   const handleUpdateRow = (rowId) => {
    if(waterLevel=='')
    {
      setError('Sorry Please Enter Water Level !')
    }
    else
    {
      setHidSubmit(false)
      const updatedData = data.map((item) => {
        if (item.id === rowId) {
          const formattedTime = `${selectedTime.getHours()}:${selectedTime.getMinutes()}`;
          return {
            ...item,
            Date: selectedDate.toLocaleDateString(),
            Time: formattedTime,
            waterLevel,
            comment,
          };
        }
        return item;
      });
    
      setData(updatedData);
      myDataForTable(updatedData);
      setWaterLevel('');
      onWat('');
      onCom('');
      onDate(new Date());
      onTime(new Date());
      setComment('');
      setEditRowId('');
      setSelectedDate(new Date());
      setSelectedTime(new Date())
    }
  };

  

  

  const handleDateChange = (_, selectedDate) => {
    const currentDate = selectedDate || new Date();
    setSelectedDate(currentDate);
    setShowDatePicker(false);
  };


  

  const handleTimeChange = (_, selectedTime) => {
    const currentTime = selectedTime || new Date();
    setSelectedTime(currentTime);
    setShowTimePicker(false);
  };

 
  const handleRadingChange = (text) => {
    // Remove any leading zeros
    setError('');
    const sanitizedText = text.replace(/^0+/, '');

  // Allow only one decimal point
  if (sanitizedText.indexOf('.') !== -1 && text.slice(-1) === '.') {
    // Check if the input already contains a second decimal point
    const decimalIndex = sanitizedText.indexOf('.');
    const secondDecimalIndex = sanitizedText.indexOf('.', decimalIndex + 1);
    
    if (secondDecimalIndex !== -1) {
      // If a second decimal point is found, do not update the input value
      return;
    }
  }
  onWat(text);
  onDate(selectedDate);
  onTime(selectedTime)
  setWaterLevel(text);
  };


  const renderTableHeader = () => (
    <View style={styles.tableHeader}>
      <Text style={styles.headerText}>Date</Text>
      <Text style={styles.headerText}>Time(hrs)</Text>
      <Text style={styles.headerText}>Water Level (m)</Text>
      <Text style={styles.headerText}>Comment</Text>
      <Text style={styles.headerText}>Edit</Text>
    </View>
  );

  const renderTableRow = ({ item, index }) => {
    const isEditing = item.id === editRowId;
    const [hours, minutes] = item.Time.split(':');
    const formattedHours= hours.padStart(2,'0');
    const formattedMinutes = minutes.padStart(2, '0');
    const formattedTime = `${formattedHours}:${formattedMinutes}`;
    return (
      <View style={styles.tableRow}>
        <Text style={styles.rowText}>{moment(item.Date, 'DD/MM/YYYY').format('DD/MM/YY')}</Text>
        <Text style={styles.rowText}>{formattedTime}</Text>
        <Text style={styles.rowText}>{item.waterLevel}</Text>
        <Text style={styles.rowText}>{item.comment}</Text>
        {isEditing ? (
          <TouchableOpacity style={styles.editButton} onPress={() => handleUpdateRow(item.id)}>
           <Ionicons name="refresh" size={24} color="blue" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.editButton} onPress={() => {setEditRowId(item.id);handleEditRow(item.id)}}>
            <AntDesign name="edit" size={24} color="green" />
          </TouchableOpacity>
        )}
      </View>
    );
  };
  

  return (
    
    <View style={styles.container}>
     <View style={styles.gps}>
      <Text style={[styles.note,{padding:0}]}>Latitude:{parseFloat(lat).toFixed(2)}</Text>
      <Text style={[styles.note,{padding:0}]}>Longitude:{parseFloat(lon).toFixed(2)}</Text>
      </View>
   
      <View style={styles.addRowContainer}>
        <TouchableOpacity style={styles.datePickerButton} onPress={() => setShowDatePicker(true)}>
          <Text style={styles.buttonText}>{moment(selectedDate).format('DD/MM/YY')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.timePickerButton} onPress={() => 
          {
            setShowTimePicker(true)
          }
          }>
          <Text style={styles.buttonText}>{moment(selectedTime).format('HH:mm')}</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Water Level"
          value={waterLevel}
          onChangeText={handleRadingChange}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Comment"
          value={comment}
          onChangeText={(e)=>
          {
            setComment(e);
            onCom(e);
            onDate(selectedDate)
            onTime(selectedTime)
          }}
        />
      
      {hideSubmit==false&&
        <TouchableOpacity style={styles.addButton} onPress={handleAddRow}>
        <AntDesign name="pluscircleo" size={24} color="green" />
      </TouchableOpacity>
      }

      </View>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
          maximumDate={new Date()}
          minimumDate={new Date()}
        />
      )}
      {showTimePicker && (
        <DateTimePicker
          value={selectedTime}
          mode="time"
          display='spinner'
          is24Hour={true}
          TextInput={TextInput}
          onChange={handleTimeChange}
          ref={hoursRef}
        />
      )}
      <Text></Text>
      {error&&
      <Text style={{color:'red',paddingBottom:9}}>{error}</Text>
      }
        {renderTableHeader()}
      <FlatList
        data={data}
        renderItem={renderTableRow}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.emptyListText}>No data available</Text>}
        nestedScrollEnabled={true}
      />
    </View>
    
  );
};

export default Table;