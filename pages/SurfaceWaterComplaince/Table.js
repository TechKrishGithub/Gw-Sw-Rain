import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import styles from './style';

const Table = () => {
  const [data, setData] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [readingPm, setReadingPm] = useState('');
  const [readingAm, setReadingAm] = useState('');
  const [comment, setComment] = useState('');
  const [addHide, setAddHide] = useState(false);
  const [hideSubmit, setHideSubmit] = useState(false);

  const myData = data.filter((v) => v.date === new Date().toLocaleDateString());

  const handleEditRowf = () => {
    console.log(myData);
  };

  const handleEditRow = () => {
    if (data.length > 0) {
      setHideSubmit(true);
      const firstRecord = myData[0];
      setReadingAm(firstRecord.readingAm);
      setComment(firstRecord.comment);
      setReadingPm(firstRecord.readingPm);

      const convertToDateObject = (dateString) => {
        const parts = dateString.split('/');
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1; // Months in JavaScript are zero-based
        const year = parseInt(parts[2], 10);
        return new Date(year, month, day);
      };

      const defaultDate = convertToDateObject(data[0].date);
      setSelectedDate(defaultDate);
    }
  };

  const handleAddRow = () => {
    const newRow = {
      id: Date.now().toString(),
      date: selectedDate.toLocaleDateString(),
      readingAm: readingAm,
      readingPm: readingPm,
      comment: comment,
    };

    setData([newRow, ...data]);
    setReadingAm('');
    setReadingPm('');
    setComment('');
    setAddHide(true);
  };

  const handleEditSubRow = () => {
    const newRow = {
      id: Date.now().toString(),
      date: selectedDate.toLocaleDateString(),
      readingAm: readingAm,
      readingPm: readingPm,
      comment: comment,
    };

    setData((prevData) => {
      const newData = prevData.map((item) => {
        if (item.date === selectedDate.toLocaleDateString()) {
          return newRow;
        }
        return item;
      });
      return newData;
    });

    setReadingAm('');
    setReadingPm('');
    setComment('');
    setHideSubmit(false);
  };

  const handleDateChange = (_, selectedDate) => {
    const currentDate = selectedDate || new Date();
    setSelectedDate(currentDate);
    setShowDatePicker(false);
  };

  const isMorning = () => {
    const currentHour = new Date().getHours();
    return currentHour >= 8 && currentHour < 16; // Morning is from 8:00 to 15:59
  };

  const disableReadingAm = !isMorning();
  const disableReadingPm = isMorning();

  const renderTableHeader = () => (
    <View style={styles.tableHeader}>
      <Text style={styles.headerText}>Date</Text>
      <Text style={styles.headerText}>Reading(am)</Text>
      <Text style={styles.headerText}>Reading(pm) </Text>
      <Text style={styles.headerText}>Comment</Text>
      <Text style={styles.headerText}>Edit</Text>
    </View>
  );

  const renderTableRow = ({ item }) => (
    <View style={styles.tableRow}>
      <Text style={styles.rowText}>{item.date}</Text>
      <Text style={styles.rowText}>{item.readingAm}</Text>
      <Text style={styles.rowText}>{item.readingPm}</Text>
      <Text style={styles.rowText}>{item.comment}</Text>
      {myData.length > 0 || addHide ? (
        <TouchableOpacity style={styles.editButton} onPress={handleEditRow}>
          <AntDesign name="edit" size={24} color="green" />
        </TouchableOpacity>
      ) : null}
    </View>
  );

  return (
    <View style={styles.container}>
      {renderTableHeader()}
      <FlatList
        data={data}
        renderItem={renderTableRow}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Text style={styles.emptyListText}>No data available</Text>}
      />
      <View style={styles.addRowContainer}>
        <TouchableOpacity style={styles.datePickerButton} onPress={() => setShowDatePicker(true)}>
          <Text style={styles.buttonText}>{selectedDate.toLocaleDateString()}</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Reading am"
          value={readingAm}
          onChangeText={setReadingAm}
          keyboardType="numeric"
          editable={!disableReadingAm} // Disable input if it's not morning
        />
        <TextInput
          style={styles.input}
          placeholder="Reading pm"
          value={readingPm}
          onChangeText={setReadingPm}
          keyboardType="numeric"
          editable={!disableReadingPm} // Disable input if it's morning
        />
        <TextInput
          style={styles.input}
          placeholder="Comment"
          value={comment}
          onChangeText={setComment}
        />
        {hideSubmit ? (
          <TouchableOpacity style={styles.addButton} onPress={handleEditSubRow}>
            <Ionicons name="refresh" size={24} color="blue" />
          </TouchableOpacity>
        ) : null}

        {!myData.length > 0 || !addHide ? (
          <TouchableOpacity style={styles.addButton} onPress={handleAddRow}>
            <AntDesign name="pluscircleo" size={24} color="green" />
          </TouchableOpacity>
        ) : null}
      </View>
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
          maximumDate={new Date()}
        />
      )}
    </View>
  );
};

export default Table;
