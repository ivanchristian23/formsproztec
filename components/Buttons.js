import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';

const myWidth = Dimensions.get('window').width;
const myHeight = Dimensions.get('window').height;
export default function Buttons() {
    const [x,setX]  = useState(0)
    const inc = ()=> setX(x+1)
  return (
    <SafeAreaView style={styles.container}>
      <View style ={styles.welcome}>
        <Text style= {[styles.txt,{fontSize: myWidth*0.05, color:'red'}]}>INFS 4104, Lab2</Text>
      </View>
      <View style = {styles.row1}>
        <TouchableOpacity onPress ={inc} style={{backgroundColor:'white', width:200, height:65,justifyContent:'center',alignItems:'center',borderWidth:2, borderColor:"black", borderRadius:10}} >
          <Text style={styles.txt}>Player 1</Text>
          
        </TouchableOpacity>
        <View style = {styles.row1}>
        <TouchableOpacity style={{backgroundColor:'white', width:200, height:65,justifyContent:'center',alignItems:'center',borderWidth:2, borderColor:"black", borderRadius:10}} >
          <Text style={styles.txt}>Player 2</Text>
        </TouchableOpacity>
        </View>
      </View>
        <View style={{alignSelf:"center",backgroundColor:"white",fontSize:30,justifyContent:'center',alignItems:'center',width:myWidth*0.5,height:myHeight*0.2,borderWidth: 2,borderColor: 'blue',borderRadius:10}}>
          <Text style={styles.txt}> {x} </Text>
        </View>
      <View style = {styles.row1}>
        <TouchableOpacity style={{backgroundColor:'white', width:200, height:65,justifyContent:'center',alignItems:'center',borderWidth:2, borderColor:"black", borderRadius:10}} >
          <Text style={styles.txt}>Player 3</Text>
        </TouchableOpacity>
        <View style = {styles.row1}>
        <TouchableOpacity style={{backgroundColor:'white', width:200, height:65,justifyContent:'center',alignItems:'center',borderWidth:2, borderColor:"black", borderRadius:10}} >
          <Text style={styles.txt}>Player 4</Text>
        </TouchableOpacity>
        </View>
      </View>
      <View style = {styles.last1}>
        <View style={{backgroundColor:'white', width:100, height:50,justifyContent:'center',alignItems:'center',borderWidth:2, borderColor:"black" }} >
          <Text style={styles.txt}>0</Text>
        </View>
        <View style={{backgroundColor:'white', width:100, height:50,justifyContent:'center',alignItems:'center',borderWidth:2, borderColor:"black" }} >
          <Text style={styles.txt}>0</Text>
      </View>
        <View style={{backgroundColor:'white', width:100, height:50,justifyContent:'center',alignItems:'center',borderWidth:2, borderColor:"black" }} >
          <Text style={styles.txt}>0</Text>
        </View>
        <View style={{backgroundColor:'white', width:100, height:50,justifyContent:'center',alignItems:'center',borderWidth:2, borderColor:"black" }} >
          <Text style={styles.txt}>0</Text>
        </View>
        </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: 'grey',
    justifyContent: 'space-evenly',
  },
  txt: {
    fontSize: myWidth*0.03,

  },
  row1: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor:'red',
    shadowOpacity:5,
    shadowRadius:3

  },
  middle: {
    justifyContent: 'center',
    alignItems: 'center',
  
  },
  last1: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  
  // firstcol: {
  //   backgroundColor: '#fff',
  //   flexDirection:"row",
  //   alignItems: "flex-start",
  //   justifyContent: "space-between",
  // },
  // secondcol: {
  //   backgroundColor: '#fff',
  //   flexDirection:"row",
  //   alignItems: "flex-start",
  //   justifyContent: "space-between",
  // },
  welcome: {
    alignItems: "center",
    justifyContent: "center",

  },
  // thirdcol: {
  //   backgroundColor: '#fff',
  //   flexDirection:"row",
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  // firstcol1:{
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   flexDirection:"column",
  //   alignItems: "flex-start",
  //   justifyContent: "space-evenly",
  // },
  // secondcol1:{
  //   flex: 1,
  //   flexDirection:"column",
  //   alignItems: "flex-end",
  //   justifyContent: "space-evenly",
  // }
});
