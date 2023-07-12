import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "white"
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
  },
  note: {
    fontSize:12,
    fontStyle: 'italic',
    color: '#888'
  },
  selectedOption: {
    backgroundColor: '#f2f2f2',
  },
  icon: {
    marginRight: 5,
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
  placeholderStyle: {
    fontSize: 13,
  },
  selectedTextStyle: {
    fontSize: 13,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 13,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingVertical:5
  },
  searchInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 8,
    fontWeight:'500'
  },
  clearIconContainer: {
    padding: 8,
  },
  option: {
    paddingHorizontal: 16,
    paddingVertical: 5,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  optionText: {
    fontSize: 16,
    paddingVertical: 8,
    color: 'black',
    fontWeight:'400'
  },
  
  disabledOption: {
    opacity: 0.5,
  },
  notFoundText: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 16,
    color: 'gray',
    borderBottomWidth:1,
    borderBottomColor:'black'
  },
  backButton:
  {
    paddingHorizontal:10
  }

});

export default styles;
