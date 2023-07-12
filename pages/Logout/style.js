import { StyleSheet } from "react-native";

const style = StyleSheet.create({
    containerForTotal:
    {
        marginTop:'20%',
        justifyContent:'center',
        alignItems:'center',
    
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    
    },
    modal: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      
    },
    modalContent: {
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 20,
    },
    modalText: {
      fontWeight: 'bold',
      marginBottom: 10,
    },
    modalButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    modalButton: {
      padding: 10,
      borderRadius: 5,
      width: 100,
      alignItems: 'center',
    },
    modalCancelButton: {
      backgroundColor: '#999',
    },
    modalLogoutButton: {
      backgroundColor: 'red',
    },
    modalButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    text: {
        color: '#fff',
        fontWeight: 'bold',
        marginRight: 5,
      },
      dots: {
        color:'#fff',
        fontSize:30,
        marginTop:-10
      },
      profile:
      {
        borderWidth:0.5,
        borderColor:'gray',
        borderRadius:100,
        height:'32%',
        width:'27%',
        backgroundColor:'#dedede',
        justifyContent:'center',
        alignItems:'center'
      },
      user:
      {
        fontWeight:'bold',
        color:'#333'
      },
      Table:
      {
        flex:1,
        width:'90%',
        justifyContent:'center',
        alignItems:'center'
      },
      cell:
      {
        alignItems:'center',
        borderBottomColor:'gray',
        borderBottomWidth:0.5
      },
      textTable:
      {
        fontWeight:'500',
      },
      containerForLogout: {
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: '#e74c3c',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        width:'20%',
        height:'38%'
      },
      textForLogout: {
        color: '#fff',
        marginLeft: 10,
        fontWeight: 'bold'
      },

      button: {
        backgroundColor: '#4CAF50',
        borderRadius: 5,
        padding: 10,
        width:150,
        height:40,
        flexDirection: 'row',
        alignItems: 'center',
      },
      buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        marginLeft: 10,
        justifyContent:'center',
        alignItems:'center'
      },
      Buttons:
      {
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
      },
      containerForButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,

      },
      buttonNew: {
        backgroundColor: 'blue',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 25,
        marginHorizontal: 5,
        flexDirection: 'row',
        alignItems: 'center'
      },
      buttonTextNew: {
        color: 'white',
        marginLeft: 5,
        fontWeight:'500'
      },
      userIconContainer: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
      },
      buttonGap: {
      padding:25 // Adjust the value as needed for the desired gap height
      },
  });
  

export default style;