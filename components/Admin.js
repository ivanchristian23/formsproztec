import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';

const Admin = ({route,navigation}) => {
    const { submissions } = route.params;
    console.log(submissions);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('admin123'); // This is a placeholder. In a real app, you should securely fetch and manage passwords.
  const [message, setMessage] = useState('');

  const handlePasswordSubmit = () => {
    if (password === currentPassword) {
      setMessage('Access granted');
      // Navigate to admin panel or perform admin actions
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

      <Button title="Change Password" onPress={handleChangePassword} />

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
});
