import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  Dimensions,
  Alert,
  FlatList,
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as MailComposer from 'expo-mail-composer';
import * as MediaLibrary from 'expo-media-library';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import * as Updates from 'expo-updates'; // Import Updates module

const screenWidth = Dimensions.get('window').width;

const SubmissionsScreen = ({ route }) => {
  const { submissions } = route.params;
  const [submissionsData, setSubmissionsData] = useState(submissions.reverse());
  const [submissionCount, setSubmissionCount] = useState(submissionsData.length);
  const [refreshKey, setRefreshKey] = useState(0); // State to force re-render

  useEffect(() => {
    fetchDataFromStorage(); // Fetch initial data from AsyncStorage
    scheduleEndOfMonthReminder(); // Schedule the end of month reminder
  }, []); // Empty dependency array to run only once on mount

  useEffect(() => {
    setSubmissionCount(submissionsData.length); // Update submission count whenever submissionsData changes
  }, [submissionsData]); // Dependency on submissionsData to trigger update

  const fetchDataFromStorage = async () => {
    try {
      const storedData = await AsyncStorage.getItem('submissions');
      if (storedData) {
        const parsedData = JSON.parse(storedData).reverse(); // Reverse the data here
        setSubmissionsData(parsedData);
        setSubmissionCount(parsedData.length);
      } else {
        setSubmissionsData([]);
        setSubmissionCount(0);
      }
    } catch (error) {
      console.error('Error fetching data from AsyncStorage:', error);
    }
  };

  const sortSubmissionsByDate = (data) => {
    return data.sort((a, b) => {
      const dateA = moment(a.date, 'dddd, Do MMMM YYYY');
      const dateB = moment(b.date, 'dddd, Do MMMM YYYY');
      return dateB.diff(dateA); // Use diff() method for comparison
    });
  };

  const deleteLastMonthSubmissions = async () => {
    const currentDate = moment();
    const lastMonth = currentDate.subtract(1, 'month').month();
    const lastMonthYear = currentDate.year();

    const updatedData = submissionsData.filter((entry) => {
      const entryDate = moment(entry.date, 'dddd, Do MMMM YYYY');
      return !(entryDate.month() === lastMonth && entryDate.year() === lastMonthYear);
    }).reverse(); // Reverse the updated data here

    if (updatedData.length < submissionsData.length) {
      try {
        // Update AsyncStorage with the filtered data
        await AsyncStorage.setItem('submissions', JSON.stringify(updatedData));
        const sortedData = sortSubmissionsByDate(updatedData); // Sort the updated data by date in descending order
        setSubmissionsData(sortedData);
        setSubmissionCount(sortedData.length);
        setRefreshKey((prevKey) => prevKey + 1); // Force re-render
        await Updates.reloadAsync();
      } catch (error) {
        console.error('Error updating AsyncStorage:', error);
        Alert.alert('Error', 'Failed to delete last month\'s submissions');
      }
    } else {
      Alert.alert('No Entry Found', 'There is no entry for last month.');
    }
  };

  const exportToCSV = async () => {
    if (!submissionsData || submissionsData.length === 0) {
      Alert.alert("Error", "No submissions available");
      return;
    }

    const csvString = convertToCSV(submissionsData);
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
    if (!submissionsData || submissionsData.length === 0) {
      Alert.alert("Error", "No submissions available");
      return;
    }

    const csvString = convertToCSV(submissionsData);
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
    if (!array || array.length === 0) return '';
    const header =
      'ID,' +
      Object.keys(array[0])
        .map((key) => capitalizeFirstLetter(key))
        .join(',') +
      '\n';
    const rows = array
      .map((obj, index) => `${index + 1},${Object.values(obj).join(',')}`)
      .join('\n');
    return header + rows;
  };

  const capitalizeFirstLetter = (string) => {
    return string
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase());
  };

  const renderItem = ({ item, index }) => (
    <View key={`${index}_${refreshKey}`} style={styles.tableRow}>
      <Text style={styles.tableCell}>{submissionsData.length - index}</Text>
      {Object.values(item).map((value, subIndex) => (
        <Text
          key={subIndex}
          style={[
            styles.tableCell,
            value.toLowerCase() === 'yes' ? styles.yesCell : null,
          ]}
        >
          {value}
        </Text>
      ))}
    </View>
  );

  const scheduleEndOfMonthReminder = () => {
    const now = moment();
    const endOfMonth = moment().endOf('month');
  
    // Check if there are submissions from last month
    const lastMonthEntries = submissionsData.filter((entry) => {
      const entryDate = moment(entry.date, 'dddd, Do MMMM YYYY');
      return entryDate.month() === now.subtract(1, 'month').month() && entryDate.year() === now.year();
    });
  
    // Only schedule the alert if there are entries from last month
    if (lastMonthEntries.length > 0) {
      // Calculate time until end of month in milliseconds
      const timeUntilEndOfMonth = endOfMonth.diff(now);
  
      // Schedule a timeout to remind at the end of the month
      setTimeout(() => {
        Alert.alert("Reminder", "It's the end of the month. Please send the CSV file via email and consider deleting previous records.");
      }, timeUntilEndOfMonth);
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.counterContainer}>
        <Text style={styles.counterText}>Total Submissions: {submissionCount}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Send CSV via Email" onPress={sendCSV} />
        <Button title="Delete Last Month's Submissions" onPress={deleteLastMonthSubmissions} />
      </View>
      <Text/>
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderCell}>ID</Text>
          {Object.keys(submissionsData[0] || {}).map((key, index) => (
            <Text key={index} style={styles.tableHeaderCell}>
              {capitalizeFirstLetter(key)}
            </Text>
          ))}
        </View>
        <FlatList
          data={submissionsData}
          keyExtractor={(item, index) => `${index}_${refreshKey}`}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 20 }} // Add padding to the bottom
        />
      </View>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5', // Light background for better readability
  },
  counterContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  counterText: {
    fontSize: 25,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20, // Added margin top for spacing
  },
  table: {
    flex: 1,
    width: screenWidth * 0.9,
    backgroundColor: '#fff', // White background for the table
    borderRadius: 10, // Rounded corners for the table
    overflow: 'hidden', // Ensure rounded
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
    backgroundColor: '#eaeaea', // Slightly darker header background
  },
  tableHeaderCell: {
    flex: 1,
    fontWeight: 'bold',
    padding: 5, // Increased padding for better touch targets
    textAlign: 'center',
    fontSize: 13, // Larger font size for better readability
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCell: {
    flex: 1,
    padding: 5, // Increased padding for better touch targets
    textAlign: 'center',
    fontSize: 16, // Larger font size for better readability
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  yesCell: {
    color: 'green', // Make "yes" text green
  },
});

export default SubmissionsScreen;
