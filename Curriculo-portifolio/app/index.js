import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Animated } from "react-native";
import { Link } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef } from "react";

export default function Home() {
  const fadeAnim = useRef(new Animated.Value(0)).current; 
  const imageAnim = useRef(new Animated.Value(0)).current; 

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // Animação de "bouncing" da imagem
    Animated.loop(
      Animated.sequence([
        Animated.timing(imageAnim, { toValue: -10, duration: 800, useNativeDriver: true }),
        Animated.timing(imageAnim, { toValue: 10, duration: 800, useNativeDriver: true }),
        Animated.timing(imageAnim, { toValue: 0, duration: 800, useNativeDriver: true }),
      ])
    ).start();
  }, []);

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
            Aqui você pode conhecer melhor! Minhas experiências, projetos e muito mais!{"\n"}
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
    backgroundColor: "#ffff",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 2, height: 4 },
    width: "85%",
    transform: [{ scale: 1 }],
  },
  buttonText: {
    color: "#ed6381ff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    textShadowColor: "rgba(0,0,0,0.2)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});
