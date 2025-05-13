import { formatDateTime } from "../utils/formatDate";
import { View, StyleSheet, FlatList, RefreshControl, } from "react-native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import {
  Provider as PaperProvider,
  Card,
  Title,
  Text,
} from 'react-native-paper';

const WeatherItem = ({ item }) => {
  const { time, date } = formatDateTime(item.startTime);
  return (
    <Card style={styles.card} elevation={3}>
      <Card.Content >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <FontAwesome5 solid name="clock" size={22} color={'#32BC9B'} />
            <Title style={styles.time}>{time}</Title>
          </View>
          <View style={styles.weatherDetailRow}>
            <Feather name="wind" size={22} color="#2a9d8f" style={styles.icon} />
            <View >
              <Text style={styles.value}>{item.values.windSpeed.toFixed(1)} km/h</Text>
            </View>
          </View>
          <View>
            <Text style={styles.temp}>{item.values.temperature.toFixed(1)}°F</Text>
            <Text style={styles.tempApparent}>Ressenti {item.values.temperatureApparent.toFixed(1)}°F</Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  time: {
    paddingLeft: 5,
    fontSize: 15,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 14,
    color: '#777',
    marginBottom: 8,
  },
  divider: {
    marginVertical: 8,
  },
  weatherDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 12,
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
  },
  label: {
    fontSize: 12,
    color: '#888',
  },
  temp: {
    color: '#FF784B',
    fontSize: 14,
    fontWeight: 'bold'
  },
  tempApparent: {
    color: "#979797",
    fontSize: 12,
    fontWeight: 'regular'
  }
});

export default WeatherItem;
