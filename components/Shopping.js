import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Item from './Item'
const db = [
  {itemId:0,itemName:'Yo', pic:require('../assets/asd.png'),qty:0,price:100},
  {itemId:1,itemName:'Yo', pic:require('../assets/jack.jpeg'),qty:0,price:100},
  {itemId:2,itemName:'Yo', pic:require('../assets/splash.png'),qty:0,price:100}]
const Shopping = () => {
  const [items,setItems] = useState(db)
  return (
    <View>
      <Item ob={items[0]}></Item>
      <Item ob={items[1]}></Item>
      <Item ob={items[2]}></Item>
      <Text> Total: {items[0].qty+items[1].qty+items[2].qty}</Text>
    </View>
  )
}

export default Shopping

const styles = StyleSheet.create({})