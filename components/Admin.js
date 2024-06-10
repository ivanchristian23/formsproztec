import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as MailComposer from 'expo-mail-composer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as MediaLibrary from 'expo-media-library';

const Admin = ({ route, navigation }) => {
  const { submissions } = route.params;
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showChangePassword, setShowChangePassword] = useState(false);

  useEffect(() => {
    const getPassword = async () => {
      const savedPassword = await AsyncStorage.getItem('adminPassword');
      if (savedPassword) {
        setCurrentPassword(savedPassword);
      } else {
        setCurrentPassword('Admin123'); // Default password
      }
    };

    getPassword();
  }, []);

  const handlePasswordSubmit = () => {
    if (password === currentPassword) {
      if (!submissions || submissions.length === 0) {
        Alert.alert('Error', 'No submissions available');
        setPassword('');
        return;
      }
      // setMessage('Access granted');
      setPassword("")

      navigation.navigate('SubmissionsScreen', { submissions }); 
      // shareSubmissions();
    } else {
      setMessage('Access denied');
    }
  };

  const handleChangePassword = async () => {
    if (password === currentPassword) {
      if (newPassword === confirmPassword) {
        await AsyncStorage.setItem('adminPassword', newPassword);
        setCurrentPassword(newPassword);
        setMessage('Password successfully changed');
        setShowChangePassword(!showChangePassword);
        setPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setMessage('New passwords do not match');
      }
    } else {
      setMessage('Current password is incorrect');
    }
  };

  const shareSubmissions = async () => {
    // Convert submissions to CSV format
    const csvString = convertToCSV(submissions);

    // Create a file with the CSV data
    const fileUri = `${FileSystem.cacheDirectory}submissions.csv`;
    await FileSystem.writeAsStringAsync(fileUri, csvString);

    // Share the CSV file via email
    const options = {
      recipients: ['abdullabin2024@gmail.com'], // Add the recipient's email here
      subject: 'Submissions CSV',
      body: 'Please find the submissions attached as a CSV file.',
      attachments: [fileUri],
    };

    const isAvailable = await MailComposer.isAvailableAsync();
    if (isAvailable) {
      MailComposer.composeAsync(options)
        .then(result => {
          if (result.status === MailComposer.MailComposerStatus.SENT) {
            Alert.alert('Success', 'Email sent successfully');
            // navigation.replace('Home');
          } else {
            Alert.alert('Error', 'Failed to send email');
          }
        })
        .catch(error => {
          console.error(error);
          Alert.alert('Error', 'An error occurred while sending email');
        });
    } else {
      Alert.alert('Error', 'Email service is not available');
    }
  };

  const convertToCSV = (array) => {
    if (!array || array.length === 0) return '';
  
    const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);
  
    const header = Object.keys(array[0])
      .map(key => capitalizeFirstLetter(key))
      .join(',') + '\n';
  
    const rows = array.map(obj => Object.values(obj).join(',')).join('\n');
    return header + rows;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Admin Access</Text>

      {!showChangePassword && (
        <>
          <Text style={styles.label}>Enter Password:</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <View style={styles.buttonContainer}>
            <Button title="Export Submissions To CSV" onPress={handlePasswordSubmit} />
          </View>
          {/* <View style={styles.buttonContainer}>
            <Button title="Save CSV to Downloads" onPress={saveCsvToDownloads} />
          </View> */}
        </>
      )}

      <View style={styles.buttonContainer}>
        <Button 
          title={showChangePassword ? "Log in" : "Change Password"}
          onPress={() => setShowChangePassword(!showChangePassword)}
        />
      </View>

      {showChangePassword && (
        <>
          <Text style={styles.header}>Change Password</Text>

          <Text style={styles.label}>Current Password:</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          
          <Text style={styles.label}>New Password:</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
          />

          <Text style={styles.label}>Confirm New Password:</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <View style={styles.buttonContainer}>
            <Button title="Submit New Password" onPress={handleChangePassword} />
          </View>
        </>
      )}

      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
};

export default Admin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    width: '80%',
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  message: {
    marginTop: 20,
    fontSize: 16,
    color: 'red',
  },
  buttonContainer: {
    marginBottom: 20,
  },
});
