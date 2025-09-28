import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from "react-native";

// Lista de animais
const animais = [
  "ELEFANTE", "TIGRE", "LEAO", "GIRAFA", "CROCODILO",
  "HIPOPOTAMO", "URSO", "COALA", "PANDA", "LONTRA",
  "RAPOSA", "GORILA", "CANGURU", "CAVALO", "TARTARUGA",
  "ABELHA", "BORBOLETA", "PAVAO", "ZEBRA", "CAMELO",
  "PINGUIM", "FENNEC", "MACACO", "LEOPARDO", "ONCA",
  "JACARE", "RINOCERONTE", "HUMMINGBIRD", "TUBARAO", "PEIXE"
];

const maxTentativas = 6;
const alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function App() {
  const [palavra, setPalavra] = useState(animais[Math.floor(Math.random() * animais.length)]);
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
    const novaPalavra = animais[Math.floor(Math.random() * animais.length)];
    setPalavra(novaPalavra);
    setLetrasCorretas([]);
    setLetrasErradas([]);
    setTentativas(maxTentativas);
  };

  // Boneco simples com emojis de animais
  const desenharForca = () => {
    return (
      <View style={styles.forcaContainer}>
        <Text style={styles.forcaBase}>🪵</Text>
        {tentativas <= 5 && <Text style={styles.boneco}>😀</Text>}
        {tentativas <= 4 && <Text style={styles.boneco}>👕</Text>}
        {tentativas <= 3 && <Text style={styles.boneco}>✋</Text>}
        {tentativas <= 2 && <Text style={styles.boneco}>✋</Text>}
        {tentativas <= 1 && <Text style={styles.boneco}>👖</Text>}
        {tentativas <= 0 && <Text style={styles.boneco}>👟</Text>}
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Jogo da Forca 🐾 - Animais</Text>

      {desenharForca()}

      <Text style={styles.palavra}>{renderPalavra()}</Text>
      <Text style={styles.tentativas}>Tentativas restantes: {tentativas}</Text>

      <View style={styles.letrasContainer}>
        {alfabeto.map((l) => (
          <TouchableOpacity
            key={l}
            style={[
              styles.letraBotao,
              (letrasCorretas.includes(l) || letrasErradas.includes(l)) && styles.letraBotaoUsada
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

      {status === "vitória" && <Text style={styles.vitoria}>Parabéns! Você venceu! 🎉 Palavra: {palavra}</Text>}
      {status === "derrota" && <Text style={styles.derrota}>Fim de jogo! Palavra: {palavra}</Text>}

      <TouchableOpacity style={styles.botaoReiniciar} onPress={reiniciar}>
        <Text style={styles.textoBotao}>Reiniciar Jogo</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: "#e0f7fa" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20, color: "#00796b", textAlign: "center" },
  palavra: { fontSize: 28, letterSpacing: 4, marginVertical: 20 },
  tentativas: { fontSize: 18, marginBottom: 10 },
  letrasContainer: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center", marginVertical: 10 },
  letraBotao: { borderWidth: 1, borderColor: "#00796b", padding: 10, margin: 4, borderRadius: 4, width: 40, alignItems: "center", backgroundColor: "#b2dfdb" },
  letraBotaoUsada: { backgroundColor: "#80cbc4" },
  letraTexto: { fontSize: 18, fontWeight: "bold", color: "#004d40" },
  lista: { fontSize: 16, marginVertical: 5 },
  vitoria: { fontSize: 22, color: "green", marginTop: 20, fontWeight: "bold" },
  derrota: { fontSize: 22, color: "red", marginTop: 20, fontWeight: "bold" },
  botaoReiniciar: { backgroundColor: "#00796b", padding: 12, marginTop: 20, borderRadius: 5 },
  textoBotao: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  forcaContainer: { width: 200, height: 150, marginVertical: 20, alignItems: "center", justifyContent: "center" },
  forcaBase: { fontSize: 40 },
  boneco: { fontSize: 30 },
});
