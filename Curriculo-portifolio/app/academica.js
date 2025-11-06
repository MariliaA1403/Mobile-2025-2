import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { useRef, useEffect } from "react";

export default function ExperienciaAcademica() {
  const experiencias = [
    {
      curso: "Residência Tecnológica",
      instituicao: "FCxLabs - Home Center Ferreira Costa",
      periodo: "2025.1",
      descricao:
        "Aulas práticas e teóricas de SQL e PL/SQL ministradas por Umberto Marrone, DBA Sênior da Ferreira Costa.",
    },
    {
      curso: "Iniciação Científica - PIBIC",
      instituicao: "Universidade Católica de Pernambuco",
      periodo: "2024 - 2025",
      descricao:
        "Tema: Segmentação de Imagens Médicas com Deep Learning (Câncer de Pulmão).",
    },
    {
      curso: "Iniciação Científica - PIC",
      instituicao: "Centro Universitário Maurício de Nassau",
      periodo: "2024 - 2025",
      descricao:
        "Tema: Coleta e Preparação de Dados de Saneamento – Recife/PE.",
    },
    {
      curso: "Sistemas para Internet",
      instituicao: "Universidade Católica de Pernambuco (UNICAP)",
      periodo: "2024 - 2026",
      descricao:
        "Estudo focado em desenvolvimento de software, banco de dados, redes e engenharia de software.",
    },
    {
      curso: "Análise e Desenvolvimento de Sistemas",
      instituicao: "Centro Universitário Maurício de Nassau (UNINASSAU)",
      periodo: "2024 - 2025",
      descricao:
        "Estudo focado em desenvolvimento de software, mobile, redes e tecnologia em geral.",
    },
    {
      curso: "Curso Técnico em Redes de Computadores",
      instituicao: "Escola Técnica Estadual Professor Lucilo Ávila Pessoa",
      periodo: "2020 - 2022",
      descricao:
        "Aprendizado prático em configuração de redes, manutenção de hardware e banco de dados.",
    },
  ];

  const animatedValues = useRef(experiencias.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    const animations = animatedValues.map((anim, index) =>
      Animated.timing(anim, {
        toValue: 1,
        duration: 600,
        delay: index * 150, // efeito cascata
        useNativeDriver: true,
      })
    );
    Animated.stagger(100, animations).start();
  }, []);

  return (
    <View style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>🎓 Experiência Acadêmica</Text>

        {experiencias.map((item, index) => (
          <Animated.View
            key={index}
            style={{
              opacity: animatedValues[index],
              transform: [
                {
                  translateY: animatedValues[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [50, 0],
                  }),
                },
              ],
              width: "100%",
            }}
          >
            <LinearGradient
              colors={["#f96098ff", "#c74b46"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.card}
            >
              <Text style={styles.cardTitle}>{item.curso}</Text>
              <Text style={styles.cardSub}>{item.instituicao}</Text>
              <Text style={styles.cardPeriod}>{item.periodo}</Text>
              <Text style={styles.cardDesc}>{item.descricao}</Text>
            </LinearGradient>
          </Animated.View>
        ))}

        {/* Botão para voltar */}
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
    alignItems: "center",
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
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
  },
  cardSub: {
    fontSize: 16,
    color: "#ffe3e3",
    marginBottom: 4,
  },
  cardPeriod: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#fff",
    marginBottom: 8,
  },
  cardDesc: {
    fontSize: 15,
    color: "#fff",
    lineHeight: 22,
    textAlign: "justify",
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
