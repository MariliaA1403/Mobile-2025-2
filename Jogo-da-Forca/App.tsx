import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const animais = [
  { nome: "ELEFANTE", dica: "O maior animal terrestre" },
  { nome: "TIGRE", dica: "Felino listrado e feroz" },
  { nome: "LEAO", dica: "Rei da selva" },
  { nome: "GIRAFA", dica: "Pescoço bem comprido" },
  { nome: "CROCODILO", dica: "Reptil que vive em rios" },
  { nome: "HIPOPOTAMO", dica: "Grande herbívoro aquático" },
  { nome: "URSO", dica: "Pode hibernar no inverno" },
  { nome: "COALA", dica: "Vive em árvores e come eucalipto" },
  { nome: "PANDA", dica: "Urso preto e branco que adora bambu" },
  { nome: "LONTRA", dica: "Adora brincar na água" },
  { nome: "CANGURU", dica: "Marsupial que pula muito" },
  { nome: "GORILA", dica: "Primate muito forte e inteligente" },
  { nome: "MACACO", dica: "Primate ágil e brincalhão" },
  { nome: "PINGUIM", dica: "Ave que não voa e adora nadar" },
  { nome: "ARARA", dica: "Ave colorida tropical" },
  { nome: "CAMELO", dica: "Armazena água em corcovas" },
  { nome: "LEOPARDO", dica: "Felino ágil com manchas" },
  { nome: "JACARE", dica: "Reptil predador de rios" },
  { nome: "ZEBRA", dica: "Cavalo listrado em preto e branco" },
  { nome: "ESQUILO", dica: "Roedor ágil que adora nozes" },
  { nome: "COBRA", dica: "Réptil sem pernas" },
  { nome: "TARTARUGA", dica: "Réptil com casco" },
  { nome: "PEIXE", dica: "Animal aquático que nada" },
  { nome: "AVESTRUZ", dica: "Ave grande que corre muito" },
  { nome: "RAPOSA", dica: "Animal astuto e vermelho" },
  { nome: "CAVALO", dica: "Mamífero domesticado para cavalgar" },
  { nome: "GATO", dica: "Felino doméstico" },
  { nome: "CACHORRO", dica: "Melhor amigo do homem" },
  { nome: "PAPAGAIO", dica: "Ave que imita sons" },
  { nome: "CAMELO", dica: "Mamífero do deserto" }
];

const maxTentativas = 6;
const alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function App() {
  const [palavraObj, setPalavraObj] = useState(animais[Math.floor(Math.random() * animais.length)]);
  const [letrasCorretas, setLetrasCorretas] = useState<string[]>([]);
  const [letrasErradas, setLetrasErradas] = useState<string[]>([]);
  const [tentativas, setTentativas] = useState(maxTentativas);

  const escolherLetra = (letra: string) => {
    if (letrasCorretas.includes(letra) || letrasErradas.includes(letra)) return;

    if (palavraObj.nome.includes(letra)) {
      setLetrasCorretas([...letrasCorretas, letra]);
    } else {
      setLetrasErradas([...letrasErradas, letra]);
      setTentativas(tentativas - 1);
    }
  };

  const renderPalavra = () =>
    palavraObj.nome.split("").map(l => letrasCorretas.includes(l) ? l : "_").join(" ");

  const status = palavraObj.nome.split("").every(l => letrasCorretas.includes(l)) ? "vitória" : (tentativas <= 0 ? "derrota" : null);

  const reiniciar = () => {
    const nova = animais[Math.floor(Math.random() * animais.length)];
    setPalavraObj(nova);
    setLetrasCorretas([]);
    setLetrasErradas([]);
    setTentativas(maxTentativas);
  };

  const desenharForca = () => (
    <View style={styles.forcaContainer}>
      {/* Estrutura da Forca */}
      <View style={styles.posteVertical} />
      <View style={styles.posteHorizontal} />
      <View style={styles.corda} />
      {/* Boneco */}
      {tentativas <= 5 && <View style={styles.cabeca} />}
      {tentativas <= 4 && <View style={styles.corpo} />}
      {tentativas <= 3 && <View style={styles.bracoEsq} />}
      {tentativas <= 2 && <View style={styles.bracoDir} />}
      {tentativas <= 1 && <View style={styles.pernaEsq} />}
      {tentativas <= 0 && <View style={styles.pernaDir} />}
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Jogo da Forca - Animais</Text>

      {desenharForca()}

      <View style={styles.quadro}>
        <Text style={styles.dica}>💡 Dica: {palavraObj.dica}</Text>
        <Text style={styles.palavra}>{renderPalavra()}</Text>
      </View>

      <Text style={styles.tentativas}>Tentativas restantes: {tentativas}</Text>

      <View style={styles.letrasContainer}>
        {alfabeto.map(l => {
          const usada = letrasCorretas.includes(l) || letrasErradas.includes(l);
          return (
            <TouchableOpacity
              key={l}
              style={[styles.letraBotao, usada && (letrasCorretas.includes(l) ? styles.letraCorreta : styles.letraErrada)]}
              onPress={() => escolherLetra(l)}
              disabled={status !== null || usada}
            >
              <Text style={styles.letraTexto}>{l}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <Text style={styles.lista}>✅ Letras corretas: {letrasCorretas.join(", ")}</Text>
      <Text style={styles.lista}>❌ Letras erradas: {letrasErradas.join(", ")}</Text>

      {status === "vitória" && <Text style={styles.vitoria}>🎉 Parabéns! Você venceu!</Text>}
      {status === "derrota" && <Text style={styles.derrota}>💀 Fim de jogo! Palavra: {palavraObj.nome}</Text>}

      <TouchableOpacity style={styles.botaoReiniciar} onPress={reiniciar}>
        <Text style={styles.textoBotao}>Reiniciar Jogo</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: "center", alignItems: "center", padding: 20, backgroundColor: "#e3f2fd" },
  title: { fontSize: 32, fontWeight: "bold", color: "#1565c0", marginBottom: 20 },
  quadro: { padding: 20, backgroundColor: "#fff", borderRadius: 12, shadowColor: "#000", shadowOpacity: 0.1, shadowOffset: { width: 0, height: 2 }, shadowRadius: 5, elevation: 5, alignItems: "center", marginBottom: 20, width: "100%" },
  dica: { fontSize: 18, marginBottom: 12, color: "#555" },
  palavra: { fontSize: 30, letterSpacing: 5, fontWeight: "bold", color: "#333" },
  tentativas: { fontSize: 18, marginBottom: 10 },
  letrasContainer: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center", marginVertical: 10 },
  letraBotao: { borderWidth: 1, borderColor: "#1565c0", padding: 12, margin: 4, borderRadius: 8, width: 45, height: 45, alignItems: "center", justifyContent: "center", backgroundColor: "#fff" },
  letraCorreta: { backgroundColor: "#4caf50", borderColor: "#388e3c" },
  letraErrada: { backgroundColor: "#f44336", borderColor: "#c62828" },
  letraTexto: { fontSize: 18, fontWeight: "bold", color: "#333" },
  lista: { fontSize: 16, marginVertical: 5 },
  vitoria: { fontSize: 24, color: "green", marginTop: 20, fontWeight: "bold" },
  derrota: { fontSize: 24, color: "red", marginTop: 20, fontWeight: "bold" },
  botaoReiniciar: { backgroundColor: "#1565c0", padding: 14, marginTop: 20, borderRadius: 10, width: "60%", alignItems: "center" },
  textoBotao: { color: "#fff", fontSize: 18, fontWeight: "bold" },

  // Forca
  forcaContainer: { width: 200, height: 250, alignItems: "center", marginVertical: 20, position: "relative" },
  posteVertical: { position: "absolute", left: 20, top: 0, width: 10, height: 250, backgroundColor: "#333" },
  posteHorizontal: { position: "absolute", left: 20, top: 0, width: 120, height: 10, backgroundColor: "#333" },
  corda: { position: "absolute", left: 130, top: 10, width: 3, height: 40, backgroundColor: "#333" },
  cabeca: { position: "absolute", left: 115, top: 50, width: 30, height: 30, borderRadius: 15, backgroundColor: "#f44336" },
  corpo: { position: "absolute", left: 128, top: 80, width: 4, height: 60, backgroundColor: "#f44336" },
  bracoEsq: { position: "absolute", left: 108, top: 90, width: 20, height: 4, backgroundColor: "#f44336", transform: [{ rotate: "-45deg" }] },
  bracoDir: { position: "absolute", left: 132, top: 90, width: 20, height: 4, backgroundColor: "#f44336", transform: [{ rotate: "45deg" }] },
  pernaEsq: { position: "absolute", left: 118, top: 140, width: 20, height: 4, backgroundColor: "#f44336", transform: [{ rotate: "45deg" }] },
  pernaDir: { position: "absolute", left: 130, top: 140, width: 20, height: 4, backgroundColor: "#f44336", transform: [{ rotate: "-45deg" }] },
});
