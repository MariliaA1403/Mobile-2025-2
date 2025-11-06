import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen name="profissional" options={{ title: "Profissional" }} />
      <Stack.Screen name="academica" options={{ title: "Acadêmica" }} />
      <Stack.Screen name="projetos" options={{ title: "Projetos" }} />
      <Stack.Screen name="sobre" options={{ title: "Sobre" }} />
    </Stack>
  );
}
