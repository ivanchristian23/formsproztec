import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground, TouchableOpacity,KeyboardAvoidingView,Platform, ScrollView } from 'react-native';
import {doc, setDoc} from "firebase/firestore";
import { db } from './config'
import {getDocs,addDoc, collection} from "firebase/firestore";
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import Vi from 'date-and-time/locale/vi';

const Forms = () => {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('');
  const [show, setShow] = useState(true)


  const toggleDatepicker = () => {
    setShowPicker(!showPicker);
}

const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === 'ios');
    setDate(currentDate);
};
const goBack = ()=>{
    setShow(true)
}

  const readAll = async () => {
    const docs = await getDocs(collection(db, "users"));
    docs.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
    });
    }
    
  const add = async () => {
    const docRef = await addDoc(collection(db, "users"), {
    date: date,
    firstName: firstName,
    lastName:lastName,
    email:email,
    phone:phone,
    gender:gender,
    });
    console.log("Document written with ID: ", docRef.id);

    }

  const handleSubmit = () => {
    // Handle form submission here
    add()
    setEmail("")
    setFirstName("")
    setLastName("")
    setPhone("")
    setShow(false)
    // console.log('Organization Name:', organization);
  };

  return (
    show?
     <KeyboardAvoidingView style={styles.container} behavior={Platform.OS == "ios" ? "padding" : "height"} keyboardVerticalOffset={100}>
    <View >
     <Text style={styles.header}>Welcome to Fanar</Text>
    <ImageBackground source={require('../assets/fanar.jpg')} style={styles.background}>
      <View>
        <Text style={styles.label}>Date:</Text>
        <TouchableOpacity onPress={toggleDatepicker}>
                    <TextInput
                        placeholder='Date'
                        value={date.toDateString()} // Format the date to display properly
                        editable={false}
                        style={styles.input}
                    />
                </TouchableOpacity>
                {showPicker &&
                    <DateTimePicker
                        mode='date'
                        display='calendar'
                        value={date}
                        onChange={handleDateChange}
                    />
                }  
        <Text style={styles.label}>First Name:</Text>
        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
          placeholder="Enter First Name"
        />
        <Text style={styles.label}>Last Name:</Text>
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
          placeholder="Enter Last Name"
        />
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          value={email}
          autoCapitalize={false}
          onChangeText={setEmail}
          placeholder="Enter Email"
          keyboardType="email-address"
        />
        <Text style={styles.label}>Phone:</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder="Enter Phone"
          keyboardType="phone-pad"
        />
        {/* <Picker
                    selectedValue={gender}
                    style={styles.input}
                    onValueChange={(itemValue, itemIndex) =>
                        setGender(itemValue)
                    }>
                    <Picker.Item label="Select Gender" value="" />
                    <Picker.Item label="Male" value="male" />
                    <Picker.Item label="Female" value="female" />
                </Picker> */}
    <View style={styles.buttonContainer}>
          <Button title="Submit" onPress={handleSubmit} style={styles.button} />
        </View>
      </View>
    </ImageBackground>
    </View>
    </KeyboardAvoidingView>:
    <View>
        <Text style={styles.thankYou}>Thank you for your response</Text>
        <Button title='Go back' onPress={goBack}> </Button>
    </View>

    
  );
};

const styles = StyleSheet.create({
    thankYou: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 20,
        color: 'black',
      },
    buttonContainer: {
        marginTop: 20,
        // backgroundColor: 'orange',
        borderRadius: 5,
        paddingVertical: 10,
      },
      button: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
  background: {
    resizeMode: 'cover',
    justifyContent: 'center',
    height:'100%',
    width:'100%'
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: 'black',
  },
  container: {
    width:'100%',
    height:'100%',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white', // Add a color for text
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: 'white', // Add a background color for text input
  },
});

export default Forms;
