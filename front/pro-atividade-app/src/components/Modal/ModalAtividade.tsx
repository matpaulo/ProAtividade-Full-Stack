import { Modal } from "react-bootstrap"
import AtividadeForm from "../../Pages/Atividades/AtividadeForm"

interface Props {
    showAtividadeModal?: any
    handleAtividadeModal?: any
    atividade?: any
    addAtividade?: any
    atualizarAtividade?: any
    cancelarAtividade?: any
    atividades?: any
}

const ModalAtividade = (
    {showAtividadeModal, handleAtividadeModal, atividade, atividades, 
    addAtividade, atualizarAtividade, cancelarAtividade} : Props
) => {
  return (
    <Modal show={showAtividadeModal} onHide={handleAtividadeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Atividade {atividade.id !== "0" ? atividade.id : ''}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AtividadeForm
              addAtividade={addAtividade}
              atualizarAtividade={atualizarAtividade}
              cancelarAtividade={cancelarAtividade}
              ativSelecionada={atividade}
              atividades={atividades}
            />
          </Modal.Body>
        </Modal>
  )
}

export default ModalAtividade