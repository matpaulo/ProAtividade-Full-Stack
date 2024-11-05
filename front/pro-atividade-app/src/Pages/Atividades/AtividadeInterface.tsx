import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import AtividadeForm from "./AtividadeForm";
import AtividadeLista from "./AtividadeLista";
import api from "../../api/atividade";
import { atividadeInicial, IAtividade } from "../../model/atividade";
import TitlePage from "../../components/TitlePage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";

const Atividade = () => {
  const [showAtividadeModal, setShowAtividadeModal] = useState(false);
  const [smShowConfirmModal, setSmShowConfirmModal] = useState(false);

  const [atividades, setAtividades] = useState<IAtividade[]>([]);
  const [atividade, setAtividade] = useState<IAtividade>(atividadeInicial);

  const handleAtiviadeModal = () => setShowAtividadeModal(!showAtividadeModal);

  const handleConfirmModal = (id: number) => {
    if (id !== 0 && id !== undefined) {
      const atividade = atividades.filter((atividade) => atividade.id === id);
      setAtividade(atividade[0]);
    } else {
      setAtividade(atividadeInicial);
    }
    setSmShowConfirmModal(!smShowConfirmModal);
  };

  const pegaTodasAtividades = async () => {
    const response = await api.get("atividade");
    return response.data;
  };

  const novaAtividade = () => {
    setAtividade(atividadeInicial);
    handleAtiviadeModal();
  };

  useEffect(() => {
    const getAtividades = async () => {
      const todasAtividades = await pegaTodasAtividades();
      if (todasAtividades) setAtividades(todasAtividades);
    };
    getAtividades();
  }, []);

  const addAtividade = async (ativ: IAtividade) => {
    handleAtiviadeModal();
    const response = await api.post("atividade", ativ);
    console.log(response.data);
    setAtividades([...atividades, response.data]);
  };

  const cancelarAtividade = () => {
    setAtividade(atividadeInicial);
    handleAtiviadeModal();
  };

  const atualizarAtividade = async (ativ: IAtividade) => {
    handleAtiviadeModal();
    const response = await api.put(`atividade/${ativ.id}`, ativ);
    const { id } = response.data;
    setAtividades(
      atividades.map((item) => (item.id === id ? response.data : item))
    );
    setAtividade(atividadeInicial);
  };

  const deletarAtividade = async (id: number) => {
    handleConfirmModal(0);
    if (await api.delete(`atividade/${id}`)) {
      const atividadesFiltradas = atividades.filter(
        (atividade) => atividade.id !== id
      );
      setAtividades([...atividadesFiltradas]);
    }
  };

  const pegarAtividade = (id: number) => {
    const atividade = atividades.filter((atividade) => atividade.id === id);
    setAtividade(atividade[0]);
    handleAtiviadeModal();
  };

  const closeConfirmModal = () => handleConfirmModal(0);

  return (
    <div className="container">
      <TitlePage
        title={"Atividade " + (atividade.id !== 0 ? atividade.id : "")}
      >
        <Button variant="outline-secondary" onClick={novaAtividade}>
          <FontAwesomeIcon icon={faPlus} />
        </Button>
      </TitlePage>
      <AtividadeLista
        atividades={atividades}
        pegarAtividade={pegarAtividade}
        handleConfirmModal={handleConfirmModal}
      />
      <Modal show={showAtividadeModal} onHide={handleAtiviadeModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            Atividade {atividade.id !== 0 ? atividade.id : ""}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AtividadeForm
            addAtividade={addAtividade}
            cancelarAtividade={cancelarAtividade}
            atualizarAtividade={atualizarAtividade}
            ativSelecionada={atividade}
          />
        </Modal.Body>
      </Modal>
      <Modal show={smShowConfirmModal} onHide={closeConfirmModal}>
        <Modal.Header closeButton>
          <Modal.Title>Deseja excluir esta atividade?</Modal.Title>
        </Modal.Header>
        <Modal.Body>Esta ação é irreversivel.</Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <button
            className="btn btn-outline-success me-2"
            onClick={() => deletarAtividade(atividade.id)}
          >
            <FontAwesomeIcon icon={faCheck} className="me-1" />
            Sim
          </button>
          <button
            className="btn btn-outline-danger me-2"
            onClick={closeConfirmModal}
          >
            <FontAwesomeIcon icon={faXmark} className="me-1" />
            Não
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Atividade;
