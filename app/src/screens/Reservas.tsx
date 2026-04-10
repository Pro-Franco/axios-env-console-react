import { useEffect, useState } from "react";
import { Button, Text, TextInput, View } from "react-native";
import api from "../services/api";
import { setAuthToken } from "../services/auth";

export default function Reservas({ onLogout }: any) {
  const [lista, setLista] = useState<any[]>([]);
  const [sala, setSala] = useState("");
  const [data, setData] = useState("");
  const [msg, setMsg] = useState("");

  async function buscar() {
    try {
      const res = await api.get("/reservas");
      setLista(res.data);
    } catch {
      setMsg("Erro ao buscar");
    }
  }

  async function cadastrar() {
    try {
      await api.post("/reservas", { sala, data });

      setSala("");
      setData("");

      buscar();
    } catch {
      setMsg("Erro ao cadastrar");
    }
  }

  async function sair() {
    await setAuthToken(null);
    onLogout();
  }

  useEffect(() => {
    buscar();
  }, []);

  return (
    <View style={{ marginTop: 50 }}>
      <Text>Reservas</Text>

      <TextInput placeholder="Sala" value={sala} onChangeText={setSala} />
      <TextInput placeholder="Data" value={data} onChangeText={setData} />

      <Button title="Cadastrar" onPress={cadastrar} />
      <Button title="Atualizar" onPress={buscar} />

      {lista.map((r, i) => (
        <Text key={i}>{r.sala} - {r.data}</Text>
      ))}

      <Button title="Sair" onPress={sair} />

      <Text>{msg}</Text>
    </View>
  );
}