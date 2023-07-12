import React, { useEffect, useState } from 'react';
import { View, Text, Modal, TouchableOpacity, TextInput, ScrollView, StyleSheet } from 'react-native';
import { AntDesign,Ionicons,MaterialIcons } from '@expo/vector-icons';
import styles from './style';

const DropDown = (props) => {
  const {
    placeholderText,
    data,
    label,
    handleChange,
    selectedValue,
    iconName,
    myItem,
    maxHeight,
    myData,
    lod
  } = props;
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [search,setSearch]=useState(false);
  const [searching,setSearching]=useState(false);

  const [value, setValue] = useState(selectedValue ? selectedValue : null);
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    if ( selectedItem ) {
      return (
        <Text style={[styles.label, selectedItem && { color: '#5c2f63' }]}>
          {label}
        </Text>
      );
    }
    return null;
  };
  const SecondArray = [
    { id: 1, nursery: 'Jose Limited' },
    { id: 2, nursery: 'Piajo Banika' },
    // Rest of the items
  ];

//   const options = data.map((item) => ({
//     id: item.id,
//     name: item.name,
//     // disabled: myData.some((secondItem) => secondItem.nursery === item.nurseryname),
//   }));

useEffect(()=>
{

   setSearching(true);
   setTimeout(()=>
   {
    setSearching(false)
   },300)
},[searchText])

  const handleSelectItem = (item) => {
      setSelectedItem(item);
      setModalVisible(false);
      handleChange(item);
      setSearchText('');
    
  };

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const clearSearch = () => {
    setSearchText('');

  };

 

//   const filteredOptions = data.filter((item) =>
//     item.name.toLowerCase().startsWith(searchText.toLowerCase())
//   );

//   const filteredOptions = data.filter((item) =>
//   item.name.toLowerCase().includes(searchText.toLowerCase())
// );

const filteredOptions = data.filter((item) => {
  const formattedSearchQuery = searchText.toLowerCase().replace(/\s+/g, '');
  const formattedName = item.name.toLowerCase().replace(/\s+/g, '');

  return formattedName.includes(formattedSearchQuery);
});



  const handleBack = () => {
    setModalVisible(false);
    setSearchText('');
    setSearch(false);
  };

  return (
    <View style={styles.container}>
        {renderLabel()}
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={[styles.dropdown, { flexDirection:'row',alignItems:'center' }, selectedItem && { borderColor: '#5c2f63' }]}
      >
        
       <AntDesign
            style={styles.icon}
            color={selectedItem ? "#5c2f63" : "black"}
            name={iconName}
            size={20}
          />
        <Text>{selectedItem ? selectedItem.name : placeholderText}</Text>
        <View style={{position:'absolute',right:3}}>
          {
            selectedItem&&
            selectedItem.lat?
            <Text style={styles.note}>Latitude: {parseFloat(selectedItem.lat).toFixed(2)}</Text>
            :
            null
          }
            {
            selectedItem&&
            selectedItem.lon?
            <Text style={styles.note}>Longitude: {parseFloat(selectedItem.lon).toFixed(2)}</Text>
            :
            null
          }
    
        </View>
       
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        animationIn="slideInUp" // Specify the desired animation type for modal enter
        animationOut="slideOutDown" // Specify the desired animation type for modal exit
        animationInTiming={500} // Set the duration for modal enter animation
        animationOutTiming={500} // Set the duration for modal exit animation
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.searchContainer}>
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={25} color="black" />
            </TouchableOpacity>
           
              <TextInput
                style={styles.searchInput}
                placeholder="Search..."
                onChangeText={handleSearch}
                value={searchText}
              />
              {searchText !== '' && (
                <TouchableOpacity style={styles.clearIconContainer} onPress={clearSearch}>
                  <AntDesign name="closecircle" size={20} color="black" />
                </TouchableOpacity>
              )}
            </View>
            <ScrollView>
              {
                searching&&
                <View style={{alignItems:'center'}}>
                <Text>Searching...</Text>
                </View>
              }
             
            {search ? ( // Display "Searching..." while search is in progress
              // <ActivityIndicator style={styles.loading} size="small" color="#00f" />
              <View style={{alignItems:'center'}}>
              <Text style={[styles.noResultsText]}>Searching.....</Text>
              </View>
            ) :
            filteredOptions.length > 0 ? (
                filteredOptions.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => handleSelectItem(item)}
                    style={[styles.option, item.disabled && styles.disabledOption,item.name === myItem?.name && styles.selectedOption]}
                  >
                    <Text style={styles.optionText}>{item.name}</Text>
                  </TouchableOpacity>
                ))
              ) : (
                <Text style={styles.notFoundText}>No results found</Text>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DropDown;

