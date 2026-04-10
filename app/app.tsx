import { useEffect, useState } from "react";
import Login from "./src/screens/Login";
import Reservas from "./src/screens/Reservas";
import { initAuth } from "./src/services/auth";

export default function App() {
  const [logado, setLogado] = useState(false);

  useEffect(() => {
    async function check() {
      await initAuth();
      setLogado(true); // simplificado
    }

    check();
  }, []);

  if (!logado) {
    return <Login onLogin={() => setLogado(true)} />;
  }

  return <Reservas onLogout={() => setLogado(false)} />;
}