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
import { Picker } from "@react-native-picker/picker";
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';

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
      ["Date", "First Name", "Last Name", "Email", "Phone"],
      [date.toDateString(), firstName, lastName, email, phone]
    ];

    const csvString = csvData.map(row => row.join(",")).join("\n");

    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    const filePath = `${FileSystem.documentDirectory}formData.csv`;

    try {
      // Write to the file
      const fileExists = await FileSystem.getInfoAsync(filePath);
      if (fileExists.exists) {
        await FileSystem.writeAsStringAsync(filePath, `\n${csvString.split("\n")[1]}`, { encoding: FileSystem.EncodingType.UTF8, append: true });
      } else {
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
    spanish: {
      welcome: "Bienvenido a Fanar",
      date: "Fecha:",
      firstName: "Nombre:",
      lastName: "Apellido:",
      email: "Correo Electrónico:",
      phone: "Teléfono:",
      submit: "Enviar",
      thankYou: "Gracias por su respuesta",
      goBack: "Regresar"
    },
    french: {
      welcome: "Bienvenue à Fanar",
      date: "Date:",
      firstName: "Prénom:",
      lastName: "Nom de famille:",
      email: "Email:",
      phone: "Téléphone:",
      submit: "Soumettre",
      thankYou: "Merci pour votre réponse",
      goBack: "Retourner"
    },
    german: {
      welcome: "Willkommen bei Fanar",
      date: "Datum:",
      firstName: "Vorname:",
      lastName: "Nachname:",
      email: "Email:",
      phone: "Telefon:",
      submit: "Einreichen",
      thankYou: "Vielen Dank für Ihre Antwort",
      goBack: "Zurück"
    },
    chinese: {
      welcome: "欢迎来到Fanar",
      date: "日期:",
      firstName: "名字:",
      lastName: "姓氏:",
      email: "电子邮件:",
      phone: "电话:",
      submit: "提交",
      thankYou: "感谢您的回复",
      goBack: "返回"
    },
    portuguese: {
      welcome: "Bem-vindo ao Fanar",
      date: "Data:",
      firstName: "Nome:",
      lastName: "Sobrenome:",
      email: "Email:",
      phone: "Telefone:",
      submit: "Enviar",
      thankYou: "Obrigado pela sua resposta",
      goBack: "Voltar"
    },
    russian: {
      welcome: "Добро пожаловать в Fanar",
      date: "Дата:",
      firstName: "Имя:",
      lastName: "Фамилия:",
      email: "Эл. почта:",
      phone: "Телефон:",
      submit: "Отправить",
      thankYou: "Спасибо за ваш ответ",
      goBack: "Вернуться"
    },
    japanese: {
      welcome: "ファナールへようこそ",
      date: "日付:",
      firstName: "名:",
      lastName: "姓:",
      email: "メール:",
      phone: "電話:",
      submit: "送信",
      thankYou: "ご回答いただきありがとうございます",
      goBack: "戻る"
    },
    italian: {
      welcome: "Benvenuto a Fanar",
      date: "Data:",
      firstName: "Nome:",
      lastName: "Cognome:",
      email: "Email:",
      phone: "Telefono:",
      submit: "Invia",
      thankYou: "Grazie per la tua risposta",
      goBack: "Torna indietro"
    }
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
  )
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
    backgroundColor: "white",
    paddingLeft: screenWidth*0.036,
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
