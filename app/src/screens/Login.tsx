import { useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import api from "../services/api";
import { setAuthToken } from "../services/auth";

export default function Login({ onLogin }: any) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [msg, setMsg] = useState("");

  async function entrar() {
    try {
      setMsg("Carregando...");

      const res = await api.post("/auth/login", {
        email,
        senha,
      });

      console.log("LOGIN OK:", res.data);

      await setAuthToken(res.data.token);

      onLogin(); // muda tela
    } catch (err: any) {
      const erro =
        err?.response?.data?.erro ||
        err?.message ||
        "Erro no login";

      setMsg(erro);
    }
  }

  return (
    <View style={{ marginTop: 50 }}>
      <Text>Login</Text>

      <TextInput placeholder="email" onChangeText={setEmail} />
      <TextInput placeholder="senha" secureTextEntry onChangeText={setSenha} />

      <Button title="Entrar" onPress={entrar} />

      <Text>{msg}</Text>
    </View>
  );
}