import { Routes, Route } from 'react-router-dom';
import AtividadeInterface from './Pages/Atividades/AtividadeInterface';
import ClientesInterface from './Pages/Clientes/ClientesInterface';
import HomeInterface from './Pages/Home/HomeInterface';
import ClienteForm from './Pages/Clientes/ClienteForm';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeInterface />} />
      <Route path="/clientes/lista" element={<ClientesInterface />} />
      <Route path="/clientes/detalhes" element={<ClienteForm />} />
      <Route path="/atividades" element={<AtividadeInterface />} />
    </Routes>
  );
}

