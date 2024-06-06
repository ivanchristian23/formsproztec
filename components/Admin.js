import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as MailComposer from 'expo-mail-composer';

const Admin = ({ route, navigation }) => {
  const { submissions } = route.params;
  console.log(submissions);

  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('admin123'); // This is a placeholder. In a real app, you should securely fetch and manage passwords.
  const [message, setMessage] = useState('');
  const [showChangePassword, setShowChangePassword] = useState(false);

  const handlePasswordSubmit = () => {
    if (password === currentPassword) {
      setMessage('Access granted');
      shareSubmissions();
    } else {
      setMessage('Access denied');
    }
  };

  const handleChangePassword = () => {
    if (password === currentPassword) {
      if (newPassword === confirmPassword) {
        setCurrentPassword(newPassword);
        setMessage('Password successfully changed');
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
      recipients: [], // Add the recipient's email here
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
            navigation.replace('Home')
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
    const header = Object.keys(array[0]).join(',') + '\n';
    const rows = array.map(obj => Object.values(obj).join(',')).join('\n');
    return header + rows;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Admin Access</Text>

      <Text style={styles.label}>Enter Password:</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Submit" onPress={handlePasswordSubmit} />

      <Button 
        title="Change Password"
        onPress={() => setShowChangePassword(!showChangePassword)}
        style={styles.changePasswordButton}
      />

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

          <Button title="Submit New Password" onPress={handleChangePassword} />
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
  changePasswordButton: {
    marginTop: 20,
  },
});
