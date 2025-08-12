import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity, 
  Alert, 
  Dimensions 
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";

const screenWidth = Dimensions.get("window").width;

const ComplaintForm = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [complaintDetails, setComplaintDetails] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const handleSubmit = async () => {
    if (!name || !email || !complaintDetails) {
      Alert.alert("Missing Fields", "Please fill all fields before submitting.");
      return;
    }

    const newComplaint = {
      name,
      email,
      complaintDetails,
      date: moment(date).format("Do MMMM YYYY")
    };

    try {
      const savedComplaints = await AsyncStorage.getItem("complaints");
      const complaintsArray = savedComplaints ? JSON.parse(savedComplaints) : [];
      complaintsArray.push(newComplaint);
      await AsyncStorage.setItem("complaints", JSON.stringify(complaintsArray));
      Alert.alert("Success", "Your complaint has been submitted.");
      navigation.goBack();
    } catch (error) {
      console.error("Error saving complaint:", error);
      Alert.alert("Error", "Failed to submit your complaint.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Complaint Form</Text>

      <TextInput
        style={styles.input}
        placeholder="Your Name"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Your Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <Text style={styles.dateInput}>
          {moment(date).format("Do MMMM YYYY")}
        </Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="calendar"
          onChange={handleDateChange}
        />
      )}

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Complaint Details"
        value={complaintDetails}
        onChangeText={setComplaintDetails}
        multiline
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit Complaint</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ComplaintForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
    marginBottom: 15,
  },
  dateInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
    marginBottom: 15,
    color: "#333",
  },
  textArea: {
    height: 120,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
