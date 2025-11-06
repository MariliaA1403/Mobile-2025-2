import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { useEffect, useRef } from "react";

export default function Sobre() {
  const animatedCard = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedCard, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>💡 Sobre o App</Text>

        {/* CARD COM DEGRADE */}
        <Animated.View
          style={{
            opacity: animatedCard,
            transform: [
              {
                translateY: animatedCard.interpolate({
                  inputRange: [0, 1],
                  outputRange: [50, 0], // sobe 50px ao aparecer
                }),
              },
            ],
          }}
        >
          <LinearGradient
            colors={["#f96098ff", "#c74b46"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.card}
          >
            <Text style={styles.text}>
              Este aplicativo foi desenvolvido com{" "}
              <Text style={styles.highlight}>React Native</Text> e{" "}
              <Text style={styles.highlight}>Expo Router</Text>.
            </Text>

            <Text style={styles.text}>
              <Text style={styles.bold}>Tecnologias utilizadas:</Text> React Native, Expo Router, JavaScript e componentes estilizados.
            </Text>

            <Text style={styles.text}>
              <Text style={styles.bold}>Funcionalidade extra:</Text> alternância entre tema claro e escuro 🌙☀️.
            </Text>

            <Text style={styles.text}>
              <Text style={styles.bold}>Objetivo do App:</Text> criar um portfólio interativo, visualmente agradável e funcional, para apresentar minhas experiências profissionais, acadêmicas e projetos pessoais.
            </Text>

            <Text style={styles.text}>
              <Text style={styles.bold}>Versão do App:</Text> 1.0.0
            </Text>
          </LinearGradient>
        </Animated.View>

        {/* BOTÃO DE VOLTAR */}
        <Link href="/" asChild>
          <TouchableOpacity style={styles.botaoVoltar}>
            <Text style={styles.textoVoltar}>⬅ Voltar ao Início</Text>
          </TouchableOpacity>
        </Link>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#fff", // fundo branco
  },
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#c74b46",
    textAlign: "center",
  },
  card: {
    borderRadius: 15,
    padding: 20,
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: "#fff", // texto branco dentro do card degradê
    lineHeight: 22,
    textAlign: "justify",
    marginBottom: 10,
  },
  bold: {
    fontWeight: "bold",
    color: "#fff",
  },
  highlight: {
    color: "#fce8e8", // destaque rosa claro
    fontWeight: "600",
  },
  botaoVoltar: {
    backgroundColor: "#c74b46",
    padding: 15,
    borderRadius: 30,
    alignSelf: "center",
    marginTop: 10,
  },
  textoVoltar: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
