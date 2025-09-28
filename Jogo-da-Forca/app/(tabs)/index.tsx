import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";

const palavras = [
  "ELEFANTE", "GIRAFA", "CANGURU", "TARTARUGA", "HIPOPOTAMO",
  "JACARE", "COALA", "PANDA", "PINGUIM", "CAMELO",
  "GORILA", "LEAO", "TIGRE", "ZEBRA", "RINOCERONTE"
];

const maxTentativas = 6;
const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function App() {
  const [palavra, setPalavra] = useState(palavras[Math.floor(Math.random() * palavras.length)]);
  const [letrasCorretas, setLetrasCorretas] = useState<string[]>([]);
  const [letrasErradas, setLetrasErradas] = useState<string[]>([]);
  const [tentativas, setTentativas] = useState(maxTentativas);

  const escolherLetra = (letra: string) => {
    if (letrasCorretas.includes(letra) || letrasErradas.includes(letra)) return;

    if (palavra.includes(letra)) {
      setLetrasCorretas([...letrasCorretas, letra]);
    } else {
      setLetrasErradas([...letrasErradas, letra]);
      setTentativas(tentativas - 1);
    }
  };

  const renderPalavra = () => {
    return palavra
      .split("")
      .map((l) => (letrasCorretas.includes(l) ? l : "_"))
      .join(" ");
  };

  const checarFim = () => {
    if (palavra.split("").every((l) => letrasCorretas.includes(l))) return "vitória";
    if (tentativas <= 0) return "derrota";
    return null;
  };

  const status = checarFim();

  const reiniciar = () => {
    const novaPalavra = palavras[Math.floor(Math.random() * palavras.length)];
    setPalavra(novaPalavra);
    setLetrasCorretas([]);
    setLetrasErradas([]);
    setTentativas(maxTentativas);
  };

  const desenharForca = () => (
    <View style={styles.forcaContainer}>
      <View style={[styles.bar, { height: 200, backgroundColor: "#444" }]} />
      <View style={[styles.bar, { width: 120, marginLeft: -1, backgroundColor: "#444" }]} />
      <View style={[styles.bar, { height: 40, marginLeft: 120, backgroundColor: "#444" }]} />
      {tentativas <= 5 && <View style={[styles.cabeca, { backgroundColor: "#e74c3c" }]} />}
      {tentativas <= 4 && <View style={[styles.corpo, { backgroundColor: "#e67e22" }]} />}
      {tentativas <= 3 && <View style={[styles.bracoEsq, { backgroundColor: "#f1c40f" }]} />}
      {tentativas <= 2 && <View style={[styles.bracoDir, { backgroundColor: "#f1c40f" }]} />}
      {tentativas <= 1 && <View style={[styles.pernaEsq, { backgroundColor: "#3498db" }]} />}
      {tentativas <= 0 && <View style={[styles.pernaDir, { backgroundColor: "#3498db" }]} />}
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Jogo da Forca 🐾</Text>

      {desenharForca()}

      <Text style={styles.palavra}>{renderPalavra()}</Text>
      <Text style={styles.tentativas}>Tentativas restantes: {tentativas}</Text>

      <View style={styles.letrasContainer}>
        {letras.map((l) => (
          <TouchableOpacity
            key={l}
            style={[
              styles.letraBotao,
              letrasCorretas.includes(l) && { backgroundColor: "#2ecc71" },
              letrasErradas.includes(l) && { backgroundColor: "#e74c3c" },
            ]}
            onPress={() => escolherLetra(l)}
            disabled={status !== null || letrasCorretas.includes(l) || letrasErradas.includes(l)}
          >
            <Text style={styles.letraTexto}>{l}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.lista}>Letras corretas: {letrasCorretas.join(", ")}</Text>
      <Text style={styles.lista}>Letras erradas: {letrasErradas.join(", ")}</Text>

      {status === "vitória" && <Text style={styles.vitoria}>🎉 Você venceu! 🎉</Text>}
      {status === "derrota" && <Text style={styles.derrota}>💀 Fim de jogo! Palavra: {palavra}</Text>}

      <TouchableOpacity style={styles.botaoReiniciar} onPress={reiniciar}>
        <Text style={styles.textoBotao}>Reiniciar 🌀</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: "#f5f6fa" },
  title: { fontSize: 34, fontWeight: "bold", marginBottom: 20, color: "#34495e" },
  palavra: { fontSize: 32, letterSpacing: 5, marginVertical: 20, color: "#2c3e50" },
  tentativas: { fontSize: 18, marginBottom: 10, color: "#34495e" },
  letrasContainer: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center", marginVertical: 10 },
  letraBotao: {
    borderWidth: 1,
    borderColor: "#34495e",
    padding: 12,
    margin: 4,
    borderRadius: 8,
    width: 45,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ecf0f1"
  },
  letraTexto: { fontSize: 18, fontWeight: "bold", color: "#2c3e50" },
  lista: { fontSize: 16, marginVertical: 5, color: "#34495e" },
  vitoria: { fontSize: 24, color: "#27ae60", marginTop: 20, fontWeight: "bold" },
  derrota: { fontSize: 24, color: "#c0392b", marginTop: 20, fontWeight: "bold" },
  botaoReiniciar: { backgroundColor: "#2980b9", padding: 12, marginTop: 20, borderRadius: 8 },
  textoBotao: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  forcaContainer: { alignItems: "flex-start", marginVertical: 20 },
  bar: { backgroundColor: "#333" },
  cabeca: { width: 40, height: 40, borderRadius: 20, position: "absolute", top: 40, left: 100 },
  corpo: { width: 10, height: 80, position: "absolute", top: 80, left: 118 },
  bracoEsq: { width: 60, height: 10, position: "absolute", top: 90, left: 60, transform: [{ rotate: "-45deg" }] },
  bracoDir: { width: 60, height: 10, position: "absolute", top: 90, left: 120, transform: [{ rotate: "45deg" }] },
  pernaEsq: { width: 60, height: 10, position: "absolute", top: 155, left: 60, transform: [{ rotate: "45deg" }] },
  pernaDir: { width: 60, height: 10, position: "absolute", top: 155, left: 118, transform: [{ rotate: "-45deg" }] },
});

