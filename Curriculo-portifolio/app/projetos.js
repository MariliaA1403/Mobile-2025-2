import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { useEffect, useRef } from "react";

export default function ProjetosDesenvolvidos() {
  const projetos = [
    {
      nome: 'Conversores',
      descricao: 'Projeto de conversores desenvolvido no curso, publicado no Vercel.',
      url: 'https://pfe-2025-1-conversores.vercel.app/?classId=89eeb333-a901-449f-8426-7077ff260c56&assignmentId=085640c6-b7ee-4c57-9040-0ead7e0453c0&submissionId=12330bb4-297d-922a-bc65-6eb583dd7f13'
    },
    {
      nome: 'Jogo de Dados',
      descricao: 'Um divertido jogo de dados criado para prática e aprendizado.',
      url: 'https://pfe-2025-1-jogo-dados.vercel.app/?classId=89eeb333-a901-449f-8426-7077ff260c56&assignmentId=3d95c39d-ab04-47b2-aa87-381d2a099a94&submissionId=32a6f307-d63e-ec99-a4a3-c632edfee070'
    }
  ];

  // refs de animação para cada card
  const animatedValues = useRef(projetos.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    // animação em sequência
    const animations = projetos.map((_, index) =>
      Animated.timing(animatedValues[index], {
        toValue: 1,
        duration: 600,
        delay: index * 200, // cada card entra com um pequeno atraso
        useNativeDriver: true,
      })
    );
    Animated.stagger(150, animations).start();
  }, []);

  return (
    <View style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>💻 Projetos Desenvolvidos</Text>

        {projetos.map((projeto, index) => (
          <Animated.View
            key={index}
            style={{
              opacity: animatedValues[index],
              transform: [
                {
                  translateY: animatedValues[index].interpolate({
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
              <Text style={styles.nome}>{projeto.nome}</Text>
              <Text style={styles.descricao}>{projeto.descricao}</Text>
              <TouchableOpacity
                onPress={() => Linking.openURL(projeto.url)}
                style={styles.botaoProjeto}
              >
                <Text style={styles.textoBotao}>Ver Projeto Online</Text>
              </TouchableOpacity>
            </LinearGradient>
          </Animated.View>
        ))}

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
    backgroundColor: "#fff",
  },
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#c74b46",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  nome: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 5,
  },
  descricao: {
    fontSize: 15,
    color: "#fff",
    textAlign: "justify",
    marginBottom: 15,
  },
  botaoProjeto: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 25,
    alignSelf: "center",
  },
  textoBotao: {
    color: "#c74b46",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
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
