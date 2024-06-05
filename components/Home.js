import { StyleSheet, Text, View, Button, ImageBackground } from "react-native";
import React, { useState } from "react";
import RNPickerSelect from "react-native-picker-select";

const Home = ({ navigation }) => {
  const [language, setLanguage] = useState(null);

  const handleSubmit = () => {
    if (language) {
      navigation.navigate('Forms', { language: language });
    } else {
      alert("Please select a language");
    }
  };

  return (
    <ImageBackground source={require('../assets/fanar4.jpg')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome to Our App!</Text>
        <Text style={styles.instructions}>Please select your preferred language:</Text>
        <RNPickerSelect
          onValueChange={(value) => setLanguage(value)}
          items={[
            { label: 'English', value: 'english' },
            { label: 'Spanish', value: 'spanish' },
            { label: 'French', value: 'french' },
            { label: 'German', value: 'german' },
            { label: 'Chinese', value: 'chinese' },
            { label: 'Portuguese', value: 'portuguese' },
            { label: 'Russian', value: 'russian' },
            { label: 'Japanese', value: 'japanese' },
            { label: 'Italian', value: 'italian' },
          ]}
          style={pickerSelectStyles}
          placeholder={{ label: 'Select a language...', value: null }}
        />
        <View style={styles.buttonContainer}>
          <Button title="Submit" onPress={handleSubmit} color="#1E90FF" />
        </View>
      </View>
    </ImageBackground>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
    textAlign: 'center'
  },
  instructions: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
    color: 'white',
  },
  buttonContainer: {
    marginTop: 20,
    width: '60%',
  },
  background: {
    resizeMode: 'cover',
    height: '100%',
    width: '100%',
    flex: 1,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'white',
    paddingRight: 30,
    width: '80%',
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'white',
    paddingRight: 30,
    width: '80%',
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});