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
      // Use expo-media-library to request permissions
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

  // Helper function to capitalize first letter and add space between words
  const capitalizeFirstLetter = (string) => {
    return string
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Submissions</Text>
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
            {/* Displaying ID */}
            {Object.values(submission).map((value, subIndex) => (
              <Text key={subIndex} style={styles.tableCell}>
                {value}
              </Text>
            ))}
          </View>
        ))}
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Export to CSV" onPress={exportToCSV} />
        <Button title="Send CSV via Email" onPress={sendCSV} />
      </View>
    </ScrollView>
  );
};

export default SubmissionsScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  table: {
    width: screenWidth * 0.9,
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  tableHeaderCell: {
    flex: 1,
    fontWeight: "bold",
    padding: 10,
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCell: {
    flex: 1,
    padding: 10,
    textAlign: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});
