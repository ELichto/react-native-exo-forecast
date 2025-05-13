Je n’avais pas vu au départ qu’il fallait valider chaque action par un commit, donc je vais détailler ici:

Pour la state management, j’ai utilisé React Query, qui propose une solution simple pour récupérer les données depuis le serveur, gérer le refetch, les états de chargement et d’erreur, ainsi que l’utilisation du cache.

Pour l’interface utilisateur, j’ai utilisé React Native Paper, accompagné des icônes de react-native-vector-icons.

L’affichage des données est fait via le composant FlatList, qui permet notamment le pull-to-refresh.

J’ai aussi intégré React Query avec AsyncStorage afin de permettre l’affichage des données même en mode hors ligne.