import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Dimensions,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
  ScrollView
} from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import Success from './Success'; // Import Success component

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
  const [nationality, setNationality] = useState(""); // New state for nationality
  const [show, setShow] = useState(true);
  const [placeholderColor, setPlaceholderColor] = useState("#888"); // Grey color for placeholder
  const [isModalVisible, setModalVisible] = useState(false); // State variable for success modal
  const [show1, setShow1] = useState(false);
  const [countryCode, setCountryCode] = useState('');

  const [open, setOpen] = useState(false); // State for dropdown
  const [items, setItems] = useState(
    [
      {label: "Afghan", value: "afghan"},
      {label: "Albanian", value: "albanian"},
      {label: "Algerian", value: "algerian"},
      {label: "American", value: "american"},
      // Add all other nationalities here...
    ]
  );

  const requestPermissions = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission to access storage was denied');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    const csvData = [
      ["Date", "First Name", "Last Name", "Email", "Phone","Gender","Nationality"],
      [date.toDateString(), firstName, lastName, email, phone,gender,nationality]
    ];
  
    const csvString = csvData.map(row => row.join(",")).join("\n");
  
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;
  
    const filePath = `${FileSystem.documentDirectory}formData.csv`;
  
    try {
      // Check if the file already exists
      const fileExists = await FileSystem.getInfoAsync(filePath);
      let existingData = "";
  
      if (fileExists.exists) {
        // Read the existing data
        existingData = await FileSystem.readAsStringAsync(filePath, { encoding: FileSystem.EncodingType.UTF8 });
        // Remove the header from the new data to avoid duplicating the header row
        const newData = csvString.split("\n")[1];
        // Append the new data to the existing data
        const updatedData = `${existingData}\n${newData}`;
        await FileSystem.writeAsStringAsync(filePath, updatedData, { encoding: FileSystem.EncodingType.UTF8 });
      } else {
        // Write the new data with header if the file does not exist
        await FileSystem.writeAsStringAsync(filePath, csvString, { encoding: FileSystem.EncodingType.UTF8 });
      }
      console.log('CSV file created/updated at:', filePath);
  
      // Check if the file is written successfully
      const fileWritten = await FileSystem.getInfoAsync(filePath);
      if (!fileWritten.exists) {
        throw new Error('File not written successfully');
      }
  
      // Move the file to the Downloads folder
      const downloadsDir = FileSystem.documentDirectory + 'Download/';
      await FileSystem.makeDirectoryAsync(downloadsDir, { intermediates: true });
      const newFilePath = downloadsDir + 'formData.csv';
      await FileSystem.moveAsync({
        from: filePath,
        to: newFilePath,
      });
  
      console.log('CSV file moved to Downloads folder:', newFilePath);
  
      // Share the file after it is written
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(newFilePath);
      } else {
        Alert.alert("Sharing is not available on this device");
      }
    } catch (error) {
      console.error('Error writing CSV file:', error);
      Alert.alert('Error writing CSV file:', error.message);
    }
  
    setEmail("");
    setFirstName("");
    setLastName("");
    setPhone("");
    setGender("")
    setNationality("")
    setShow(false);
    setModalVisible(true); // Show success modal
  };
  
  const handleGenderChange = (itemValue) => {
    setGender(itemValue);
    if (itemValue === "") {
      setPlaceholderColor("#888"); // Grey color for placeholder
    } else {
      setPlaceholderColor("black"); // Default color for selected text
    }
  };

  const labels = {
    english: {
      welcome: "Welcome to Fanar",
      date: "Date:",
      firstName: "First Name:",
      lastName: "Last Name:",
      email: "Email:",
      phone: "Phone:",
      submit: "Submit",
      thankYou: "Thank you for your response",
      goBack: "Go back"
    },
    // Add other languages here...
  };

  const currentLabels = labels[language] || labels.english;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
    >
      <View>
        <ImageBackground
          source={require("../assets/fanar.jpg")}
          style={styles.background}
        >
          <View style={styles.date}><Text style={styles.dates}>{currentLabels.date} {date.toDateString()}</Text></View>
          <View style={styles.head}><Text style={styles.heading}>Welcome to Fanar</Text></View>
          <View style={styles.textboxes}>
          
            <Text style={styles.label}>{currentLabels.firstName}</Text>
            <TextInput
              style={styles.input}
              value={firstName}
              onChangeText={setFirstName}
              placeholder={currentLabels.firstName}
            />
            <Text style={styles.label}>{currentLabels.lastName}</Text>
            <TextInput
              style={styles.input}
              value={lastName}
              onChangeText={setLastName}
              placeholder={currentLabels.lastName}
            />
            <Text style={styles.label}>{currentLabels.email}</Text>
            <TextInput
              style={styles.input}
              value={email}
              autoCapitalize="none"
              onChangeText={setEmail}
              placeholder={currentLabels.email}
              keyboardType="email-address"
            />
            <Text style={styles.label}>{currentLabels.phone}</Text>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder={currentLabels.phone}
              keyboardType="phone-pad"
            />
            <Text style={styles.label}>Gender:</Text>
            <View style={styles.gender}>
              <Picker
                selectedValue={gender}
                onValueChange={handleGenderChange}
                style={{ color: placeholderColor }}
              >
                <Picker.Item label="Select Gender" value="" />
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
                <Picker.Item label="Others" value="others" />
              </Picker>
            </View>
            <Text style={styles.label}>Nationality</Text>
            <DropDownPicker
              open={open}
              value={nationality}
              items={items}
              setOpen={setOpen}
              setValue={setNationality}
              setItems={setItems}
              searchable={true}
              placeholder="Select Nationality"
              containerStyle={{ height: 40, marginBottom: 10 }}
              style={{ backgroundColor: '#fafafa' }}
              dropDownStyle={{ backgroundColor: '#fafafa' }}
            />
            <View style={styles.buttonContainer}>
              <Button title={currentLabels.submit} onPress={handleSubmit} style={styles.button} />
            </View>
          </View>
          <View style={styles.logoContainer}>
              <Image source={require('../assets/loogo.png')} style={styles.logo} />
              
          </View>
        </ImageBackground>
      </View>
      <Success visible={isModalVisible} onClose={() => setModalVisible(false)} />
    </KeyboardAvoidingView>
  )
};

const styles = StyleSheet.create({
  head: {
    alignItems: 'center'
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white'
  },
  date: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 20,
    marginTop: 20
  },
  dates: {
    fontSize: 16,
    color: 'white'
  },
  container: {
    flex: 1,
  },
  background: {
    width: screenWidth,
    height: screenHeight,
  },
  textboxes: {
    marginTop: 40,
    paddingHorizontal: 20,
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginBottom: 10,
  },
  label: {
    color: 'white',
    marginBottom: 5,
  },
  gender: {
    backgroundColor: 'white',
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    color: '#000', // Change text color here
    fontSize: 16, // Change font size here
    paddingVertical: 10, // Add vertical padding for height
    paddingHorizontal: 20, // Add horizontal padding for width
    backgroundColor: '#d3d3d3', // Background color of the button
    borderRadius: 5, // Rounded corners
    alignItems: 'center', // Center the text
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  logo: {
    width: 100,
    height: 50,
  },
});

export default Forms;