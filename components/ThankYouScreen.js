import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import the Ionicons icon set

const ThankYouScreen = ({ navigation }) => {
  const goToHome = () => {
    navigation.navigate('Home'); // Assuming 'Home' is the name of your home screen
  };

  return (
    <View style={styles.container}>
       <ImageBackground
          source={require("../assets/up.jpg")}
          style={styles.background}
          imageStyle={{
            resizeMode: "cover",
          }}
        >  
      <View style={styles.textContainer}>
        <Text style={styles.header}>Thank you for registering with Fanar!</Text>
        <Text style={styles.subHeader}>We wish you a pleasant tour.</Text>
      </View>
      <TouchableOpacity onPress={goToHome} style={styles.iconContainer}>
        <Icon name="home" size={60} color="white" />
      </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
    },
    background: {
        // alignSelf:'stretch',
        height: "100%",
        width: "100%",
        backgroundColor: "black",
    },
    textContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginBottom:200 // Adjust the marginTop to position the text in the middle top
    },
    header: {
        fontSize: 20, // Adjust the font size as needed
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    subHeader: {
        fontSize: 40, // Adjust the font size as needed
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
    },
    iconContainer: {
        position: "absolute",
        bottom: 550, // Adjust the top position to position the icon where you want
        right:350 // Adjust the left position to position the icon where you want
    }
});

export default ThankYouScreen;
