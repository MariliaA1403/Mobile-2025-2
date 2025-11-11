import React, { useEffect, useRef, useState } from "react";
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  Image, 
  Animated, 
  Share 
} from "react-native";
import { Link } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function Home() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const imageAnim = useRef(new Animated.Value(0)).current;
  const [frase, setFrase] = useState("");

  const frases = [
    "Nunca pare de aprender!",
    "A tecnologia move o mundo.",
    "Seu código vale ouro.",
    "Você está indo muito bem.",
    "Cada bug resolvido é uma vitória.",
    "Confie no seu processo.",
  ];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(imageAnim, { toValue: -10, duration: 800, useNativeDriver: true }),
        Animated.timing(imageAnim, { toValue: 10, duration: 800, useNativeDriver: true }),
        Animated.timing(imageAnim, { toValue: 0, duration: 800, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  
  const handleShare = async () => {
    try {
      await Share.share({
        message:
          "Confira meu portfólio completo desenvolvido em React Native com Expo!\n\nAcesse: https://meuportfolio.expo.dev",
      });
    } catch (error) {
      alert("Ocorreu um erro ao tentar compartilhar.");
    }
  };

  
  const gerarFrase = () => {
    const aleatoria = frases[Math.floor(Math.random() * frases.length)];
    setFrase(aleatoria);
  };

  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

  return (
    <LinearGradient
      colors={["#f96098ff", "#c74b46"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
        <ScrollView contentContainerStyle={styles.container}>
          <Animated.Image
            source={require("../assets/images/foto_perfil.jpeg")}
            style={[styles.image, { transform: [{ translateY: imageAnim }] }]}
          />

          <Text style={styles.title}>Bem-vindo(a) ao meu Portfólio!</Text>

          <Text style={styles.subtitle}>
            Sou <Text style={styles.highlight}>Marília Albuquerque de Lima Ribeiro</Text>,{"\n"}
            dona desse site e fico muito feliz com a sua visita!{"\n\n"}
            Aqui você pode conhecer melhor minhas experiências, projetos e muito mais!{"\n"}
          </Text>

          <View style={styles.buttonsContainer}>
            <Link href="/profissional" asChild>
              <AnimatedTouchable style={styles.button} activeOpacity={0.8}>
                <Text style={styles.buttonText}>Minha Experiência Profissional</Text>
              </AnimatedTouchable>
            </Link>

            <Link href="/academica" asChild>
              <AnimatedTouchable style={styles.button} activeOpacity={0.8}>
                <Text style={styles.buttonText}>Minha Experiência Acadêmica</Text>
              </AnimatedTouchable>
            </Link>

            <Link href="/projetos" asChild>
              <AnimatedTouchable style={styles.button} activeOpacity={0.8}>
                <Text style={styles.buttonText}>Meus Projetos</Text>
              </AnimatedTouchable>
            </Link>

            <Link href="/sobre" asChild>
              <AnimatedTouchable style={styles.button} activeOpacity={0.8}>
                <Text style={styles.buttonText}>Sobre</Text>
              </AnimatedTouchable>
            </Link>

            
            <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
              <Text style={styles.shareText}>Compartilhar meu Portfólio</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.extraButton} onPress={gerarFrase}>
              <Text style={styles.extraText}>Mensagens para Devs</Text>
            </TouchableOpacity>

            {frase ? <Text style={styles.frase}>{frase}</Text> : null}
          </View>
        </ScrollView>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  image: {
    width: 160,
    height: 160,
    borderRadius: 80,
    marginBottom: 25,
    borderWidth: 4,
    borderColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 8,
    shadowOffset: { width: 2, height: 4 },
    elevation: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
    textShadowColor: "rgba(0,0,0,0.4)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#f8f8f8",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 40,
  },
  highlight: {
    color: "#fff",
    fontWeight: "bold",
  },
  buttonsContainer: {
    width: "100%",
    alignItems: "center",
    gap: 15,
  },
  button: {
    backgroundColor: "#fff",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 2, height: 4 },
    width: "85%",
  },
  buttonText: {
    color: "#ed6381ff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  shareButton: {
    marginTop: 20,
    backgroundColor: "#fff",
    paddingVertical: 14,
    borderRadius: 12,
    width: "85%",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 2, height: 4 },
  },
  shareText: {
    color: "#c74b46",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  extraButton: {
    marginTop: 20,
    backgroundColor: "#fff",
    paddingVertical: 14,
    borderRadius: 12,
    width: "85%",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 2, height: 4 },
  },
  extraText: {
    color: "#c74b46",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  frase: {
    marginTop: 15,
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});
