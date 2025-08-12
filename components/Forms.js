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
  ScrollView
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Dropdown } from "react-native-element-dropdown";
// import Success from "./Success"; // Import Success component
import moment from "moment";
import CheckBox from "expo-checkbox";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const Forms = ({ navigation, route }) => {
  const { language, addSubmission } = route.params;
  // const [date, setDate] = useState(new Date());
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [kindOfVisiting, setKindOfVisiting] = useState("");
  const [purposeOfVisiting, setPurposeOfVisiting] = useState("");
  const [favouriteLanguage, setFavouriteLanguage] = useState("");
  const [remarks, setRemarks] = useState("");
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
  const [residencyStatus, setResidencyStatus] = useState("");
  const [residencyPlaceholderColor, setResidencyPlaceholderColor] = useState("#888");

  const handleResidencyChange = (itemValue) => {
    setResidencyStatus(itemValue);
    setResidencyPlaceholderColor(itemValue === "" ? "#888" : "black");
  };
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
        "Please fill out all required fields with valid data and consent ",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }]
      );
    } else {
      // Prepare the new submission object
      const newSubmission = {
        date: CsvDate,
        firstName,
        lastName,
        email,
        phone: phone === "" ? "" : "+" + phone,
        gender: gender,
        nationality,
        residencyStatus,
        purposeOfVisiting,
        favouriteLanguage,
        kindOfVisiting,
        remarks,
        newsletterSubscribed: newsletterSubscribed == true ? "Yes" : "No", // Include newsletter subscription in the submission
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
      setKindOfVisiting("");
      setPurposeOfVisiting("");
      setFavouriteLanguage("");
      setRemarks("");
      setResidencyStatus("")

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
      terms: "By checking this box, I consent to the collection and utilization of data for analytical purposes.",
      newsletter: "I agree to receive the newsletter",
      residency: "Residency Status",
      selectResidency: "Select Residency Status",
      tourist: "Tourist",
      resident: "Resident",
      kindOfVisiting: "Visitor Type",
      selectKindOfVisiting: "Select Visitor Type",
      purposeOfVisiting: "Purpose of Visiting",
      selectPurposeOfVisiting: "Select Purpose of Visiting",
      favouriteLanguage: "Favourite Language",
      selectFavouriteLanguage: "Select Favourite Language",
      remarks: "Remarks",
      individual: "Individual",
      TouristSchool: "Tourist School",
      vip: "VIP",
      TouristGroup: "Tourist Group",
      TouristCorporate:"Tourist Corporate",
      conversion: "Conversion",
      explore: "Explore",
      learn: "Learn",
      other: "Other",
    },
    italian: {
      welcome: "Benvenuto",
      firstName: "Nome",
      lastName: "Cognome",
      email: "Email",
      phone: "Telefono",
      submit: "Invia",
      thankYou: "Grazie per la tua risposta",
      goBack: "Indietro",
      nationality: "Nazionalità",
      selectGender: "Seleziona Genere",
      selectNationality: "Seleziona Nazionalità",
      gender: "Genere",
      male: "Maschio",
      female: "Femmina",
      others: "Altro",
      terms: "Spuntando questa casella, acconsento alla raccolta e all'utilizzo dei dati per scopi analitici.",
      newsletter: "Accetto di ricevere la newsletter",
      residency: "Stato di residenza",
      selectResidency: "Seleziona lo stato di residenza",
      tourist: "Turista",
      resident: "Residente",
      kindOfVisiting: "Tipo di visita",
      selectKindOfVisiting: "Seleziona il tipo di visita",
      purposeOfVisiting: "Scopo della visita",
      selectPurposeOfVisiting: "Seleziona lo scopo della visita",
      favouriteLanguage: "Lingua preferita",
      selectFavouriteLanguage: "Seleziona la lingua preferita",
      remarks: "Osservazioni",
      individual: "Individuale",
      groupSchool: "Gruppi (Scuola)",
      vip: "VIP",
      touristGroup: "Gruppo turistico",
      conversion: "Conversion",
      experience: "Esperienza",
      learn: "Imparare",
      other: "Altro",
      conversion: "conversione", explore: "esplorare", TouristGroup: "Turista Gruppo", TouristSchool: "Turista Scuola", TouristCorporate: "Turista Aziendale"
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
      terms: "بالتحقق من هذا المربع، أوافق على جمع واستخدام البيانات لأغراض تحليلية.",
      newsletter: "أوافق على تلقي النشرة الإخبارية",
      residency: "حالة الإقامة",
      selectResidency: "اختر حالة الإقامة",
      tourist: "سائح",
      resident: "مقيم",
      kindOfVisiting: "نوع الزيارة",
      selectKindOfVisiting: "اختر نوع الزيارة",
      purposeOfVisiting: "غرض الزيارة",
      selectPurposeOfVisiting: "اختر غرض الزيارة",
      favouriteLanguage: "اللغة المفضلة",
      selectFavouriteLanguage: "اختر اللغة المفضلة",
      remarks: "ملاحظات",
      individual: "فردي",
      groupSchool: "مجموعات (مدرسة)",
      vip: "هام (VIP)",
      touristGroup: "مجموعة سياحية",
      learn: "تعلم",
      other: "أخرى",
      conversion: "تحويل", 
      explore: "استكشاف", 
      TouristGroup: "سائح مجموعة", 
      TouristSchool: "سائح مدرسة", 
      TouristCorporate: "سائح شركة",
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
      terms: "Al marcar esta casilla, consiento la recopilación y utilización de datos con fines analíticos.",
      newsletter: "Acepto recibir el boletín informativo",
      residency: "Estado de residencia",
      selectResidency: "Seleccionar estado de residencia",
      tourist: "Turista",
      resident: "Residente",
      kindOfVisiting: "Tipo de visita",
      selectKindOfVisiting: "Seleccionar tipo de visita",
      purposeOfVisiting: "Propósito de la visita",
      selectPurposeOfVisiting: "Seleccionar propósito de la visita",
      favouriteLanguage: "Idioma favorito",
      selectFavouriteLanguage: "Seleccionar idioma favorito",
      remarks: "Observaciones",
      individual: "Individual",
      groupSchool: "Grupos (Escuela)",
      vip: "VIP",
      touristGroup: "Grupo turístico",
      learn: "Aprender",
      other: "Otro",
      conversion: "conversión", explore: "explorar", TouristGroup: "Turista Grupo", TouristSchool: "Turista Escuela", TouristCorporate: "Turista Corporativo"
    },
    french: {
      welcome: "Bonjour",
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
      terms: "En cochant cette case, je consens à la collecte et à l'utilisation des données à des fins analytiques",
      newsletter: "Je souhaite recevoir la newsletter",
      residency: "Statut de résidence",
      selectResidency: "Sélectionner le statut de résidence",
      tourist: "Touriste",
      resident: "Résident",
      kindOfVisiting: "Type de visite",
      selectKindOfVisiting: "Sélectionner le type de visite",
      purposeOfVisiting: "But de la visite",
      selectPurposeOfVisiting: "Sélectionner le but de la visite",
      favouriteLanguage: "Langue préférée",
      selectFavouriteLanguage: "Sélectionner la langue préférée",
      remarks: "Remarques",
      individual: "Individuel",
      groupSchool: "Groupes (École)",
      vip: "VIP",
      touristGroup: "Groupe touristique",
      learn: "Apprendre",
      other: "Autre",
      conversion: "conversion",
      explore: "explorer",
      TouristGroup: "Touriste Groupe",
      TouristSchool: "Touriste École",
      TouristCorporate: "Touriste Entreprise"
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
      terms: "Durch Ankreuzen dieses Kästchens willige ich in die Erhebung und Nutzung von Daten zu Analysezwecken ein.",
      newsletter: "Ich möchte den Newsletter erhalten",
      residency: "Aufenthaltsstatus",
      selectResidency: "Aufenthaltsstatus auswählen",
      tourist: "Tourist",
      resident: "Einwohner",
      kindOfVisiting: "Art des Besuchs",
      selectKindOfVisiting: "Art des Besuchs auswählen",
      purposeOfVisiting: "Zweck des Besuchs",
      selectPurposeOfVisiting: "Zweck des Besuchs auswählen",
      favouriteLanguage: "Lieblingssprache",
      selectFavouriteLanguage: "Lieblingssprache auswählen",
      remarks: "Bemerkungen",
      individual: "Einzelperson",
      groupSchool: "Gruppen (Schule)",
      vip: "VIP",
      touristGroup: "Touristengruppe",
      learn: "Lernen",
      other: "Andere",
      conversion: "Konvertierung",
      explore: "erkunden",
      TouristGroup: "Tourist Gruppe",
      TouristSchool: "Tourist Schule",
      TouristCorporate: "Tourist Unternehmen"
    },
    chinese: {
      welcome: "你好",
      firstName: "名字",
      lastName: "姓氏",
      email: "电子邮件",
      phone: "电话",
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
      terms: "勾选此框表示我同意收集和利用数据用于分析目的。",
      newsletter: "我同意接收新闻通讯",
      residency: "居留身份",
      selectResidency: "选择居留身份",
      tourist: "游客",
      resident: "居民",
      kindOfVisiting: "来访类型",
      selectKindOfVisiting: "选择来访类型",
      purposeOfVisiting: "来访目的",
      selectPurposeOfVisiting: "选择来访目的",
      favouriteLanguage: "最喜欢的语言",
      selectFavouriteLanguage: "选择最喜欢的语言",
      remarks: "备注",
      individual: "个人",
      groupSchool: "团体（学校）",
      vip: "贵宾 (VIP)",
      touristGroup: "旅游团",
      learn: "学习",
      other: "其他",
      conversion: "转换", explore: "探索", TouristGroup: "游客 团体", TouristSchool: "游客 学校", TouristCorporate: "游客 企业"


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
      terms: "Ao marcar esta caixa, concordo com a coleta e utilização de dados para fins analíticos.",
      newsletter: "Concordo em receber o boletim informativo",
      residency: "Status de residência",
      selectResidency: "Selecionar status de residência",
      tourist: "Turista",
      resident: "Residente",
      kindOfVisiting: "Tipo de visita",
      selectKindOfVisiting: "Selecionar tipo de visita",
      purposeOfVisiting: "Finalidade da visita",
      selectPurposeOfVisiting: "Selecionar finalidade da visita",
      favouriteLanguage: "Idioma favorito",
      selectFavouriteLanguage: "Selecionar idioma favorito",
      remarks: "Observações",
      individual: "Individual",
      groupSchool: "Grupos (Escola)",
      vip: "VIP",
      touristGroup: "Grupo turístico",
      learn: "Aprender",
      other: "Outro",
      conversion: "conversão", explore: "explorar",
      TouristGroup: "Turista Grupo",
      TouristSchool: "Turista Escola",
      TouristCorporate: "Turista Empresarial"

    },
    russian: {
      welcome: "Привет",
      firstName: "Имя",
      lastName: "Фамилия",
      email: "Электронная почта",
      phone: "Телефон",
      submit: "Отправить",
      thankYou: "Спасибо за ваш ответ",
      goBack: "Назад",
      nationality: "Национальность",
      selectNationality: "Выбрать национальность",
      gender: "Пол",
      selectGender: "Выбрать пол",
      male: "Мужчина",
      female: "Женщина",
      others: "Другие",
      terms: "Отметив этот флажок, я соглашаюсь на сбор и использование данных в аналитических целях.",
      newsletter: "Я согласен получать новостную рассылку",
      residency: "Статус проживания",
      selectResidency: "Выберите статус проживания",
      tourist: "Турист",
      resident: "Резидент",
      kindOfVisiting: "Тип визита",
      selectKindOfVisiting: "Выбрать тип визита",
      purposeOfVisiting: "Цель визита",
      selectPurposeOfVisiting: "Выбрать цель визита",
      favouriteLanguage: "Любимый язык",
      selectFavouriteLanguage: "Выбрать любимый язык",
      remarks: "Примечания",
      individual: "Индивидуальный",
      vip: "VIP",
      learn: "Учиться",
      other: "Другое",
      conversion: "конверсия", explore: "исследовать", TouristGroup: "Турист Группа", TouristSchool: "Турист Школа", TouristCorporate: "Турист Корпоративный"


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
      terms: "このボックスにチェックを入れることで、データの収集と分析目的での利用に同意します。",
      newsletter: "ニュースレターを購読することに同意します",
      residency: "居住ステータス",
      selectResidency: "居住ステータスを選択",
      tourist: "旅行者",
      resident: "居住者",
      kindOfVisiting: "訪問の種類",
      selectKindOfVisiting: "訪問の種類を選択",
      purposeOfVisiting: "訪問の目的",
      selectPurposeOfVisiting: "訪問の目的を選択",
      favouriteLanguage: "好きな言語",
      selectFavouriteLanguage: "好きな言語を選択",
      remarks: "備考",
      individual: "個人",
      vip: "VIP",
      learn: "学ぶ",
      other: "その他",
      onversion: "変換", explore: "探検", TouristGroup: "観光客 グループ", TouristSchool: "観光客 学校", TouristCorporate: "観光客 企業"

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
  const csvFormatDate = (date) => {
    return moment(date).format("Do MMMM YYYY");
  };

  const date = formatDate(new Date());
  const CsvDate = csvFormatDate(new Date());
  // console.log(CsvDate);


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
          <ScrollView
            contentContainerStyle={{ paddingBottom: 40 }}
            keyboardShouldPersistTaps="handled"
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
                    value="Male"
                  />
                  <Picker.Item
                    label={currentLabels.female}
                    value="Female"
                  />
                  {/* <Picker.Item
                    label={currentLabels.others}
                    value="Others"
                  /> */}
                </Picker>
              </View>

              <Text style={styles.label}>{currentLabels.purposeOfVisiting}</Text>
              <View style={styles.gender}>
                <Picker selectedValue={purposeOfVisiting} onValueChange={setPurposeOfVisiting}
                  style={{ color: placeholderColor }}>
                  <Picker.Item label={currentLabels.selectPurposeOfVisiting} value="" />
                  <Picker.Item label={currentLabels.conversion} value="Conversion" />
                  <Picker.Item label={currentLabels.explore} value="Explore" />
                  <Picker.Item label={currentLabels.learn} value="Learn" />
                  <Picker.Item label={currentLabels.other} value="Other" />
                </Picker>
              </View>

              <Text style={styles.label}>{currentLabels.favouriteLanguage}</Text>
              <View style={styles.gender}>
                <Picker selectedValue={favouriteLanguage} onValueChange={setFavouriteLanguage}
                  style={{ color: placeholderColor }}>
                  <Picker.Item label={currentLabels.selectFavouriteLanguage} value="" />
                  <Picker.Item label="Arabic" value="Arabic" />
                  <Picker.Item label="Chinese" value="Chinese" />
                  <Picker.Item label="English" value="English" />
                  <Picker.Item label="French" value="French" />
                  <Picker.Item label="German" value="German" />
                  <Picker.Item label="Italian" value="Italian" />
                  <Picker.Item label="Japanese" value="Japanese" />
                  <Picker.Item label="Portuguese" value="Portuguese" />
                  <Picker.Item label="Russian" value="Russian" />
                  <Picker.Item label="Spanish" value="Spanish" />
                  <Picker.Item label="Other" value="Other" />
                </Picker>
              </View>

              <Text style={styles.label}>{currentLabels.residency}</Text>
              <View style={styles.gender}>
                <Picker
                  selectedValue={residencyStatus}
                  onValueChange={handleResidencyChange}
                  style={{ color: residencyPlaceholderColor }}
                >
                  <Picker.Item label={currentLabels.selectResidency} value="" />
                  <Picker.Item label={currentLabels.tourist} value={currentLabels.tourist} />
                  <Picker.Item label={currentLabels.resident} value={currentLabels.resident} />
                </Picker>
              </View>
              <Text style={styles.label}>{currentLabels.kindOfVisiting}</Text>
              <View style={styles.gender}>
                <Picker selectedValue={kindOfVisiting} onValueChange={setKindOfVisiting}
                  style={{ color: placeholderColor }}>
                  <Picker.Item label={currentLabels.selectKindOfVisiting} value="" />
                  <Picker.Item label={currentLabels.individual} value="Individual" />
                  <Picker.Item label={currentLabels.TouristGroup} value="Group (Tourist)" />
                  <Picker.Item label={currentLabels.TouristSchool} value="Group (School)" />
                  <Picker.Item label={currentLabels.TouristCorporate} value="Group (Corporate)" />
                  <Picker.Item label={currentLabels.vip} value="VIP" />
                </Picker>
              </View>


              <Text style={styles.label}>{currentLabels.remarks}</Text>
              <TextInput
                style={[styles.input, { height: 80, textAlignVertical: "top" }]}
                value={remarks}
                onChangeText={setRemarks}
                placeholder={currentLabels.remarks}
                multiline
              />

              <View style={styles.checkboxContainer}>
                <View style={styles.checkbox}>
                  <CheckBox
                    value={termsAccepted}
                    onValueChange={(newValue) => setTermsAccepted(newValue)}
                  />
                  <Text style={styles.label}>
                    {currentLabels.terms}
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
                    {currentLabels.newsletter}
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
          </ScrollView>
        </ImageBackground>
      </View>
      {/* <Success
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
      /> */}
      {/* </ScrollView> */}
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

