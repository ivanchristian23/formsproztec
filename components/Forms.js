import React, { useState } from 'react';
import { View, Text, Image, TextInput, Button, StyleSheet, ImageBackground, TouchableOpacity,KeyboardAvoidingView,Platform, ScrollView } from 'react-native';
import {doc, setDoc} from "firebase/firestore";
import { db } from './config'
import {getDocs,addDoc, collection} from "firebase/firestore";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Dimensions } from 'react-native';
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const Forms = ({route,navigation}) => {
  const { language } = route.params
  // useEffect(() => {
  //   console.log(language);
  //   i18next.changeLanguage(language);
  // }, [language]);
  const [date, setDate] = useState(new Date());
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [show, setShow] = useState(true);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === "ios");
    setDate(currentDate);
  };
  const goBack = () => {
    setShow(true);
  };

  const handleSubmit = async  () => {
    const csvData = [
      ["Date", "First Name", "Last Name", "Email", "Phone"],
      [date.toDateString(), firstName, lastName, email, phone]
    ];

    const csvString = csvData.map(row => row.join(",")).join("\n");

    const filePath = `${RNFS.DocumentDirectoryPath}/formData.csv`;

    try {
      const fileExists = await RNFS.exists(filePath);
      if (fileExists) {
        await RNFS.appendFile(filePath, `\n${csvString.split("\n")[1]}`, 'utf8');
      } else {
        await RNFS.writeFile(filePath, csvString, 'utf8');
      }
      console.log('CSV file created/updated at:', filePath);
    } catch (error) {
      console.error('Error writing CSV file:', error);
    }
    
    setEmail("");
    setFirstName("");
    setLastName("");
    setPhone("");
    setShow(false);
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
    backgroundColor: "white", // Add a background color for text input
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
    backgroundColor: '#007AFF',
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
    color: "white", // Add a color for text
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
