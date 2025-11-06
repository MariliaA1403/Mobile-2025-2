import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { useRef, useEffect } from "react";

export default function Experiencias() {
  const cardsAnim = useRef([
    new Animated.Value(50),
    new Animated.Value(50),
    new Animated.Value(50)
  ]).current;

  const fadeAnim = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0)
  ]).current;

  useEffect(() => {
    cardsAnim.forEach((anim, index) => {
      Animated.parallel([
        Animated.timing(anim, {
          toValue: 0,
          duration: 600,
          delay: index * 200, // atraso para cada card
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim[index], {
          toValue: 1,
          duration: 600,
          delay: index * 200,
          useNativeDriver: true,
        }),
      ]).start();
    });
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>💼 Experiências Profissionais</Text>

      {[
        {
          logo: require("../assets/images/visionone_logo.png"),
          cargo: "Estagiária de Infraestrutura",
          empresa: "VisionOne",
          periodo: "Novembro de 2025 – Atualmente",
          descricao:
            "Atuo no atendimento e suporte aos colaboradores, manutenção e configuração de equipamentos de rede e computadores. Também realizo instalação de softwares, formatação de máquinas e integração de dispositivos aos serviços corporativos, como domínio, OneDrive e SharePoint."
        },
        {
          logo: require("../assets/images/visionone_logo.png"),
          cargo: "Jovem Aprendiz de Infraestrutura",
          empresa: "VisionOne",
          periodo: "Setembro de 2025 – Outubro de 2025",
          descricao:
            "Atuava no atendimento e suporte aos colaboradores, instalação de softwares, formatação de máquinas e integração de dispositivos aos serviços corporativos, como domínio, OneDrive e SharePoint, além de apoio em tarefas administrativas do setor."
        },
        {
          logo: require("../assets/images/sda_logo.png"),
          cargo: "Estagiária de Suporte Técnico",
          empresa: "Secretaria de Desenvolvimento Agrário de Pernambuco",
          periodo: "Outubro de 2024 – Setembro de 2025",
          descricao:
            "Responsável por auxiliar na manutenção dos sistemas e infraestrutura tecnológica, prestando suporte técnico aos usuários e contribuindo para o bom funcionamento dos equipamentos e redes da Secretaria."
        }
      ].map((item, index) => (
        <Animated.View
          key={index}
          style={{ transform: [{ translateY: cardsAnim[index] }], opacity: fadeAnim[index], marginBottom: 10 }}
        >
          <LinearGradient
            colors={["#f96098ff", "#c74b46"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.card}
          >
            <Image source={item.logo} style={styles.logo} />
            <Text style={styles.cargo}>{item.cargo}</Text>
            <Text style={styles.empresa}>{item.empresa}</Text>
            <Text style={styles.periodo}>{item.periodo}</Text>
            <Text style={styles.descricao}>{item.descricao}</Text>
          </LinearGradient>
        </Animated.View>
      ))}

      {/* BOTÃO DE VOLTAR */}
      <Link href="/" asChild>
        <TouchableOpacity style={styles.botaoVoltar} activeOpacity={0.8}>
          <Text style={styles.textoVoltar}>⬅ Voltar ao Início</Text>
        </TouchableOpacity>
      </Link>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 40, backgroundColor: "#fff" },
  title: { fontSize: 26, fontWeight: "bold", color: "#c74b46", textAlign: "center", marginBottom: 20 },
  card: {
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  logo: { width: 100, height: 100, alignSelf: "center", marginBottom: 10, borderRadius: 100, backgroundColor: "#fff" },
  cargo: { fontSize: 20, fontWeight: "bold", color: "#fff", textAlign: "center" },
  empresa: { fontSize: 16, color: "#fce8e8", textAlign: "center", marginBottom: 5 },
  periodo: { fontSize: 14, color: "#fff", textAlign: "center", marginBottom: 10 },
  descricao: { fontSize: 15, color: "#fff", lineHeight: 22, textAlign: "justify" },
  botaoVoltar: { backgroundColor: "#c74b46", padding: 15, borderRadius: 30, alignSelf: "center", marginTop: 20 },
  textoVoltar: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
