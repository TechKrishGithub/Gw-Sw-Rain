import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList ,Modal} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons,Entypo,AntDesign } from '@expo/vector-icons';
import styles from './style';
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';

const TableAm = ({myDataForTable,savedData,stationNumber,hideSave,lat,lon}) => {
  const [data, setData] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [readingAm, setReadingAm] = useState('');
  const [comment, setComment] = useState('');
  const [addHide, setAddHide] = useState(false);
  const [hideSubmit, setHideSubmit] = useState(false);
  const [editRowId, setEditRowId] = useState('');
  const [myCheck,setForMycheck]=useState([]);
  const [error,setError]=useState('');
  const [modalVisible, setModalVisible] = useState(false);





  useEffect(()=>
{
  setHideSubmit(false)
  const check=savedData?.filter(v=>v.stationNumber==stationNumber?.name);
  console.log(check)
  if(check.length>0)
  {
    setData(check);
    setForMycheck(check);
  }
  else
  {
    setData([]);
    setForMycheck([]);
    setHideSubmit(false);
    setSelectedDate(new Date());
    setSelectedTime(new Date());
    setReadingAm('');
    setComment('');
  }
},[stationNumber])



useEffect(()=>
{
  if(data.length>1)
  {
    console.log('This is Sample !')
  }
  else
  {
    if(data.length>0)
    {
      const defaultTime = new Date();
      defaultTime.setHours(16);
      defaultTime.setMinutes(0);
      setSelectedTime(defaultTime)
    }
    else
    {
      const defaultTime = new Date();
      defaultTime.setHours(8);
      defaultTime.setMinutes(0);
      setSelectedTime(defaultTime)
    }
  }
  data.length>1?selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }):data.length>0?'16-Hours':'8-Hours'
},[data])



  const handleEditRow = (id) => {
    if(error)
    {
      setError('')
    }
    if (data.length > 0) {
      const myData=data.filter(v=>v.id === id);
      setHideSubmit(true);
      const firstRecord = myData[0];
      const [hours, minutes] = firstRecord.time.split(':');
      const editedTime = new Date();
      editedTime.setHours(hours);
      editedTime.setMinutes(minutes);
  
      setSelectedTime(editedTime);

      setComment(firstRecord.comment);
      setReadingAm(firstRecord.readingAm);

      const convertToDateObject = (dateString) => {
        const parts = dateString.split('/');
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1; // Months in JavaScript are zero-based
        const year = parseInt(parts[2], 10);
        return new Date(year, month, day);
        };
        
        const defaultDate = convertToDateObject(firstRecord.Date);
        setSelectedDate(defaultDate);
    }
  };

  const handleAddRow = () => {
    if(readingAm=='')
    {
      setError('Sorry Please Enter Reading !')
    }
    else
    {
      setError('');
      const formattedTime = `${selectedTime.getHours()}:${selectedTime.getMinutes()}`;
    const newRow = {
      id: Date.now().toString(),
      Date: selectedDate.toLocaleDateString(),
      time: formattedTime,
      readingAm: readingAm,
      comment: comment,
    };

    setData([newRow, ...data]);
    setSelectedTime(new Date());
    setReadingAm('');
    setComment('');

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
    if(readingAm=='')
    {
      setError('Sorry Please Enter Reading !');
    }
    else
    {
      setError('');
    setHideSubmit(false)
    const updatedData = data.map((item) => {
      if (item.id === rowId) {
        const formattedTime = `${selectedTime.getHours()}:${selectedTime.getMinutes()}`;
        return {
          ...item,
          id: Date.now().toString(),
          Date: selectedDate.toLocaleDateString(),
          time: formattedTime,
          readingAm: readingAm,
          comment: comment,
        };
      }
      return item;
    });
  
    setData(updatedData);
    myDataForTable(updatedData);
    setEditRowId('');
    setReadingAm('');
    setComment('');
    setSelectedTime(new Date());
    setSelectedDate(new Date());
  }
  };






  const handleDateChange = (_, selectedDate) => {
    const currentDate = selectedDate || new Date();
    setSelectedDate(currentDate);
    setShowDatePicker(false);
  };

  const handleTimeChange = (_, selectedTime) => {
    const currentTime = selectedTime || new Date();
    // const formattedTime = moment(currentTime).format('HH:mm')
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

  setReadingAm(text);
  };


  const renderTableHeader = () => (
    <View style={styles.tableHeader}>
      <Text style={styles.headerText}>Date</Text>
      <Text style={styles.headerText}>Time(hrs)</Text>
      <Text style={styles.headerText}>Reading</Text>
      <Text style={styles.headerText}>Comment</Text>
      {!myCheck.length>0&&<Text style={styles.headerText}>Edit</Text>}
    </View>
  );

  const renderTableRow = ({ item, index }) => {
  const isEditing = item.id === editRowId;
  const [hours, minutes] = item.time?.split(':');
  const formattedHours= hours.padStart(2,'0');
  const formattedMinutes = minutes.padStart(2, '0');
  const formattedTime = `${formattedHours}:${formattedMinutes}`;
  return(
    <View style={styles.tableRow}>
      <Text style={styles.rowText}>{moment(item.Date, 'DD/MM/YYYY').format('DD/MM/YY')}</Text>
      <Text style={styles.rowText}>{formattedTime}</Text>
      <Text style={styles.rowText}>{item.readingAm}</Text>
      <Text style={styles.rowText}>{item.comment}</Text>
      {isEditing ? (
          <TouchableOpacity style={styles.editButton} onPress={() => handleUpdateRow(item.id)}>
           <Ionicons name="refresh" size={24} color="blue" />
          </TouchableOpacity>
        ) : (
          !hideSave?
          !myCheck.length>0&&
          <TouchableOpacity style={styles.editButton} onPress={() => {setEditRowId(item.id);handleEditRow(item.id)}}>
            <AntDesign name="edit" size={24} color="green" />
          </TouchableOpacity>
          :
          null
        )}
      {/* {myData.length > 0 || addHide ? (
        <TouchableOpacity style={styles.editButton} onPress={handleEditRow}>
          <AntDesign name="edit" size={24} color="green" />
        </TouchableOpacity>
      ) : null} */}
    </View>
  );
    }
  return (
    <View style={styles.container}>
       <View style={styles.gps}>
      <Text style={[styles.note,{padding:0}]}>Latitude:{parseFloat(lat).toFixed(2)}</Text>
      <Text style={[styles.note,{padding:0}]}>Longitude:{parseFloat(lon).toFixed(2)}</Text>
      </View>
       { !myCheck.length>0 &&
      <View style={styles.addRowContainer}>
        <TouchableOpacity style={styles.datePickerButton} onPress={() => setShowDatePicker(true)}>
          <Text style={styles.buttonText}>{moment(selectedDate).format('DD/MM/YY')}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.timePickerButton} onPress={() => setShowTimePicker(true)}>
           <Text style={styles.buttonText}>{moment(selectedTime).format('HH:mm')}</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Reading"
          value={readingAm}
          onChangeText={handleRadingChange}
          keyboardType="numeric"
        //   editable={!disableReadingPm} // Disable input if it's morning
        />
        <TextInput
          style={styles.input}
          placeholder="Comment"
          value={comment}
          onChangeText={setComment}
        />
       

       {/* {hideSubmit==false&&
          <TouchableOpacity style={styles.addButton} onPress={handleAddRow}>
            <AntDesign name="pluscircleo" size={24} color="green" />
          </TouchableOpacity>
} */}

{!hideSave?
    hideSubmit==false&&
          <TouchableOpacity style={styles.addButton} onPress={handleAddRow}>
          <AntDesign name="pluscircleo" size={24} color="green" />
        </TouchableOpacity>
  :null
    }
      </View>
}

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
          display="spinner"
          is24Hour={true}
          TextInput={TextInput}
          onChange={handleTimeChange}
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

export default TableAm;
