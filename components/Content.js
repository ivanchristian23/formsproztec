import { StyleSheet, Text, View, Image, Touchable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Dimensions } from 'react-native';
const myWidth = Dimensions.get('window').width;
const myHeight = Dimensions.get('window').height;
const myFontSize = myHeight* 0.018 + myWidth*0.018

const Content = () => {
    const [flag,setFlag] = useState(false);
    const [border,setBorder] = useState(false);
    const change = ()=>{
        setFlag(!flag)
    }
    const show = ()=>{
        setBorder(!border)
    }
  return (
    <View style={styles.container}>
      <View style = {{backgroundColor:'red', alignItems:'center'}}>
        <Text style = {[styles.txt,{color:'white'}]}>INFS4104 -Fall23 - Assignment1</Text>
      </View>
      <View style={{flexDirection:'row', justifyContent:'space-around'}}>
        <View style={[styles.box,{backgroundColor: flag? 'lightblue': 'grey'}]}>
            <Text>
                1
            </Text>
        </View>
        <View style={[styles.box,{backgroundColor: flag? 'green': 'grey'}]}>
            <Text>
                2
            </Text>
        </View>
        <View style={[styles.box,{backgroundColor: flag? 'red': 'grey'}]}>
            <Text>
                3
            </Text>
        </View>
        <View style={[styles.box,{backgroundColor: flag? 'yellow': 'grey'}]}>
            <Text>
                4
            </Text>
        </View>
      </View>
      <View style= {{flexDirection:'row', justifyContent:'space-around'}}>
        <Image source={require('../assets/asd.png')}
         style={[{width:myWidth/4, height:myHeight/4,},{borderWidth: border? 1:0}]}
         resizeMode='center'></Image>
         <Image source={require('../assets/jack.jpeg')}
         style={[{width:myWidth/4, height:myHeight/4,},{borderWidth: border? 1:0}]}
         resizeMode='center'></Image>
         <Image source={require('../assets/doge.jpeg')}
         style={[{width:myWidth/4, height:myHeight/4,},{borderWidth: border? 1:0}]}
         resizeMode='center'></Image>

      </View>
      <View style= {{flexDirection:'row', justifyContent:'space-around'}}>
        <TouchableOpacity
        style={styles.touch}
        onPress={change}><Text>{flag? 'Turn Off':'Turn On'}</Text></TouchableOpacity>
        <TouchableOpacity
        style={styles.touch}
        onPress={show}>
            <Text>{border? 'No border':'Set Border'}</Text></TouchableOpacity>
      </View>
    </View>
  )
}

export default Content

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'space-around'
      },
      txt:{
        fontSize:myFontSize 
      },
      box:{
        backgroundColor: 'grey',
        height: myHeight *0.08,
        width: myWidth *0.15,
        justifyContent:'center',
        alignItems: 'center'
      },
      touch:{
        borderWidth:1,
        backgroundColor:'lightblue',
        borderRadius:4,
        height: myHeight *0.05,
        width: myWidth *0.3,
        justifyContent: 'center',
        alignItems: 'center'
      },


})