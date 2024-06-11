import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  ImageBackground,
  Image,
  Dimensions,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { Foundation } from "react-native-vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const Home = ({ navigation, route }) => {
  const [language, setLanguage] = useState("english");
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const loadSubmissions = async () => {
      try {
        const savedSubmissions = await AsyncStorage.getItem("submissions");
        if (savedSubmissions) {
          setSubmissions(JSON.parse(savedSubmissions));
        }
      } catch (error) {
        console.error("Failed to load submissions", error);
      }
    };

    loadSubmissions();
  }, []);

  useEffect(() => {
    if (route.params?.newSubmission) {
      console.log("New submission received:", route.params.newSubmission);
      setSubmissions((prevSubmissions) => {
        const updatedSubmissions = [...prevSubmissions, route.params.newSubmission];
        saveSubmissions(updatedSubmissions);
        console.log(updatedSubmissions);
        return updatedSubmissions;
      });

      // Cleanup to prevent re-processing the same submission
      navigation.setParams({ newSubmission: null });
    }
  }, [route.params?.newSubmission]);

  const saveSubmissions = async (submissions) => {
    try {
      await AsyncStorage.setItem("submissions", JSON.stringify(submissions));
    } catch (error) {
      console.error("Failed to save submissions", error);
    }
  };

  const handleNext = () => {
    navigation.navigate("Forms", {
      language: language,
      addSubmission: (newSubmission) => {
        setSubmissions((prevSubmissions) => {
          const updatedSubmissions = [...prevSubmissions, newSubmission];
          saveSubmissions(updatedSubmissions);
          return updatedSubmissions;
        });
      },
    });
  };

  const handleExport = () => {
    navigation.navigate("Admin", { submissions: submissions });
  };

  return (
    <ImageBackground
      blurRadius={2}
      source={require("../assets/fanar6.2.jpg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.topLeftLogoContainer}>
          <Image
            source={require("../assets/fanar1.png")}
            style={styles.topLeftLogo}
          />
        </View>

        <Text style={styles.welcomeText}>Welcome!</Text>
        <Text style={styles.instructions}>
          Please select your preferred language:
        </Text>
        <RNPickerSelect
          onValueChange={(value) => setLanguage(value)}
          items={[
            { label: "العربية", value: "arabic" },
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
            source={require("../assets/ministry.png")}
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
  topLeftLogoContainer: {
    position: "absolute",
    top: 10,
    left: 10,
  },
  topLeftLogo: {
    width: 230,
    height: 200,
    resizeMode: "contain",
  },
  exportButtonContainer: {
    position: "absolute",
    right: 30,
    bottom: 20,
  },
  welcomeText: {
    fontSize: 45,
    fontWeight: "bold",
    marginBottom: 20,
    color: "black",
    textAlign: "center",
  },
  instructions: {
    fontSize: 21,
    marginBottom: 10,
    textAlign: "center",
    color: "black",
    fontWeight: "500",
  },
  buttonContainer: {
    marginTop: 20,
    width: screenWidth * 0.5,
  },
  background: {
    resizeMode: "cover",
    height: "100%",
    width: "103%",
    flex: 1,
    transform: [{ rotate: '0deg' }], // Rotate the background image
  },
  logoContainer: {
    position: "absolute",
    right: -1,
    top: -10,
  },
  logo1: {
    width: screenWidth * 0.4,
    height: screenWidth * 0.4,
    resizeMode: "contain",
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
    width: screenWidth * 0.5,
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
    width: screenWidth * 0.5,
    alignSelf: "center",
    // backgroundColor: "rgba(0,0,0,0.5)",
    backgroundColor: "white",
  },
  placeholder: {
    color: "black",
    fontSize: 16,
  },
});
