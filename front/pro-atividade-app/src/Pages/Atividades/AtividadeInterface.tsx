import { useEffect, useState } from 'react';
import api from '../../api/atividade'
import AtividadeLista from './AtividadeLista';
import ModalAtividade from '../../components/Modal/ModalAtividade';
import ConfirmModal from '../../components/Modal/ConfirmModal';
import TitlePage from './TitlePage';

interface Atividade {
  id: string;
  descricao: string;
  prioridade: string;
  titulo: string;
}

export default function AtividadeInterface() {
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
      <TitlePage novaAtividade={novaAtividade} />
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