import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      padding: 16,
      backgroundColor: "white",
    },
    icon: {
      marginRight: 5,
    },
    dropdown: {
      height: 50,
      borderColor: "gray",
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 8,
      flexDirection:'row',
      alignItems:'center'
    },
    label: {
      position: "absolute",
      backgroundColor: "white",
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 13,
    },
    dropdownContainer: {
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 5,
      backgroundColor: '#fafafa',
      height:300
    },
    searchInput: {
      padding: 10,
      backgroundColor: '#fafafa',
    },
    dropdownItem: {
      padding: 10,
      marginTop: 2,
      backgroundColor: '#fafafa',
      borderColor: 'gray',
      borderWidth: 1,
    },
    dropdownItemText: {
      fontSize: 16,
      color: 'black',
    },
    dropdownMenu: {
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 5,
      marginTop: -1,
      backgroundColor: '#fafafa',
    },
    noResultsText:
    {
      fontStyle: 'italic',
      color: '#888',
    },
    
  });
  
  
  
  export default styles;