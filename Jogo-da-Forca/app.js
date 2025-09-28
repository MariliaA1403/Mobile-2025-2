import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView } from "react-native";

const palavras = [
  "REACT", "EXPO", "JAVASCRIPT", "FORCA", "NODE", "ANDROID", "IOS", "COMPONENTE",
  "ESTADO", "PROPRIEDADE", "FUNCAO", "OBJETO", "ARRAY", "STRING", "BOOLEAN",
  "VETOR", "MOBILE", "DESENVOLVEDOR", "APLICATIVO", "PROGRAMACAO", "BACKEND",
  "FRONTEND", "COMPILADOR", "VARIAVEL", "CONSTANTE", "IMPORT", "EXPORT", "HOOK",
  "EFFECT", "STYLE"
];

const maxTentativas = 6;

export default function App() {
  const [palavra, setPalavra] = useState(palavras[Math.floor(Math.random() * palavras.length)]);
  const [letrasCorretas, setLetrasCorretas] = useState([]);
  const [letrasErradas, setLetrasErradas] = useState([]);
  const [tentativas, setTentativas] = useState(maxTentativas);
  const [input, setInput] = useState("");

  const jogar = () => {
    const letra = input.toUpperCase();
    setInput("");

    if (!letra.match(/[A-Z]/) || letra.length !== 1) return;

    if (letrasCorretas.includes(letra) || letrasErradas.includes(letra)) return;

    if (palavra.includes(letra)) {
      setLetrasCorretas([...letrasCorretas, letra]);
    } else {
      setLetrasErradas([...letrasErradas, letra]);
      setTentativas(tentativas - 1);
    }
  };

  const reiniciar = () => {
    const novaPalavra = palavras[Math.floor(Math.random() * palavras.length)];
    setPalavra(novaPalavra);
    setLetrasCorretas([]);
    setLetrasErradas([]);
    setTentativas(maxTentativas);
    setInput("");
  };

  const renderPalavra = () => {
    return palavra
      .split("")
      .map((l) => (letrasCorretas.includes(l) ? l : "_"))
      .join(" ");
  };

  const checarFim = () => {
    if (renderPalavra().split(" ").join("") === palavra) return "vitória";
    if (tentativas <= 0) return "derrota";
    return null;
  };

  const status = checarFim();

  // Desenho simples da forca
  const desenharForca = () => {
    return (
      <View style={styles.forcaContainer}>
        <View style={[styles.bar, { height: 200 }]} />
        <View style={[styles.bar, { width: 120, marginLeft: -1 }]} />
        <View style={[styles.bar, { height: 40, marginLeft: 120 }]} />
        {tentativas <= 5 && <View style={styles.cabeca} />}
        {tentativas <= 4 && <View style={styles.corpo} />}
        {tentativas <= 3 && <View style={styles.bracoEsq} />}
        {tentativas <= 2 && <View style={styles.bracoDir} />}
        {tentativas <= 1 && <View style={styles.pernaEsq} />}
        {tentativas <= 0 && <View style={styles.pernaDir} />}
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Jogo da Forca</Text>

      {desenharForca()}

      <Text style={styles.palavra}>{renderPalavra()}</Text>
      <Text style={styles.tentativas}>Tentativas restantes: {tentativas}</Text>

      <TextInput
        style={styles.input}
        value={input}
        onChangeText={setInput}
        maxLength={1}
        autoCapitalize="characters"
        editable={!status}
      />
      <Button title="Chutar" onPress={jogar} disabled={status !== null} />

      <Text style={styles.lista}>Letras corretas: {letrasCorretas.join(", ")}</Text>
      <Text style={styles.lista}>Letras erradas: {letrasErradas.join(", ")}</Text>

      {status === "vitória" && <Text style={styles.vitoria}>Parabéns! Você venceu! 🎉</Text>}
      {status === "derrota" && <Text style={styles.derrota}>Fim de jogo! Palavra: {palavra}</Text>}

      <TouchableOpacity style={styles.botaoReiniciar} onPress={reiniciar}>
        <Text style={styles.textoBotao}>Reiniciar Jogo</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: "#f2f2f2" },
  title: { fontSize: 32, fontWeight: "bold", marginBottom: 20 },
  palavra: { fontSize: 28, letterSpacing: 4, marginVertical: 20 },
  tentativas: { fontSize: 18, marginBottom: 10 },
  input: { borderWidth: 1, width: 50, textAlign: "center", marginBottom: 10, fontSize: 20, backgroundColor: "#fff" },
  lista: { fontSize: 16, marginVertical: 5 },
  vitoria: { fontSize: 22, color: "green", marginTop: 20, fontWeight: "bold" },
  derrota: { fontSize: 22, color: "red", marginTop: 20, fontWeight: "bold" },
  botaoReiniciar: { backgroundColor: "#007bff", padding: 10, marginTop: 20, borderRadius: 5 },
  textoBotao: { color: "#fff", fontSize: 18 },
  forcaContainer: { alignItems: "flex-start", marginVertical: 20 },
  bar: { backgroundColor: "#333" },
  cabeca: { width: 40, height: 40, borderRadius: 20, backgroundColor: "#333", position: "absolute", top: 40, left: 100 },
  corpo: { width: 10, height: 80, backgroundColor: "#333", position: "absolute", top: 80, left: 118 },
  bracoEsq: { width: 60, height: 10, backgroundColor: "#333", position: "absolute", top: 90, left: 60, transform: [{ rotate: "-45deg" }] },
  bracoDir: { width: 60, height: 10, backgroundColor: "#333", position: "absolute", top: 90, left: 120, transform: [{ rotate: "45deg" }] },
  pernaEsq: { width: 60, height: 10, backgroundColor: "#333", position: "absolute", top: 155, left: 60, transform: [{ rotate: "45deg" }] },
  pernaDir: { width: 60, height: 10, backgroundColor: "#333", position: "absolute", top: 155, left: 118, transform: [{ rotate: "-45deg" }] },
});
