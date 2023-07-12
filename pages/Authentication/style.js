import { StyleSheet } from "react-native";

const styles=StyleSheet.create({
    InputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderRadius: 15,
      padding: 10,
      marginVertical: 10,
      borderColor: '#ccc',
      width:'95%',
    },
    FieldInput: {
      flex: 1,
      height: 40,
      fontSize:20
    },
    user:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'grey',
    },
    Field:{
      width:'90%',
      borderWidth:1,
      borderColor:'grey',
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'#f7f7fd',
      borderRadius:15
    },
    InputText:
    {
      marginLeft:10,
      fontSize:20,
    },
   Input: 
    {
        height:50,
        width:'95%',
        borderWidth:1,
        borderColor:'grey',
        fontSize:20,
        justifyContent:'center',
    },
    InputPassword: 
    {
        height:50,
        width:'95%',
        borderWidth:1,
        borderColor:'grey',
        fontSize:20,
        justifyContent:'center',
        flexDirection:'row',
    },
    button: {
      backgroundColor: '#3d9f4a',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      textAlign: 'center',
    },
  })

  export default styles;
  