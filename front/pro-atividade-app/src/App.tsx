import { useEffect, useState } from 'react';
import AtividadeLista from './components/Atividade/AtividadeLista';
import api from './api/atividade';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ModalAtividade from './components/Modals/ModalAtividade';
import ConfirmModal from './components/Modals/ConfirmModal';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

interface Atividade {
  id: string;
  descricao: string;
  prioridade: string;
  titulo: string;
}

function App() {
  const [showAtividadeModal, setShowAtividadeModal] = useState(false);
  const [smShowConfirmModal, setSmShowConfirmModal] = useState(false);
  const [atividades, setAtividades] = useState<Atividade[]>([]);
  const [atividade, setAtividade] = useState<Atividade>({
    id: '0', descricao: '', prioridade: '', titulo: ''
  });
  const handleAtividadeModal = () => setShowAtividadeModal(!showAtividadeModal);
  const handleConfirmModal = (id: any) => {
    if(id !== '0' && id !== undefined) {
      const atividadeEncontrada = atividades.find(
        (atividade) => atividade.id === id);
      if (atividadeEncontrada) {
        setAtividade(atividadeEncontrada);
      }
    } else {
      setAtividade({ 
        id: '0', descricao: '', prioridade: '', titulo: ''
      })
    }
    setSmShowConfirmModal(!smShowConfirmModal);
  }

  const pegaTodasAtividades = async () => {
    try {
      const response = await api.get('atividade');
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar atividades: ", error);
      return [];
    }
  }

  const novaAtividade = () => {
    handleAtividadeModal()
    setAtividade({
        id: '0', descricao: '', prioridade: '', titulo: ''
      });
  }
  
  useEffect(() => {
      const getAtividades = async () => {
        const todasAtividades = await pegaTodasAtividades();
        if(todasAtividades) 
          setAtividades(todasAtividades);
      };
      getAtividades();
    }, []);

  const addAtividade = async (ativ: Atividade) => {
    handleAtividadeModal()
    const response = await api.post('atividade', ativ);
    setAtividades([...atividades, response.data]);
  }

  const deleteAtividade = async(id: string) => {
    handleConfirmModal("0")
    if (await api.delete(`atividade/${id}`))
    {
      const atividadesFiltradas = atividades.filter(
        (atividade) => atividade.id !== id);
      setAtividades([...atividadesFiltradas]);
    }
  }

  const pegarAtividade = (id: string) => {
    handleAtividadeModal()
    const atividadeEncontrada = atividades.find(
      (atividade) => atividade.id === id);
    if (atividadeEncontrada) {
      setAtividade(atividadeEncontrada);
    }
  }

  const atualizarAtividade = async(ativ: Atividade) => {
    handleAtividadeModal()
    const response = await api.put(
      `atividade/${ativ.id}`, ativ
    );
    const { id } = response.data;
    setAtividades(
      atividades.map((item) => (
        item.id === id ? response.data : item
      ))
    );
    setAtividade({
        id: '0', descricao: '', prioridade: '', titulo: ''
      });
  }

  const cancelarAtividade = () => { 
    handleAtividadeModal()
    setAtividade({
        id: '0', descricao: '', prioridade: '', titulo: ''
      });
  }

  return (
    <>
      <div 
        className="d-flex justify-content-between align-items-end 
        mt-2 pb-3 border-bottom border-1">
        <h1 className='m-0 p-0'>Atividade</h1>
        <Button variant="outline-secondary" onClick={novaAtividade}>
          <FontAwesomeIcon icon={faPlus}/>
        </Button>
      </div>
        <AtividadeLista
          atividades={atividades}
          pegarAtividade={pegarAtividade}
          handleConfirmModal={handleConfirmModal}
        />
        <ModalAtividade
          showAtividadeModal={showAtividadeModal}
          handleAtividadeModal={handleAtividadeModal}
          atividade={atividade}
          addAtividade={addAtividade}
          atualizarAtividade={atualizarAtividade}
          cancelarAtividade={cancelarAtividade}
          atividades={atividades}
        />
        <ConfirmModal
          smShowConfirmModal={smShowConfirmModal}
          handleConfirmModal={handleConfirmModal}
          atividade={atividade}
          deleteAtividade={deleteAtividade}
        />
    </>
  );
}

export default App;