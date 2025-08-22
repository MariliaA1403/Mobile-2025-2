import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Profile = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/foto.jpeg')}  
        style={styles.image}
      />
      <Text style={styles.name}> Marília Albuquerque </Text>
      <Text style={styles.bio}>
         Sou apaixonada por tecnologia e sempre estou buscando aprender algo novo. Já tenho experiência profissional como estagiária de suporte tecnico e irei ingressar
          como aprendiz de infraestrutura. Ansiosa para essa nova etapa!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  bio: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
});

export default Profile;
