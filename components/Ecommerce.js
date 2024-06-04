import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, TouchableOpacity, Image} from 'react-native';
import { Dimensions } from 'react-native';
const myWidth = Dimensions.get('window').width;
const myHeight = Dimensions.get('window').height;


export default function Ecommerce() {
        const [count1,setCount]  = useState(1)
        const inc1 = ()=> {
            setCount(prevCount =>prevCount +1);
        }
        const dec1 = ()=> {
            setCount(prevCount =>prevCount -1);
        }

    return(
        <SafeAreaView style={styles.container}> 
        <Text style= {[styles.txt,{fontSize: myWidth*0.05, color:'red', alignSelf:'center'}]}>My Cart</Text>
        <View style={{flexDirection: 'row',justifyContent:'space-around',backgroundColor:'yellow'}}>
            <Image
            style={{height: 100, width: 100}} 
            source={require("../assets/apple.jpg")}/>
            <TouchableOpacity onPress={inc1} style={{alignSelf:'center'}}> 
            <Text>+</Text>
            </TouchableOpacity>
        <View style={{alignSelf:'center'}}>
            <Text>{count1}</Text>
        </View>
        <TouchableOpacity onPress={dec1} style={{alignSelf:'center'}}>
            <Text>-</Text>
        </TouchableOpacity> 
        </View>
        <View style={{flexDirection: 'row',justifyContent:'space-around',backgroundColor:'yellow'}}>
            <Image
            style={{height: 100, width: 120}} 
            source={require("../assets/banana.jpg")}/>
            <TouchableOpacity style={{alignSelf:'center'}}> 
            <Text>+</Text>
            </TouchableOpacity>
        <View style={{alignSelf:'center'}}>
            <Text>0</Text>
        </View>
        <TouchableOpacity style={{alignSelf:'center'}}>
            <Text>-</Text>
        </TouchableOpacity> 
        </View>
        <View style={{flexDirection: 'row',justifyContent:'space-around',backgroundColor:'yellow'}}>
            <Image
            style={{height: 100, width: 100}} 
            source={require("../assets/cocnut.jpg")}/>
            <TouchableOpacity style={{alignSelf:'center'}}> 
            <Text>+</Text>
            </TouchableOpacity>
        <View style={{alignSelf:'center'}}>
            <Text>0</Text>
        </View>
        <TouchableOpacity style={{alignSelf:'center'}}>
            <Text>-</Text>
        </TouchableOpacity> 
        </View>
        <View>
            <Text>Total Price:</Text>
        </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex:1,
      backgroundColor:'fff',
      justifyContent:'space-around'
    },
});