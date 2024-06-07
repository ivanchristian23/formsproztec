import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  ScrollView,
  Dimensions,
  Alert,
} from "react-native";
import * as FileSystem from "expo-file-system";
import * as MailComposer from "expo-mail-composer";
import * as MediaLibrary from "expo-media-library";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const SubmissionsScreen = ({ route }) => {
  const { submissions } = route.params;

  useEffect(() => {
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission required",
          "Please grant permission to access the media library"
        );
      }
    })();
  }, []);

  const exportToCSV = async () => {
    if (!submissions || submissions.length === 0) {
      Alert.alert("Error", "No submissions available");
      return;
    }

    const csvString = convertToCSV(submissions);
    const fileUri = `${FileSystem.documentDirectory}submissions.csv`;

    try {
      await FileSystem.writeAsStringAsync(fileUri, csvString);
      const asset = await MediaLibrary.createAssetAsync(fileUri);
      await MediaLibrary.createAlbumAsync("Download", asset, false);
      Alert.alert("Success", "CSV file saved to Downloads");
    } catch (error) {
      console.error("Error saving CSV file:", error);
      Alert.alert("Error", "Failed to save CSV file");
    }
  };

  const sendCSV = async () => {
    if (!submissions || submissions.length === 0) {
      Alert.alert("Error", "No submissions available");
      return;
    }

    const csvString = convertToCSV(submissions);
    const fileUri = `${FileSystem.cacheDirectory}submissions.csv`;

    try {
      await FileSystem.writeAsStringAsync(fileUri, csvString);
    } catch (error) {
      console.error("Error writing CSV file:", error);
      Alert.alert("Error", "Failed to create CSV file");
      return;
    }

    const options = {
      recipients: ["abdullabin2024@gmail.com"],
      subject: "Submissions CSV",
      body: "Please find the submissions attached as a CSV file.",
      attachments: [fileUri],
    };

    const isAvailable = await MailComposer.isAvailableAsync();
    if (isAvailable) {
      MailComposer.composeAsync(options)
        .then((result) => {
          if (result.status === MailComposer.MailComposerStatus.SENT) {
            Alert.alert("Success", "Email sent successfully");
          } else {
            Alert.alert("Error", "Failed to send email");
          }
        })
        .catch((error) => {
          console.error("Error sending email:", error);
          Alert.alert("Error", "An error occurred while sending email");
        });
    } else {
      Alert.alert("Error", "Email service is not available");
    }
  };

  const convertToCSV = (array) => {
    if (!array || array.length === 0) return "";
    const header =
      "ID," +
      Object.keys(array[0])
        .map((key) => capitalizeFirstLetter(key))
        .join(",") +
      "\n";
    const rows = array
      .map((obj, index) => `${index + 1},${Object.values(obj).join(",")}`)
      .join("\n");
    return header + rows;
  };

  const capitalizeFirstLetter = (string) => {
    return string
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* <Text style={styles.header}>Submissions</Text> */}
      <View style={styles.buttonContainer}>
        {/* <Button title="Export to CSV" onPress={exportToCSV} /> */}
        <Button title="Send CSV via Email" onPress={sendCSV} />
      </View>
      <Text/>
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderCell}>ID</Text>
          {Object.keys(submissions[0] || {}).map((key, index) => (
            <Text key={index} style={styles.tableHeaderCell}>
              {capitalizeFirstLetter(key)}
            </Text>
          ))}
        </View>
        {submissions.map((submission, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCell}>{index + 1}</Text>
            {Object.values(submission).map((value, subIndex) => (
              <Text key={subIndex} style={styles.tableCell}>
                {value}
              </Text>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default SubmissionsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5", // Light background for better readability
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  table: {
    width: screenWidth * 0.9,
    marginBottom: 30,
    backgroundColor: "#fff", // White background for the table
    borderRadius: 10, // Rounded corners for the table
    overflow: "hidden", // Ensure rounded corners
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: "#ccc",
    backgroundColor: "#eaeaea", // Slightly darker header background
  },
  tableHeaderCell: {
    flex: 1,
    fontWeight: "bold",
    padding: 10, // Increased padding for better touch targets
    textAlign: "center",
    fontSize: 13, // Larger font size for better readability
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCell: {
    flex: 1,
    padding: 10, // Increased padding for better touch targets
    textAlign: "center",
    fontSize: 16, // Larger font size for better readability
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20, // Added margin top for spacing
  },
});
