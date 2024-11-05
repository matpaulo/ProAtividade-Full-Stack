import { Routes, Route } from "react-router-dom";
import AtividadeInterface from "./Pages/Atividades/AtividadeInterface";
import ClientesInterface from "./Pages/Clientes/ClientesInterface";
import HomeInterface from "./Pages/Home/HomeInterface";
import ClienteForm from "./Pages/Clientes/ClienteForm";
import PageNotFound from "./Pages/PageNotFound";
import Login from "./Pages/Login/Login";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<HomeInterface />} />
      <Route path="/atividade/*" element={<AtividadeInterface />} />
      <Route path="/atividade:id/cliente" element={<ClientesInterface />} />
      <Route path="/cliente/*" element={<ClientesInterface />} />
      <Route path="/cliente/:id/atividade" element={<AtividadeInterface />} />
      <Route path="/cliente/detalhe/*" element={<ClienteForm />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default App;
