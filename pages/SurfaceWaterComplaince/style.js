import { StyleSheet } from "react-native";
const styles =StyleSheet.create({
    container: {
      backgroundColor: '#ffffff',
      padding:8,
      margin:14,
      borderWidth:0.5,
      borderColor:'gray',
      borderRadius:5
    },
    editButton:
    {
      padding:16,
      alignItems:'center'
    },
    tableHeader: {
      flexDirection: 'row',
      backgroundColor: '#726cb0',
      paddingVertical: 8,
      paddingHorizontal: 16,
      marginBottom: 8,
      borderRadius: 8,
    },
    headerText: {
      flex: 1,
      fontWeight: '500',
      textAlign: 'center',
      color:'white',
      fontSize:12
    },
    tableRow: {
      flexDirection: 'row',
      backgroundColor: '#d6d2ff',
      paddingHorizontal: 16,
      marginBottom: 8,
      borderRadius: 8,
      alignItems: 'center',
    },
    rowText: {
      flex: 1,
      textAlign: 'center',
      color:'#272631'
    },
    addRowContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 16,
    },
    datePickerButton: {
      flex: 1,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 4,
      paddingVertical: 8,
      paddingHorizontal: 12,
      marginRight: 8,
      alignItems: 'center',
      backgroundColor: '#f0f0f0',
    },
    timePickerButton: {
      flex: 1,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 4,
      paddingVertical: 8,
      paddingHorizontal: 12,
      marginRight: 8,
      alignItems: 'center',
      backgroundColor: '#f0f0f0',
    },
    buttonText: {
      textAlign: 'center',
      fontSize:12
    },
    gps:
    {
      flexDirection:'row',
      justifyContent:'space-between',
      paddingBottom:5
    },
    modal:
    {
    backgroundColor:'rgba(0,0,0,0.2)'
    },
    modalContent:
    {
      backgroundColor: 'white',
       padding: 20,
       width:'40%',
       justifyContent: 'center',
       borderRadius:10
    },
    modalText:
    {
      padding:4,
      fontWeight:'500'
    },
    textContainer:
    {
      borderBottomColor:'gray',
      borderBottomWidth:0.5
    },
    input: {
      flex: 1,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 4,
      paddingVertical: 3,
      paddingHorizontal: 12,
      marginRight: 8,
      backgroundColor: '#f0f0f0',
      color:'black'
    },
    note: {
      fontStyle: 'italic',
      fontSize: 14,
      color: '#888',
      padding:16
    },
    addButton: {
      padding: 8,
      borderRadius: 20,
      backgroundColor: '#f0f0f0',
    },
    emptyListText: {
      textAlign: 'center',
      marginTop: 16,
      fontStyle: 'italic',
    },
    button: {
        backgroundColor: '#4CAF50',
        borderRadius: 8,
        padding: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
        width:'50%'
      },
      buttonTextSave: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
      },
  });
  
  export default styles;
 
  