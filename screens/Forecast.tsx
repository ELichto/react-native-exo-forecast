import { useWeather } from "../hooks/useWeather";
import { useState } from "react";
import { View, StyleSheet, FlatList, RefreshControl, } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  Text,
  Appbar,
  Surface,
  ActivityIndicator,
  useTheme,
} from 'react-native-paper';
import { useNetInfo } from "@react-native-community/netinfo";
import WeatherItem from "../components/WeatherItem";

export default function Forecast() {
  const { data, isPending, isError, refetch, error } = useWeather();
  const [isRefreshing, setRefreshing] = useState(false);
  const { isInternetReachable } = useNetInfo();
  const theme = useTheme();

  const onRefresh = async () => {
    console.log('internet', isInternetReachable)
    if (isInternetReachable) {
      setRefreshing(true);
      await refetch();
      setRefreshing(false);
    }
  };

  if (isPending) {
    return (
      <Surface style={styles.centered}>
        <ActivityIndicator animating={true} size="large" color={theme.colors.primary} />
        <Text style={styles.loadingText}>Chargement des données météo...</Text>
      </Surface>
    )
  }
  if (isError) {
    return (
      <Surface style={styles.centered}>
        <MaterialIcons name="error" color={'#cc0000'} size={50} />
        <Text style={styles.errorSubtext}>Une erreur est survenue: {error?.message}</Text>
      </Surface>)
  }
  return (
    <View style={{ ...styles.container, backgroundColor: theme.colors.background }}>
      <Appbar.Header>
        <Appbar.Content title="Prévisions Météo" />
        <Appbar.Action icon="refresh" onPress={onRefresh} />
      </Appbar.Header>
      <FlatList
        data={data}
        keyExtractor={(item) => item.startTime}
        renderItem={({ item }) => <WeatherItem item={item} />}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            colors={[theme.colors.primary]}
          />
        }
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  listContainer: {
    padding: 8,
  },
  weatherChip: {
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  weatherDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    elevation: 0,
  },
  weatherDetail: {
    alignItems: 'center',
    flex: 1,
    paddingVertical: 8,
    backgroundColor: 'transparent',
    elevation: 0,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  errorSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 16,
  },
});

