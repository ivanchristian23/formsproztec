import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Dimensions,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  Image,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Dropdown } from "react-native-element-dropdown";
import Success from "./Success"; // Import Success component

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const Forms = ({ route }) => {
  const { language, addSubmission } = route.params;
  const [date, setDate] = useState(new Date());
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("+");
  const [gender, setGender] = useState("");
  const [nationality, setNationality] = useState(""); // New state for nationality
  const [placeholderColor, setPlaceholderColor] = useState("#888"); // Grey color for placeholder
  const [placeholderColor1, setPlaceholderColor1] = useState("#888"); // Grey color for placeholder
  const [isModalVisible, setModalVisible] = useState(false); // State variable for success modal
  const [firstNameBorderColor, setFirstNameBorderColor] = useState("#ccc"); // Border color for first name
  const [lastNameBorderColor, setLastNameBorderColor] = useState("#ccc"); // Border color for last name
  const [firstNameError, setFirstNameError] = useState(""); // Error message for first name
  const [lastNameError, setLastNameError] = useState(""); // Error message for last name

  const validateSpecialCharacters = (text) => {
    const re = /^[a-zA-Z]+$/;
    return re.test(text);
  };

  const handleSubmit = () => {
    // Check if any required field is empty or contains special characters
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !nationality.trim() ||
      !validateSpecialCharacters(firstName) ||
      !validateSpecialCharacters(lastName)
    ) {
      if (!validateSpecialCharacters(firstName)) {
        setFirstNameBorderColor("red");
        setFirstNameError("No special characters allowed");
      } else {
        setFirstNameBorderColor("#ccc");
        setFirstNameError("");
      }
      if (!validateSpecialCharacters(lastName)) {
        setLastNameBorderColor("red");
        setLastNameError("No special characters allowed");
      } else {
        setLastNameBorderColor("#ccc");
        setLastNameError("");
      }
      // Alert user that all fields are required and no special characters are allowed
      Alert.alert(
        "Invalid Input",
        "Please fill out all fields with valid data.",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }]
      );
    }  else {
      // Prepare the new submission object
      const newSubmission = {
        date: date.toDateString(),
        firstName,
        lastName,
        email,
        phone,
        gender,
        nationality,
      };

      // Reset fields
      setEmail("");
      setFirstName("");
      setLastName("");
      setPhone("");
      setGender("");
      setNationality("");
      setModalVisible(true); // Show success modal

      // Log the new submission to console
      console.log(newSubmission);

      // Call the callback function if it exists
      if (addSubmission) {
        addSubmission(newSubmission); // Call the callback function with newSubmission
      }

      // Optionally navigate back to home or another screen
      // navigation.navigate('Home', {newSubmission});
    }
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
      setPlaceholderColor1("#888"); // Grey color for placeholder
    } else {
      setPlaceholderColor1("black"); // Default color for selected text
    }
  };

  const labels = {
    english: {
      welcome: "Welcome to Fanar",
      date: "Date",
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email",
      phone: "Phone",
      submit: "Submit",
      thankYou: "Thank you for your response",
      goBack: "Go back",
      gender: "Gender",
      nationality: "Nationality",
      selectGender: "Select Gender",
      selectNationality: "Select Nationality"
    },
    spanish: {
      welcome: "Bienvenido a Fanar",
      date: "Fecha",
      firstName: "Nombre",
      lastName: "Apellido",
      email: "Correo Electrónico",
      phone: "Teléfono",
      submit: "Enviar",
      thankYou: "Gracias por su respuesta",
      goBack: "Regresar",
      gender: "Género",
      nationality: "Nacionalidad",
      selectGender: "Seleccionar Género",
      selectNationality: "Seleccionar Nacionalidad"
    },
    french: {
      welcome: "Bienvenue à Fanar",
      date: "Date",
      firstName: "Prénom",
      lastName: "Nom de famille",
      email: "Email",
      phone: "Téléphone",
      submit: "Soumettre",
      thankYou: "Merci pour votre réponse",
      goBack: "Retourner",
      gender: "Genre",
      nationality: "Nationalité",
      selectGender: "Sélectionner le genre",
      selectNationality: "Sélectionner la nationalité"
    },
    german: {
      welcome: "Willkommen bei Fanar",
      date: "Datum",
      firstName: "Vorname",
      lastName: "Nachname",
      email: "Email",
      phone: "Telefon",
      submit: "Einreichen",
      thankYou: "Vielen Dank für Ihre Antwort",
      goBack: "Zurück",
      gender: "Geschlecht",
      nationality: "Nationalität",
      selectGender: "Geschlecht auswählen",
      selectNationality: "Nationalität auswählen"
    },
    chinese: {
      welcome: "欢迎来到Fanar",
      date: "日期",
      firstName: "名字",
      lastName: "姓氏",
      email: "电子邮件",
      phone: "电话:",
      submit: "提交",
      thankYou: "感谢您的回复",
      goBack: "返回",
      gender: "性别",
      nationality: "国籍",
      selectGender: "选择性别",
      selectNationality: "选择国籍"
    },
    portuguese: {
      welcome: "Bem-vindo ao Fanar",
      date: "Data",
      firstName: "Nome",
      lastName: "Sobrenome",
      email: "Email",
      phone: "Telefone",
      submit: "Enviar",
      thankYou: "Obrigado pela sua resposta",
      goBack: "Voltar",
      gender: "Gênero",
      nationality: "Nacionalidade",
      selectGender: "Selecionar Gênero",
      selectNationality: "Selecionar Nacionalidade"
    },
    russian: {
      welcome: "Добро пожаловать в Fanar",
      date: "Дата",
      firstName: "Имя",
      lastName: "Фамилия",
      email: "Эл. почта",
      phone: "Телефон",
      submit: "Отправить",
      thankYou: "Спасибо за ваш ответ",
      goBack: "Вернуться",
      gender: "Пол",
      nationality: "Национальность",
      selectGender: "Выберите пол",
      selectNationality: "Выберите национальность"
    },
    japanese: {
      welcome: "ファナールへようこそ",
      date: "日付",
      firstName: "名",
      lastName: "姓",
      email: "メール",
      phone: "電話",
      submit: "送信",
      thankYou: "ご回答いただきありがとうございます",
      goBack: "戻る",
      gender: "性別",
      nationality: "国籍",
      selectGender: "性別を選択",
      selectNationality: "国籍を選択"
    },
    italian: {
      welcome: "Benvenuto a Fanar",
      date: "Data",
      firstName: "Nome",
      lastName: "Cognome",
      email: "Email",
      phone: "Telefono",
      submit: "Invia",
      thankYou: "Grazie per la tua risposta",
      goBack: "Torna indietro",
      gender: "Genere",
      nationality: "Nazionalità",
      selectGender: "Seleziona il genere",
      selectNationality: "Seleziona la nazionalità"
    },
  };

  const currentLabels = labels[language] || labels.english;

  // List of nationalities
  const nationalit = [
    "Afghan",
    "Algerian",
    "Albanian",
    "American",
    "Andorran",
    "Angolan",
    "Antiguans",
    "Argentinean",
    "Armenian",
    "Australian",
    "Austrian",
    "Bahamian",
    "Azerbaijani",
    "Bahraini",
    "Bangladeshi",
    "Barbadian",
    "Barbudans",
    "Batswana",
    "Belarusian",
    "Belgian",
    "Belizean",
    "Beninese",
    "Bhutanese",
    "Bolivian",
    "Bosnian",
    "Brazilian",
    "British",
    "Bruneian",
    "Bulgarian",
    "Burkinabe",
    "Burmese",
    "Burundian",
    "Cambodian",
    "Cameroonian",
    "Canadian",
    "Cape Verdean",
    "Central African",
    "Chadian",
    "Chilean",
    "Chinese",
    "Colombian",
    "Comoran",
    "Congolese",
    "Costa Rican",
    "Croatian",
    "Cuban",
    "Cypriot",
    "Czech",
    "Danish",
    "Djibouti",
    "Dominican",
    "Dutch",
    "East Timorese",
    "Ecuadorean",
    "Egyptian",
    "Emirian",
    "Equatorial Guinean",
    "Eritrean",
    "Estonian",
    "Ethiopian",
    "Fijian",
    "Filipino",
    "Finnish",
    "French",
    "Gabonese",
    "Gambian",
    "Georgian",
    "German",
    "Ghanaian",
    "Greek",
    "Grenadian",
    "Guatemalan",
    "Guinea-Bissauan",
    "Guinean",
    "Guyanese",
    "Haitian",
    "Herzegovinian",
    "Honduran",
    "Hungarian",
    "Icelander",
    "Indian",
    "Indonesian",
    "Iranian",
    "Iraqi",
    "Irish",
    "Israeli",
    "Italian",
    "Ivorian",
    "Jamaican",
    "Japanese",
    "Jordanian",
    "Kazakhstani",
    "Kenyan",
    "Kittian and Nevisian",
    "Kuwaiti",
    "Kyrgyz",
    "Laotian",
    "Latvian",
    "Lebanese",
    "Liberian",
    "Libyan",
    "Liechtensteiner",
    "Lithuanian",
    "Luxembourger",
    "Macedonian",
    "Malagasy",
    "Malawian",
    "Malaysian",
    "Maldivan",
    "Malian",
    "Maltese",
    "Marshallese",
    "Mauritanian",
    "Mauritian",
    "Mexican",
    "Micronesian",
    "Moldovan",
    "Monacan",
    "Mongolian",
    "Moroccan",
    "Mosotho",
    "Motswana",
    "Mozambican",
    "Namibian",
    "Nauruan",
    "Nepalese",
    "New Zealander",
    "Nicaraguan",
    "Nigerian",
    "Nigerien",
    "North Korean",
    "Northern Irish",
    "Norwegian",
    "Omani",
    "Pakistani",
    "Palauan",
    "Panamanian",
    "Papua New Guinean",
    "Paraguayan",
    "Peruvian",
    "Polish",
    "Portuguese",
    "Qatari",
    "Romanian",
    "Russian",
    "Rwandan",
    "Saint Lucian",
    "Salvadoran",
    "Samoan",
    "San Marinese",
    "Sao Tomean",
    "Saudi",
    "Scottish",
    "Senegalese",
    "Serbian",
    "Seychellois",
    "Sierra Leonean",
    "Singaporean",
    "Slovakian",
    "Slovenian",
    "Solomon Islander",
    "Somali",
    "South African",
    "South Korean",
    "Spanish",
    "Sri Lankan",
    "Sudanese",
    "Surinamer",
    "Swazi",
    "Swedish",
    "Swiss",
    "Syrian",
    "Taiwanese",
    "Tajik",
    "Tanzanian",
    "Thai",
    "Togolese",
    "Tongan",
    "Trinidadian or Tobagonian",
    "Tunisian",
    "Turkish",
    "Tuvaluan",
    "Ugandan",
    "Ukrainian",
    "Uruguayan",
    "Uzbekistani",
    "Venezuelan",
    "Vietnamese",
    "Welsh",
    "Yemenite",
    "Zambian",
    "Zimbabwean",
  ];

  const nationalities = nationalit.map((nationality) => ({
    label: nationality,
    value: nationality.toLowerCase(),
  }));

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={"height"}
      keyboardVerticalOffset={90}
    >
      <View>
        <ImageBackground
          source={require("../assets/fanar.jpg")}
          style={styles.background}
        >
          <View style={styles.date}>
            <Text style={styles.dates}>
              {currentLabels.date} {date.toDateString()}
            </Text>
          </View>
          <View style={styles.head}>
            <Text style={styles.heading}>Welcome to Fanar</Text>
          </View>
          <View style={styles.textboxes}>
            <Text style={styles.label}>{'* '+currentLabels.firstName}</Text>
            <TextInput
              style={[
                styles.input,
                { borderColor: firstNameBorderColor }, // Apply border color based on validation
              ]}
              value={firstName}
              onChangeText={(text) => {
                setFirstName(text);
                if (text === "") {
                  setFirstNameError("");
                  setFirstNameBorderColor("#ccc");
                } else if (validateSpecialCharacters(text)) {
                  setFirstNameError("");
                  setFirstNameBorderColor("#ccc");
                } else {
                  setFirstNameError("No special characters allowed");
                  setFirstNameBorderColor("red");
                }
              }}
              placeholder={currentLabels.firstName}
            />
            {firstNameError ? <Text style={styles.errorText}>{firstNameError}</Text> : null}
            <Text style={styles.label}>{'* '+currentLabels.lastName}</Text>
            <TextInput
              style={[
                styles.input,
                { borderColor: lastNameBorderColor }, // Apply border color based on validation
              ]}
              value={lastName}
              onChangeText={(text) => {
                setLastName(text);
                if (text === "") {
                  setLastNameError("");
                  setLastNameBorderColor("#ccc");
                } else if (validateSpecialCharacters(text)) {
                  setLastNameError("");
                  setLastNameBorderColor("#ccc");
                } else {
                  setLastNameError("No special characters allowed");
                  setLastNameBorderColor("red");
                }
              }}
              placeholder={currentLabels.lastName}
            />
            {lastNameError ? <Text style={styles.errorText}>{lastNameError}</Text> : null}
            <Text style={styles.label}>{'* '+currentLabels.nationality}</Text>
            <Dropdown
              data={nationalities}
              placeholder={currentLabels.selectNationality}
              value={nationality}
              labelField="label"
              valueField="value"
              style={[
                styles.input,
                {
                  width: "100%",
                  height: screenHeight * 0.043,
                  justifyContent: "center",
                },
              ]}
              search
              selectedTextStyle={{ fontSize: 16 }}
              searchPlaceholder="Search..."
              placeholderStyle={{ color: "#888" }}
              onChange={(item) => {
                handleNationalityChange(item.value);
              }}
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
                <Picker.Item label={currentLabels.selectGender} value="" />
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
                <Picker.Item label="Others" value="others" />
              </Picker>
            </View>
            
            <View style={styles.buttonContainer}>
              <Button
                title={currentLabels.submit}
                onPress={handleSubmit}
                style={styles.button}
              />
            </View>
          </View>
          <View style={styles.logoContainer}>
            <Image
              source={require("../assets/loogo.png")}
              style={styles.logo}
            />
          </View>
        </ImageBackground>
      </View>
      <Success
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  head: {
    alignItems: "center",
  },
  heading: {
    fontSize: screenWidth * 0.08,
    color: "#002142",
    fontWeight: "bold",
  },
  date: {
    padding: 10,
    marginBottom: 10,
    alignItems: "flex-end",
    color: "black",
    paddingLeft: screenWidth * 0.036,
  },
  dates: {
    fontSize: screenWidth * 0.025,
    color: "white",
    fontWeight: "bold",
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
    paddingTop: screenHeight * 0.03,
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
    color: "#888", // This might not be necessary for the input box itself, consider moving it to a text style if it's for placeholders
  },
  gender: {
    // Keep this if the style for gender picker is meant to be distinct
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
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    paddingHorizontal: 10,
  },
  logo: {
    width: 250,
    height: 250,
    resizeMode: "contain",
    justifyContent: "space-between",
    marginTop: 20,
    paddingHorizontal: 10,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});

export default Forms;
