import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Button, Alert } from 'react-native';
import { BarChart, PieChart } from 'react-native-chart-kit';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import * as FileSystem from 'expo-file-system';
import * as MailComposer from 'expo-mail-composer';

const screenWidth = Dimensions.get('window').width;

const DashboardScreen = ({ route }) => {
  const { submissions } = route.params;

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [filteredSubmissions, setFilteredSubmissions] = useState([]);

  useEffect(() => {
    filterSubmissions();
  }, [startDate, endDate, submissions]);

  const filterSubmissions = () => {
    const filtered = submissions.filter((s) => {
      const parsedDate = moment(s.date, "Do MMMM YYYY", true);
      return parsedDate.isValid() &&
             parsedDate.isSameOrAfter(moment(startDate), 'day') &&
             parsedDate.isSameOrBefore(moment(endDate), 'day');
    });
    setFilteredSubmissions(filtered);
  };


  const sendCSV = async () => {
  const startStr = moment(startDate).format('YYYY-MM-DD');
  const endStr = moment(endDate).format('YYYY-MM-DD');
  if (!filteredSubmissions.length) {
    Alert.alert("No Data", "No submissions in the selected date range.");
    return;
  }

  // 1. Prepare submissions section
  let csvString = `Date,First Name,Last Name,Email,Phone,Gender,Nationality,Residency Status,Purpose of Visiting,Favourite Language,Kind of Visiting,Remarks,Newsletter Subscribed\n`;
  filteredSubmissions.forEach(s => {
    csvString += `"${s.date}","${s.firstName}","${s.lastName}","${s.email}","${s.phone === "" ? "" : "+" + s.phone}","${s.gender}","${s.nationality}","${s.residencyStatus}","${s.purposeOfVisiting}","${s.favouriteLanguage}","${s.kindOfVisiting}","${s.remarks}","${s.newsletterSubscribed === true ? "Yes" : "No"}"\n`;
  });

  // 2. Mosque name
  csvString += `\nMosque Name,"Abdullah Bin Zaid Al Mahmoud Islamic Cultural Center"\n`;

  // 3. Report period
  csvString += `Report Period,From ${startStr} To ${endStr}\n\n`;

  // 4. Total registrations
  csvString += `Total Registrations,${filteredSubmissions.length}\n`;

  // 5. Aggregated data
  csvString += `\nNationality,Count\n`;
  Object.entries(nationalityCounts).forEach(([key, value]) => {
    csvString += `${key},${value}\n`;
  });

  csvString += `\nGender,Count\n`;
  Object.entries(genderCounts).forEach(([key, value]) => {
    csvString += `${key},${value}\n`;
  });

  csvString += `\nResidency Status,Count\n`;
  Object.entries(residencyCounts).forEach(([key, value]) => {
    csvString += `${key},${value}\n`;
  });

  // Write CSV to file
  const fileUri = `${FileSystem.cacheDirectory}report_${startStr}_to_${endStr}.csv`;

  try {
    await FileSystem.writeAsStringAsync(fileUri, csvString);
  } catch (error) {
    console.error("Error writing CSV:", error);
    return;
  }


  // Send via email
  const options = {
    recipients: ["abdullabin2025@gmail.com"],
    subject: "Dashboard Report",
    body: `Please find attached the dashboard report from ${moment(startDate).format('YYYY-MM-DD')} to ${moment(endDate).format('YYYY-MM-DD')}.`,
    attachments: [fileUri],
  };

  const isAvailable = await MailComposer.isAvailableAsync();
  if (isAvailable) {
    MailComposer.composeAsync(options);
  } else {
    Alert.alert("Error", "Email service is not available");
  }
};

  const nationalityCounts = filteredSubmissions.reduce((acc, curr) => {
    acc[curr.nationality] = (acc[curr.nationality] || 0) + 1;
    return acc;
  }, {});
  const genderCounts = filteredSubmissions.reduce((acc, curr) => {
    acc[curr.gender] = (acc[curr.gender] || 0) + 1;
    return acc;
  }, {});
  const residencyCounts = filteredSubmissions.reduce((acc, curr) => {
    acc[curr.residencyStatus] = (acc[curr.residencyStatus] || 0) + 1;
    return acc;
  }, {});

  const barChartData = { labels: Object.keys(nationalityCounts), datasets: [{ data: Object.values(nationalityCounts) }] };
  const residencyData = { labels: Object.keys(residencyCounts), datasets: [{ data: Object.values(residencyCounts) }] };
  const pieChartData = Object.entries(genderCounts).map(([key, value], index) => ({
    name: key,
    population: value,
    color: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'][index % 4],
    legendFontColor: '#333',
    legendFontSize: 14,
  }));

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Registration Dashboard</Text>

      {/* Date Filters */}
      <View style={styles.dateContainer}>
        <Button title={`From: ${moment(startDate).format('YYYY-MM-DD')}`} onPress={() => setShowStartPicker(true)} />
        <Button title={`To: ${moment(endDate).format('YYYY-MM-DD')}`} onPress={() => setShowEndPicker(true)} />
      </View>
      {showStartPicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="default"
          onChange={(e, date) => {
            setShowStartPicker(false);
            if (date) setStartDate(date);
          }}
        />
      )}
      {showEndPicker && (
        <DateTimePicker
          value={endDate}
          mode="date"
          display="default"
          onChange={(e, date) => {
            setShowEndPicker(false);
            if (date) setEndDate(date);
          }}
        />
      )}

      <View style={styles.metricCard}>
        <Text style={styles.metricLabel}>Total Registrations</Text>
        <Text style={styles.metricValue}>{filteredSubmissions.length}</Text>
      </View>


      <Button title="Send CSV via Email" onPress={sendCSV} />

      <Text style={styles.chartTitle}>Nationality Distribution</Text>
      <BarChart data={barChartData} width={screenWidth - 32} height={240} chartConfig={chartConfig} fromZero showValuesOnTopOfBars style={styles.chart} />

      <Text style={styles.chartTitle}>Gender Distribution</Text>
      <PieChart data={pieChartData} width={screenWidth - 32} height={240} chartConfig={chartConfig} accessor="population" backgroundColor="transparent" absolute style={styles.chart} />

      <Text style={styles.chartTitle}>Residency Status</Text>
      <BarChart data={residencyData} width={screenWidth - 32} height={240} chartConfig={chartConfig} fromZero showValuesOnTopOfBars style={styles.chart} />
    </ScrollView>
  );
};

const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  propsForBackgroundLines: { strokeDasharray: '', strokeWidth: 1, stroke: '#e0e0e0' },
  propsForLabels: { fontSize: 12 },
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f1f6f9' },
  header: { fontSize: 26, fontWeight: '700', marginBottom: 20, textAlign: 'center', color: '#0a3d62' },
  metricCard: { backgroundColor: '#fff', borderRadius: 12, padding: 20, marginBottom: 20, elevation: 3 },
  metricLabel: { fontSize: 16, color: '#7f8c8d', marginBottom: 4 },
  metricValue: { fontSize: 32, fontWeight: 'bold', color: '#2d98da' },
  chartTitle: { fontSize: 18, fontWeight: '600', marginVertical: 10, color: '#34495e' },
  chart: { marginVertical: 8, borderRadius: 12 },
  dateContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }
});

export default DashboardScreen;
