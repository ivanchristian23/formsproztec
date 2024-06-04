import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Image, Touchable, TouchableOpacity } from 'react-native';
const myWidth = Dimensions.get('window').width;
const myHeight = Dimensions.get('window').height;
const myFontSize = myHeight* 0.01 + myWidth*0.01;
import { Dimensions } from 'react-native';
export default function Item(param) {
    const [qty,setQty] = useState(0)
    const inc =()=>{
      setQty(pre=>pre+1)
    }
    const dec=()=>{
      if (qty==0) return
      setQty(pre=>pre-1)
    }
  return (
    <View style={{flexDirection: 'row',justifyContent:'space-around'}}>
      <Image source={param.ob.pic}
      style={{width:myWidth/4, height:myHeight/4}}
      resizeMode='center'/>
    <TouchableOpacity style={styles.myStyle}
    onPress={inc}>
      <Text style={styles.border1}>
        +
      </Text>
    </TouchableOpacity>
    <View style={styles.myStyle}>
    <Text style={[styles.border1,{borderWidth:0}]}>{param.ob.qty}</Text>  
    </View>
    
    <TouchableOpacity
    style={styles.myStyle}
    onPress={dec}>
      <Text style={styles.border1}>
        -
      </Text>
    </TouchableOpacity>
    <View style={styles.myStyle}>
    <Text style={[styles.border1,{borderWidth:0}]}>{param.ob.price} QR</Text>  
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  myStyle:{
    width:myWidth/4,
    height:myHeight/4,
    justifyContent:'center',
    alignItems:'center',
  },
  border1:{
    borderColor:'black',
    borderRadius:7,
    borderWidth: 1,
    fontSize: myFontSize
  },
});