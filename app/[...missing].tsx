import { Link, Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Tela nao encontrada!' }} />
      <View style={styles.container}>
        <Text style={styles.title}>Esta tela nao foi encontrada, por favor vá para a home.</Text>

        <Link href="/(tabs)/addProduct" style={styles.link}>
          <Text style={styles.linkText}>Vá para a home para acessar o app!</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
