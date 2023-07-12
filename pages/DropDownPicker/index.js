import React, { useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, Text, ActivityIndicator,TouchableWithoutFeedback } from 'react-native';
import { TextInput, Button, Provider, DefaultTheme } from 'react-native-paper';
import styles from './style';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';


const Dropdown = ({ items, label, placeholder, onSelect, stationName,loading }) => {
  const [openDropdown, setOpenDropdown] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [searchValue, setSearchValue] = React.useState('');
  const [editable, setEditable] = React.useState(true);
  const [searching, setSearching] = React.useState(false); // Added searching state
 
  useEffect(() => {
    Icon.loadFont(); // Load the icon font
  }, []);

  const handleDropdownSelect = (item) => {
    
    setSelectedItem(item);
    onSelect(item);
    setOpenDropdown(false);
    setEditable(!editable);
    setSearchValue('');
   
  };

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: 'blue', // Change the outline border color
    },
  };

  const toggleDropdown = () => {
    if (stationName) {
      setOpenDropdown(false);
      setEditable(!editable);
    } else {
      setOpenDropdown(!openDropdown);
      setEditable(!editable);
    }
  };

  const handleSearchChange = (value) => {
    setSearching(true); 
    setSearchValue(value)
    setEditable(!editable);
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().startsWith(searchValue.toLowerCase())
  );

  const filter = items.filter((v) => v.id === stationName?.id);

  

  useEffect(() => {
    setTimeout(()=>
    {
      setSearching(false);
    },100) // Hide search progress when search is complete
  }, [filteredItems]); // Run the effect whenever filteredItems changes

  const handleOutsidePress = () => {
    setOpenDropdown(false);
  };

  const renderLabel = () => {
    if(stationName||selectedItem)
    {
    return (
        <Text style={[styles.label, selectedItem && { color: '#5c2f63' }]}>
          {label}
        </Text>
      );
    }
    }

 

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
    
    <View style={styles.container}>
        {renderLabel()}
        <View style={styles.dropdown}>
        
            <MaterialIcons
            style={styles.icon}
            color={stationName ? "#5c2f63" : "black"}
            name="change-history"
            size={20}
          />
        <Text>{stationName ? parseFloat(filter[0]?.name).toString():label}</Text>
        </View>
      {/* <TextInput
        label={label}
        value={stationName ? parseFloat(filter[0]?.name).toString(): selectedItem ? selectedItem.name : ''}
        mode="outlined"
        editable={false}
        onFocus={toggleDropdown}
        autoCorrect
        right={<TextInput.Icon  name="keyboard-arrow-down" onPress={toggleDropdown} color="black" size={20} />}
        style={{backgroundColor:'white'}}
      />
<MaterialIcons name="confirmation-number" size={24} color="black" /> */}
     
      {openDropdown && (
         <View style={[styles.dropdownContainer, { zIndex: 1 }]}>
          <TextInput
            label={placeholder}
            value={searchValue}
            onChangeText={handleSearchChange}
            mode="outlined"
            style={styles.searchInput}
            right={
                <TextInput.Icon
                  name="close"
                  onPress={() => {
                    setSearchValue('');
                    setOpenDropdown(false);
                  }}
                  color="blue"
                  style={{color: 'red'}}
                />
            }
            onBlur={() => {
              setOpenDropdown(false);
            }}
          />
          <ScrollView style={styles.dropdownMenu}>
            {searching ? ( // Display "Searching..." while search is in progress
              // <ActivityIndicator style={styles.loading} size="small" color="#00f" />
              <View style={{alignItems:'center'}}>
              <Text style={[styles.noResultsText]}>Searching.....</Text>
              </View>
            ) : filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.dropdownItem}
                  onPress={() => handleDropdownSelect(item)}
                >
                  <Text style={styles.dropdownItemText}>{item.name}</Text>
                </TouchableOpacity>
              ))
            ) : (
              <View style={{alignItems:'center'}}>
              <Text style={styles.noResultsText}>No results found</Text>
              </View>
            )}
          </ScrollView>
        </View>
      )}
    </View>
    </TouchableWithoutFeedback>
  );
};

export default Dropdown;
