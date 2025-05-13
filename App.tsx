import { QueryClient, QueryClientProvider, onlineManager } from '@tanstack/react-query';
import { PaperProvider, DefaultTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { persistQueryClient, PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'
import NetInfo from '@react-native-community/netinfo';
import Forecast from './screens/Forecast';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 60 * 24,
    },
  },
});

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#1976D2',
    accent: '#03A9F4',
    background: '#f5f7fa',
    surface: '#FFFFFF',
  },
};

const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage,
})
onlineManager.setEventListener(setOnline => {
  return NetInfo.addEventListener(state => setOnline(!!state.isInternetReachable));
})

function App(): React.JSX.Element {
  return (<PersistQueryClientProvider client={queryClient}
    persistOptions={{ persister: asyncStoragePersister }}
  >
    <PaperProvider theme={theme}>
      <Forecast />
    </PaperProvider>
  </PersistQueryClientProvider>)
}

export default App;
