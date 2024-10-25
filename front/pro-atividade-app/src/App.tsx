import { Routes, Route } from 'react-router-dom';
import AtividadeInterface from './Pages/Atividades/AtividadeInterface';
import { ClientesInterface } from './Pages/Clientes/ClientesInterface';
import HomeInterface from './Pages/Home/HomeInterface';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeInterface />} />
      <Route path="/clientes" element={<ClientesInterface />} />
      <Route path="/atividades" element={<AtividadeInterface />} />
    </Routes>
  );
}

