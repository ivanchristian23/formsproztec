import React, { useState } from 'react';
import { View, Text, Image, TextInput, Button, StyleSheet, ImageBackground, TouchableOpacity,KeyboardAvoidingView,Platform, ScrollView } from 'react-native';
import {doc, setDoc} from "firebase/firestore";
import { db } from './config'
import {getDocs,addDoc, collection} from "firebase/firestore";
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import Vi from 'date-and-time/locale/vi';

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const Forms = ({ route, navigation }) => {
  const { language } = route.params;
  const [date, setDate] = useState(new Date());
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [show, setShow] = useState(true);
  const [placeholderColor, setPlaceholderColor] = useState("#888"); // Grey color for placeholder

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  const goBack = () => {
    setShow(true);
  };

  const readAll = async () => {
    const docs = await getDocs(collection(db, "users"));
    docs.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  };

  const add = async () => {
    const docRef = await addDoc(collection(db, "users"), {
      date: date,
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      gender: gender,
    });
    console.log("Document written with ID: ", docRef.id);
  };

  const handleSubmit = () => {
    add();
    setEmail("");
    setFirstName("");
    setLastName("");
    setPhone("");
    setGender(""); // Reset gender to default
    setShow(false);
    // console.log('Organization Name:', organization);
  };

  return show ? (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
    >
      <View>
        <ImageBackground
          source={require("../assets/fanar4.jpg")}
          style={styles.background}
        >
          <View style={styles.textboxes}>
            <Text style={styles.label}>Date:</Text>
            <TextInput
              placeholder="Date"
              value={date.toDateString()} // Format the date to display properly
              editable={false}
              style={styles.date}
            />
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
              <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    </KeyboardAvoidingView>
  ) : (
    <View>
      <Text style={styles.thankYou}>Thank you for your response</Text>
      <Button title="Go back" onPress={goBack}>
        {" "}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  date: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: "black",
    backgroundColor: "white",
    paddingLeft: screenWidth*0.036,
    fontSize: 16,
  },
  thankYou: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 20,
    color: "black",
  },
  buttonContainer: {
    marginTop: 20,
    borderRadius: 5,
    paddingVertical: 10,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  background: {
    resizeMode: "cover",
    height: "100%",
    width: "100%",
  },
  textboxes: {
    paddingLeft: screenWidth * 0.03,
    paddingTop: screenHeight * 0.15,
    width: screenWidth * 0.55,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "black",
  },
  container: {
    width: "100%",
    height: "100%",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "white",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "white", // Add a background color for text input
  },
});

export default Forms;
