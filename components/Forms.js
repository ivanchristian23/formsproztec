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
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Dropdown } from "react-native-element-dropdown";
import Success from "./Success"; // Import Success component
import moment from "moment";
import CheckBox from "expo-checkbox";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const Forms = ({ navigation, route }) => {
  const { language, addSubmission } = route.params;
  // const [date, setDate] = useState(new Date());
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [nationality, setNationality] = useState(""); // New state for nationality
  const [placeholderColor, setPlaceholderColor] = useState("#888"); // Grey color for placeholder
  const [placeholderColor1, setPlaceholderColor1] = useState("#888"); // Grey color for placeholder
  const [isModalVisible, setModalVisible] = useState(false); // State variable for success modal
  const [firstNameBorderColor, setFirstNameBorderColor] = useState("#ccc"); // Border color for first name
  const [lastNameBorderColor, setLastNameBorderColor] = useState("#ccc"); // Border color for last name
  const [firstNameError, setFirstNameError] = useState(""); // Error message for first name
  const [lastNameError, setLastNameError] = useState(""); // Error message for last name
  const [termsAccepted, setTermsAccepted] = useState(false); // State variable for terms acceptance
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false); // State variable for newsletter subscription

  const validateSpecialCharacters = (text) => {
    const blacklistRe = /[!@#$%^&*(),.?":{}<>0-9]/;
    return !blacklistRe.test(text);
  };

  // Function to validate email format
  const validateEmail = (email) => {
    // Regular expression for email validation
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const handleSubmit = () => {
    // Check if any required field is empty or contains special characters
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !nationality.trim() ||
      !email.trim() ||
      !validateEmail(email) ||
      !validateSpecialCharacters(firstName) ||
      !validateSpecialCharacters(lastName) ||
      !termsAccepted
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
        "Please fill out all fields with valid data and Consent to data usage",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }]
      );
    } else {
      // Prepare the new submission object
      const newSubmission = {
        date: date,
        firstName,
        lastName,
        email,
        phone: phone === "" ? "" : "+" + phone,
        gender: gender,
        nationality,
        newsletterSubscribed: newsletterSubscribed == true ? "Yes": "No" , // Include newsletter subscription in the submission
      };
      console.log(newSubmission);

      // Reset fields
      setEmail("");
      setFirstName("");
      setLastName("");
      setPhone("");
      setGender("");
      setNationality("");
      // setModalVisible(true); // Show success modal
      setTermsAccepted(false); // Reset terms acceptance
      setNewsletterSubscribed(false); // Reset newsletter subscription

      // Call the callback function if it exists
      if (addSubmission) {
        addSubmission(newSubmission); // Call the callback function with newSubmission
      }

      // Optionally navigate back to home or another screen
      // navigation.navigate('Home', {newSubmission});
      navigation.navigate("ThankYouScreen", { newSubmission });
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
      welcome: "Marhaba",
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email",
      phone: "Phone",
      submit: "Submit",
      thankYou: "Thank you for your response",
      goBack: "Go back",
      nationality: "Nationality",
      selectGender: "Select Gender",
      selectNationality: "Select Nationality",
      gender: "Gender",
      male: "Male",
      female: "Female",
      others: "Others",
    },
    arabic: {
      welcome: "مرحبا",
      firstName: "الاسم الأول",
      lastName: "الاسم الأخير",
      email: "البريد الإلكتروني",
      phone: "الهاتف",
      submit: "إرسال",
      thankYou: "شكرًا لاستجابتك",
      goBack: "العودة",
      nationality: "الجنسية",
      selectNationality: "اختر الجنسية",
      gender: "الجنس",
      selectGender: "اختر الجنس",
      male: "ذكر",
      female: "أنثى",
      others: "آخرون",
    },
    spanish: {
      welcome: "Hola",
      firstName: "Nombre",
      lastName: "Apellido",
      email: "Correo Electrónico",
      phone: "Teléfono",
      submit: "Enviar",
      thankYou: "Gracias por su respuesta",
      goBack: "Regresar",
      nationality: "Nacionalidad",
      selectNationality: "Seleccionar Nacionalidad",
      gender: "Género",
      selectGender: "Seleccionar Género",
      male: "Masculino",
      female: "Femenino",
      others: "Otros",
    },
    french: {
      welcome: "Hola",

      firstName: "Prénom",
      lastName: "Nom de famille",
      email: "Email",
      phone: "Téléphone",
      submit: "Soumettre",
      thankYou: "Merci pour votre réponse",
      goBack: "Retourner",
      nationality: "Nationalité",
      selectNationality: "Sélectionner la nationalité",
      gender: "Genre",
      selectGender: "Sélectionner le genre",
      male: "Masculin",
      female: "Féminin",
      others: "Autre",
    },
    german: {
      welcome: "Hallo",

      firstName: "Vorname",
      lastName: "Nachname",
      email: "Email",
      phone: "Telefon",
      submit: "Einreichen",
      thankYou: "Vielen Dank für Ihre Antwort",
      goBack: "Zurück",
      nationality: "Nationalität",
      selectNationality: "Nationalität auswählen",
      gender: "Geschlecht",
      selectGender: "Geschlecht auswählen",
      male: "Männlich",
      female: "Weiblich",
      others: "Andere",
    },
    chinese: {
      welcome: "你好",

      firstName: "名字",
      lastName: "姓氏",
      email: "电子邮件",
      phone: "电话:",
      submit: "提交",
      thankYou: "感谢您的回复",
      goBack: "返回",
      nationality: "国籍",
      selectNationality: "选择国籍",
      gender: "性别",
      selectGender: "选择性别",
      male: "男性",
      female: "女性",
      others: "其他",
    },
    portuguese: {
      welcome: "Olá",

      firstName: "Nome",
      lastName: "Sobrenome",
      email: "Email",
      phone: "Telefone",
      submit: "Enviar",
      thankYou: "Obrigado pela sua resposta",
      goBack: "Voltar",
      nationality: "Nacionalidade",
      selectNationality: "Selecionar Nacionalidade",
      gender: "Gênero",
      selectGender: "Selecionar Gênero",
      male: "Masculino",
      female: "Feminino",
      others: "Outros",
    },
    russian: {
      welcome: "Привет",

      firstName: "Имя",
      lastName: "Фамилия",
      email: "Эл. почта",
      phone: "Телефон",
      submit: "Отправить",
      thankYou: "Спасибо за ваш ответ",
      goBack: "Вернуться",
      nationality: "Национальность",
      selectNationality: "Выберите национальность",
      gender: "Пол",
      selectGender: "Выберите пол",
      male: "Мужской",
      female: "Женский",
      others: "Другой",
    },
    japanese: {
      welcome: "こんにちは",

      firstName: "名",
      lastName: "姓",
      email: "メール",
      phone: "電話",
      submit: "送信",
      thankYou: "ご回答いただきありがとうございます",
      goBack: "戻る",
      nationality: "国籍",
      selectNationality: "国籍を選択",
      gender: "性別",
      selectGender: "性別を選択",
      male: "男性",
      female: "女性",
      others: "その他",
    },
    italian: {
      welcome: "Ciao",

      firstName: "Nome",
      lastName: "Cognome",
      email: "Email",
      phone: "Telefono",
      submit: "Invia",
      thankYou: "Grazie per la tua risposta",
      goBack: "Torna indietro",
      nationality: "Nazionalità",
      selectNationality: "Seleziona la nazionalità",
      gender: "Genere",
      selectGender: "Seleziona il genere",
      male: "Maschile",
      female: "Femminile",
      others: "Altro",
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
    value: nationality,
  }));

  // Function to format the date
  const formatDate = (date) => {
    return moment(date).format("dddd, Do MMMM YYYY");
  };

  const date = formatDate(moment().subtract(1, 'month').date(10).toISOString(),);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={"height"}
      keyboardVerticalOffset={90}
    >
      <View>
        <ImageBackground
          source={require("../assets/up.jpg")}
          style={styles.background}
          imageStyle={{
            resizeMode: "cover",
          }}
        >
          <View style={styles.date}>
            <Text style={styles.dates}>{date}</Text>
          </View>
          <View style={styles.head}>
            <Text style={styles.heading}>{currentLabels.welcome}</Text>
          </View>
          <View style={styles.textboxes}>
            <Text style={styles.label}>{"* " + currentLabels.firstName}</Text>
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
            {firstNameError ? (
              <Text style={styles.errorText}>{firstNameError}</Text>
            ) : null}
            <Text style={styles.label}>{"* " + currentLabels.lastName}</Text>
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
            {lastNameError ? (
              <Text style={styles.errorText}>{lastNameError}</Text>
            ) : null}
            <Text style={styles.label}>{"* " + currentLabels.nationality}</Text>
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
            <Text style={styles.label}>* {currentLabels.email}</Text>
            <TextInput
              style={styles.input}
              value={email}
              autoCapitalize="none"
              onChangeText={setEmail}
              placeholder={currentLabels.email}
              keyboardType="email-address"
            />

            {!validateEmail(email) && email.trim() !== "" && (
              <Text style={styles.errorText}>Invalid email address</Text>
            )}
            <Text style={styles.label}>{currentLabels.phone}</Text>
            <View style={styles.phoneContainer}>
              <Text style={styles.phonePrefix}>+</Text>
              <TextInput
                style={styles.phoneInput}
                value={phone}
                onChangeText={setPhone}
                placeholder={currentLabels.phone}
                keyboardType="phone-pad"
                maxLength={15} // Including the "+" sign
              />
            </View>
            <Text style={styles.label}>{currentLabels.gender}</Text>
            <View style={styles.gender}>
              <Picker
                selectedValue={gender}
                onValueChange={handleGenderChange}
                style={{ color: placeholderColor }}
              >
                <Picker.Item label={currentLabels.selectGender} value="" />
                <Picker.Item
                  label={currentLabels.male}
                  value={currentLabels.male}
                />
                <Picker.Item
                  label={currentLabels.female}
                  value={currentLabels.female}
                />
                <Picker.Item
                  label={currentLabels.others}
                  value={currentLabels.others}
                />
              </Picker>
            </View>
            <View style={styles.checkboxContainer}>
              <View style={styles.checkbox}>
                <CheckBox
                  value={termsAccepted}
                  onValueChange={(newValue) => setTermsAccepted(newValue)}
                />
                <Text style={styles.label}>
                By checking this box, you consent to the collection and utilization of usage data for analytical purposes.
                </Text>
              </View>
              <View style={styles.checkbox}>
                <CheckBox
                  value={newsletterSubscribed}
                  onValueChange={(newValue) =>
                    setNewsletterSubscribed(newValue)
                  }
                />
                <Text style={styles.label}>
                  I agree to receive the newsletter
                </Text>
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title={currentLabels.submit}
                onPress={handleSubmit}
                style={styles.button}
              />
            </View>
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
    color: "white",
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
    marginTop: -5,
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
    // alignSelf:'stretch',
    height: "100%",
    width: "100%",
    backgroundColor: "black",
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
    marginBottom: 20,
    backgroundColor: "white",
    height: screenHeight * 0.043,
    justifyContent: "center",
  },
  logoContainer: {
    flexDirection: "row",
    position: "absolute",
    right: 15,
    bottom: -20,
  },
  logoContainer2: {
    flexDirection: "row",
    position: "absolute",
    left: -10,
    top: -100,
  },
  logo: {
    width: 200,
    height: 250,
    resizeMode: "contain",
    paddingHorizontal: 10,
    marginRight: 0,
  },
  logo1: {
    width: screenWidth * 0.4,
    height: screenWidth * 0.4, // Ensure the height is equal to the width
    resizeMode: "contain",
    paddingHorizontal: 10,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  phoneContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "white",
    paddingHorizontal: 10,
  },
  phonePrefix: {
    fontSize: 16,
    paddingHorizontal: 10,
  },
  phoneInput: {
    flex: 1,
    padding: 10,
    fontSize: 16,
  },
  checkboxContainer: {
    marginBottom: 0,
  },
  checkbox: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "white",
    marginLeft: 10,
  },
});

export default Forms;
