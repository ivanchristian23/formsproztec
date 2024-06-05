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
  Image
} from "react-native";
import { getDocs, addDoc, collection } from "firebase/firestore";
import { db } from "./config";
import { Picker } from "@react-native-picker/picker";

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
      nationality: nationality, // Add nationality to the document
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
    setNationality(""); // Reset nationality to default
    setShow(false);
  };

  const handleGenderChange = (itemValue) => {
    setGender(itemValue);
    if (itemValue === "") {
      setPlaceholderColor("#888"); // Grey color for placeholder
    } else {
      setPlaceholderColor("black"); // Default color for selected text
    }
  };

  const handleNationalityChange = (itemValue) => {
    setNationality(itemValue);
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
      goBack: "Go back",
      gender: "Gender:",
      nationality: "Nationality:"
    },
    // Add other languages here...
  };

  const currentLabels = labels[language] || labels.english;

  // List of nationalities
  const nationalities = [
    "Select Nationality",
    "Afghan", "Albanian", "Algerian", "American", "Andorran", "Angolan", "Anguillan",
    "Citizen of Antigua and Barbuda", "Argentine", "Armenian", "Australian", "Austrian",
    "Azerbaijani", "Bahamian", "Bahraini", "Bangladeshi", "Barbadian", "Belarusian", "Belgian",
    "Belizean", "Beninese", "Bermudian", "Bhutanese", "Bolivian", "Citizen of Bosnia and Herzegovina",
    "Botswanan", "Brazilian", "British", "British Virgin Islander", "Bruneian", "Bulgarian",
    "Burkinan", "Burmese", "Burundian", "Cambodian", "Cameroonian", "Canadian", "Cape Verdean",
    "Cayman Islander", "Central African", "Chadian", "Chilean", "Chinese", "Colombian", "Comoran",
    "Congolese (Congo)", "Congolese (DRC)", "Cook Islander", "Costa Rican", "Croatian", "Cuban",
    "Cymraes", "Cymro", "Cypriot", "Czech", "Danish", "Djiboutian", "Dominican",
    "Citizen of the Dominican Republic", "Dutch", "East Timorese", "Ecuadorean", "Egyptian", "Emirati",
    "English", "Equatorial Guinean", "Eritrean", "Estonian", "Ethiopian", "Faroese", "Fijian",
    "Filipino", "Finnish", "French", "Gabonese", "Gambian", "Georgian", "German", "Ghanaian",
    "Gibraltarian", "Greek", "Greenlandic", "Grenadian", "Guamanian", "Guatemalan",
    "Citizen of Guinea-Bissau", "Guinean", "Guyanese", "Haitian", "Honduran", "Hong Konger",
    "Hungarian", "Icelandic", "Indian", "Indonesian", "Iranian", "Iraqi", "Irish", "Israeli",
    "Italian", "Ivorian", "Jamaican", "Japanese", "Jordanian", "Kazakh", "Kenyan", "Kittitian",
    "Citizen of Kiribati", "Kosovan", "Kuwaiti", "Kyrgyz", "Lao", "Latvian", "Lebanese", "Liberian",
    "Libyan", "Liechtenstein citizen", "Lithuanian", "Luxembourger", "Macanese", "Macedonian",
    "Malagasy", "Malawian", "Malaysian", "Maldivian", "Malian", "Maltese", "Marshallese",
    "Martiniquais", "Mauritanian", "Mauritian", "Mexican", "Micronesian", "Moldovan", "Monegasque",
    "Mongolian", "Montenegrin", "Montserratian", "Moroccan", "Mosotho", "Mozambican", "Namibian",
    "Nauruan", "Nepalese", "New Zealander", "Nicaraguan", "Nigerian", "Nigerien", "Niuean",
    "North Korean", "Northern Irish", "Norwegian", "Omani", "Pakistani", "Palauan", "Palestinian",
    "Panamanian", "Papua New Guinean", "Paraguayan", "Peruvian", "Pitcairn Islander", "Polish",
    "Portuguese", "Prydeinig", "Puerto Rican", "Qatari", "Romanian", "Russian", "Rwandan",
    "Salvadorean", "Sammarinese", "Samoan", "Sao Tomean", "Saudi Arabian", "Scottish", "Senegalese",
    "Serbian", "Citizen of Seychelles", "Sierra Leonean", "Singaporean", "Slovak", "Slovenian",
    "Solomon Islander", "Somali", "South African", "South Korean", "South Sudanese", "Spanish",
    "Sri Lankan", "St Helenian", "St Lucian", "Stateless", "Sudanese", "Surinamese", "Swazi",
    "Swedish", "Swiss", "Syrian", "Taiwanese", "Tajik", "Tanzanian", "Thai", "Togolese", "Tongan",
    "Trinidadian", "Tristanian", "Tunisian", "Turkish", "Turkmen", "Turks and Caicos Islander",
    "Tuvaluan", "Ugandan", "Ukrainian", "Uruguayan", "Uzbek", "Vatican citizen", "Citizen of Vanuatu",
    "Venezuelan", "Vietnamese", "Vincentian", "Wallisian", "Welsh", "Yemeni", "Zambian", "Zimbabwean"
  ];

  return show ? (
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
          <View style={styles.textboxes}>
            <Text style={styles.label}>{currentLabels.date}</Text>
            <TextInput
              placeholder={currentLabels.date}
              value={date.toDateString()} // Format the date to display properly
              editable={false}
              style={styles.date}
            />
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
            <Text style={styles.label}>{currentLabels.gender}</Text>
            <View style={styles.gender}>
              <Picker
                selectedValue={gender}
                onValueChange={handleGenderChange}
                style={{ color: placeholderColor }}
              >
                <Picker.Item label="Select Gender" value="" />
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
              </Picker>
            </View>
            <Text style={styles.label}>{currentLabels.nationality}</Text>
            <View style={styles.gender}>
              <Picker
                selectedValue={nationality}
                onValueChange={handleNationalityChange}
                style={{ color: placeholderColor }}
              >
                {nationalities.map((nation, index) => (
                  <Picker.Item key={index} label={nation} value={nation.toLowerCase()} />
                ))}
              </Picker>
            </View>
            <View style={styles.buttonContainer}>
              <Button title={currentLabels.submit} onPress={handleSubmit} style={styles.button} />
            </View>
          </View>
          <View style={styles.logoContainer}>
            <Image source={require('../assets/logo.jpg')} style={styles.logo} />
            <Image source={require('../assets/fanar logo_0.png')} style={styles.logo} />
          </View>
        </ImageBackground>
      </View>
    </KeyboardAvoidingView>
  ) : (
    <View>
      <Text style={styles.thankYou}>{currentLabels.thankYou}</Text>
      <Button title={currentLabels.goBack} onPress={goBack} />
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
    paddingLeft: screenWidth * 0.036,
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
    backgroundColor: "white",
    paddingLeft: screenWidth * 0.036,
    fontSize: 16,
    color: '#888',
  },
  gender: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "white",
    height: screenHeight * 0.043,
    justifyContent: "center",
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});

export default Forms;
