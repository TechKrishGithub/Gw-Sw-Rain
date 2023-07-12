import { StyleSheet } from "react-native";

// const styles=StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 10,
//         backgroundColor:'#d0e2e8'
//       },
//       listContainer:{
//         paddingHorizontal:10
//       },
//       title: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         margin:10
//       },
//       searchInput: {
//         width:'90%',
//         height: 60,
//         borderWidth: 2,
//         borderRadius:5,
//         borderColor:'#A9A9A9',
//         backgroundColor:'white',
//         paddingHorizontal: 10,
//         margin:10,
//         fontWeight:'600'
//       },
//       searcIcon:
//       {
//         margin:10
//       }
// })

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor:'#b0c5c2'
  },
  searchBarContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 16,
  },
  title:
  {
    fontWeight:'600'
  },
  searchBarContainer: {
    flex: 1,
    marginRight: 8,
  },
  stationCard: {
    backgroundColor:'#f0f6fd',
    marginBottom: 10
  },
  dataTableHeader: {
    alignItems: 'center',
    paddingVertical: 8,
    backgroundColor: '#f5f5f5',
    borderRadius:9
  },
  stationNumber: {
    color: 'blue',
    textDecorationLine: 'underline',
    fontSize: 18,
    fontWeight: 'bold',
  },
  centeredCell:
  {
  borderBottomColor:'gray',
  borderBottomWidth:0.5,
  justifyContent:'center',
  alignItems:'center'
  },
  card: {
    backgroundColor: '#f0f6fd',
    borderRadius: 8,
    padding: 8,
    elevation: 4,
    flexDirection:'row',
    justifyContent:'space-between',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8
  },
  
});


export default styles;