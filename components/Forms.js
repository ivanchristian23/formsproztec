import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground, TouchableOpacity,KeyboardAvoidingView,Platform, ScrollView } from 'react-native';
// import {doc, setDoc} from "firebase/firestore";
// import { db } from './config'
// import {getDocs,addDoc, collection} from "firebase/firestore";
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTranslation } from 'react-i18next';
import i18next, {languageResources} from '../sevices/i18next';
const Forms = ({route,navigation}) => {
  const { language } = route.params
  useEffect(() => {
    console.log(language);
    i18next.changeLanguage(language);
  }, [language]);
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
  const {t} = useTranslation();
  return (
    show?
     <KeyboardAvoidingView style={styles.container} behavior={Platform.OS == "ios" ? "padding" : "height"} keyboardVerticalOffset={100}>
    <View >
     <Text style={styles.header}>{t("welcome")}</Text>

    <ImageBackground source={require('../assets/fanar4.jpg')} style={styles.background}>
      <View>
        <Text style={styles.label}>{t("date")}</Text>
        <TouchableOpacity onPress={toggleDatepicker}>
                    <TextInput
                        value={date.toDateString()} // Format the date to display properly
                        editable={false}
                        style={styles.input}
                    />
                </TouchableOpacity>

        <Text style={styles.label}>{t("firstName")}</Text>
        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
          placeholder={t("firstName")}
        />
        <Text style={styles.label}>{t("lastName")}</Text>
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
          placeholder={t("lastName")}
        />
        <Text style={styles.label}>{t("email")}</Text>
        <TextInput
          style={styles.input}
          value={email}
          autoCapitalize={false}
          onChangeText={setEmail}
          placeholder={t("email")}
          keyboardType="email-address"
        />
        <Text style={styles.label}>{t("phone")}</Text>
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder={t("phone")}
          keyboardType="phone-pad"
        />
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
