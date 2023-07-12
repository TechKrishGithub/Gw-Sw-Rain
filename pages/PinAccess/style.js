import { StyleSheet } from "react-native";

const styles=StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
      linearGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch'
      },
      containerInside:
      {
        alignItems: 'center',
        width:'80%',
        height:'30%',
      },
      circle: {
        width: 3 * 60,
        height: 50,
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
        // backgroundColor: 'black',
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
      error:
      {
        color:'#f83c44',
        fontWeight:'500'
      },
      EnterPin:
      {
        fontWeight:'bold',
        color:'black'
      },
      button: {
        backgroundColor: '#18819e',
        borderRadius: 5,
        padding: 10,
      },
      buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        textTransform:'uppercase'
      },
      text: {
        color: 'black',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
      },
      user:
      {
        width:'100%',
        justifyContent:"center",
        alignItems:'center',
      },
      
      userText:
      {
        color:'black',
        fontSize:12
      },
      blurOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
})

export default styles;