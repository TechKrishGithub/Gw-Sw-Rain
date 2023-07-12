import { StyleSheet } from "react-native";


const styles=StyleSheet.create({
     container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      containerInside:
      {
        justifyContent: 'center',
        alignItems: 'center',
        width:'70%',
        height:'35%'
        // backgroundColor:'rgba(21, 61, 82,0.8)'
      },
      backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch'
      },
      circle: {
        width: 4 * 60,
        height: 50,
        borderRadius: 30,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginBottom: 20,
       
      },
      confirmCircle: {
        width: 3 * 57,
        height: 40,
        borderRadius: 30,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingHorizontal: 10,
      },
      circle: {
        width: 3 * 57,
        height: 40,
        borderRadius: 30,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        paddingHorizontal: 10,
      },
      dot: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth:1,
        borderColor:'black',
        justifyContent: 'center',
        alignItems: 'center',
      },
      dotFilled: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: 'green',
      },
      input: {
        position: 'absolute',
        opacity: 0,
        width: '100%',
        height: '100%',
        textAlign: 'center',
        fontSize: 30,
      },
      button: {
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: '#18819e',
        borderRadius: 5,
        padding: 10,
      },
      text: {
        color: '#fff',
        fontWeight: 'bold',
      },
      buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        textTransform:'uppercase'
      },
      error:
      {
        color:'#ee7474',
        fontWeight:'bold'
      },
      success:
      {
        color:'#055533',
        fontWeight:'bold'
      },
      PinText:
      {
        color: 'black',
        fontWeight: 'bold',
        marginBottom: 10,
        borderBottomWidth:0.3,
        borderBottomColor:'#9a9db0',
        padding:10
      },
      user:
      {
        width:'100%',
        justifyContent:"center",
        alignItems:'center',
        marginBottom:100
      },
      userText:
      {
        color:'black'
      }
     
})

export default styles;