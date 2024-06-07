import { StyleSheet, Text, View, Button, ImageBackground, Image, Dimensions } from "react-native";
import React, { useState,useEffect } from "react";
import RNPickerSelect from "react-native-picker-select";
import { Foundation } from "react-native-vector-icons";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const Home = ({ navigation, route }) => {
  const [language, setLanguage] = useState("english");
  const [submissions, setSubmissions] = useState([]);
  useEffect(() => {
    if (route.params?.newSubmission) {
        // console.log(route.params.newSubmission);
        let temp = [...submissions];
        temp.push(route.params.newSubmission);
        console.log(temp);
        setSubmissions(temp);
    }
  }, [route.params?.newSubmission]);
  const handleNext = () => {
    navigation.navigate("Forms", { 
      language: language, 
      addSubmission: (newSubmission) => {
        setSubmissions((prevSubmissions) => [...prevSubmissions, newSubmission]);
      }
    });
  };
  const handleExport = () => {
    navigation.navigate("Admin",{submissions:submissions});
  };

  return (
    <ImageBackground
      source={require("../assets/fanar.jpg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome!</Text>
        <Text style={styles.instructions}>
          Please select your preferred language:
        </Text>
        <RNPickerSelect
          onValueChange={(value) => setLanguage(value)}
          items={[
            { label: "Spanish", value: "spanish" },
            { label: "French", value: "french" },
            { label: "German", value: "german" },
            { label: "Chinese", value: "chinese" },
            { label: "Portuguese", value: "portuguese" },
            { label: "Russian", value: "russian" },
            { label: "Japanese", value: "japanese" },
            { label: "Italian", value: "italian" },
          ]}
          style={pickerSelectStyles}
          placeholder={{ label: "English", value: "english" }}
        />
        <View style={styles.buttonContainer}>
          <Button title="Next" onPress={handleNext} color="" />
        </View>
        <View style={styles.logoContainer}>
            <Image
              source={require("../assets/loogo.png")}
              style={styles.logo}
            />
            <Image
              source={require("../assets/fanarlogo1.png")}
              style={styles.logo1}
            />
          </View>
        <View style={styles.exportButtonContainer}>
        <Foundation
            name="page-export-csv"
            size={50}
            onPress={handleExport}
            color="white"
          />
        </View>
        
      </View>
    </ImageBackground>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  exportButtonContainer: {
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
  welcomeText: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 20,
    color: '#FFFFE0',
    textAlign: 'center',
  },
  instructions: {
    fontSize: 17,
    marginBottom: 10,
    textAlign: "center",
    color: "#FFFFE0",
    fontWeight: '500'
  },
  buttonContainer: {
    marginTop: 20,
    width: screenWidth*0.5 ,
  },
  background: {
    resizeMode: "cover",
    height: "100%",
    width: "100%",
    flex: 1,
  },
  // logoContainer: {
  //   position: 'absolute',
  //   bottom: 20,
  //   left: 20,
  // },
  // logo: {
  //   width: 250,
  //   height: 250,
  //   resizeMode: 'contain',
  // },
  logoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    paddingHorizontal: 10,
  },
  logo: {
    width: 250,
    height: 250,
    resizeMode: "contain",
    marginTop: 20,
    paddingHorizontal: 10,
  },
  logo1: {
    width: screenWidth*0.5,
    height: screenHeight*0.2,
    resizeMode: "contain",
    marginTop: 20,
    paddingHorizontal: 10,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "white",
    paddingRight: 30,
    width: screenWidth*0.5,
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "gray",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
    width: screenWidth*0.5,
    alignSelf: "center",
    // backgroundColor: "rgba(0,0,0,0.5)",
    backgroundColor: 'white'
  },
  placeholder: {
    color: 'black', // Your custom color for the placeholder
    fontSize: 16,
  },
});
