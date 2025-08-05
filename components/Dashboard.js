import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { BarChart, PieChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const DashboardScreen = ({ route }) => {
  const { submissions } = route.params;

  const registrationCount = submissions.length;

  const nationalityCounts = submissions.reduce((acc, curr) => {
    acc[curr.nationality] = (acc[curr.nationality] || 0) + 1;
    return acc;
  }, {});

  const genderCounts = submissions.reduce((acc, curr) => {
    acc[curr.gender] = (acc[curr.gender] || 0) + 1;
    return acc;
  }, {});

  const residencyCounts = submissions.reduce((acc, curr) => {
    acc[curr.residencyStatus] = (acc[curr.residencyStatus] || 0) + 1;
    return acc;
  }, {});

  const barChartData = {
    labels: Object.keys(nationalityCounts),
    datasets: [{ data: Object.values(nationalityCounts) }],
  };

  const residencyData = {
    labels: Object.keys(residencyCounts),
    datasets: [{ data: Object.values(residencyCounts) }],
  };

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
      <View style={styles.metricCard}>
        <Text style={styles.metricLabel}>Total Registrations</Text>
        <Text style={styles.metricValue}>{registrationCount}</Text>
      </View>

      <Text style={styles.chartTitle}> Nationality Distribution</Text>
      <BarChart
        data={barChartData}
        width={screenWidth - 32}
        height={240}
        yAxisLabel=""
        chartConfig={chartConfig}
        fromZero
        showValuesOnTopOfBars
        style={styles.chart}
      />

      <Text style={styles.chartTitle}>Gender Distribution</Text>
      <PieChart
        data={pieChartData}
        width={screenWidth - 32}
        height={240}
        chartConfig={chartConfig}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
        style={styles.chart}
      />

      <Text style={styles.chartTitle}>Residency Status</Text>
      <BarChart
        data={residencyData}
        width={screenWidth - 32}
        height={240}
        yAxisLabel=""
        chartConfig={chartConfig}
        verticalLabelRotation={0}
        fromZero
        showValuesOnTopOfBars
        style={styles.chart}
      />
    </ScrollView>
  );
};

const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  propsForBackgroundLines: {
    strokeDasharray: '', // solid lines
    strokeWidth: 1,
    stroke: '#e0e0e0',
  },
  propsForLabels: {
    fontSize: 12,
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f1f6f9',
  },
  header: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
    color: '#0a3d62',
  },
  metricCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  metricLabel: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2d98da',
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
    color: '#34495e',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 12,
  },
});

export default DashboardScreen;
