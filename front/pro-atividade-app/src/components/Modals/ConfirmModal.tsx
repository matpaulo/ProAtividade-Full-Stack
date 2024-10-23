import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Modal } from "react-bootstrap"

interface Props {
    smShowConfirmModal?: any
    handleConfirmModal?: any
    atividade?: any
    deleteAtividade?: any
}

const ConfirmModal = (
    {smShowConfirmModal, handleConfirmModal, 
        atividade, deleteAtividade, } : Props
) => {
  return (
    <Modal
        show={smShowConfirmModal}
        onHide={() => handleConfirmModal}
    >
        <Modal.Header closeButton>
            <Modal.Title>
              Deseja excluir a atividade 
                {atividade.id !== "0" ? atividade.id : ''}?
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Isso excluirá a atividade permanentemente!
        </Modal.Body>
        <Modal.Footer className='d-flex justify-content-between'>
            <button 
              className="btn btn-outline-warning me-2"
              onClick={() => deleteAtividade(atividade.id)}  
            >
              <FontAwesomeIcon className="me-1"  icon={faCheck} />
              Sim
            </button>
            <button 
              className="btn btn-outline-danger"
              onClick={() => handleConfirmModal("0")}
            >
              <FontAwesomeIcon className="me-1" icon={faXmark}/>
              Não
            </button>
        </Modal.Footer>
    </Modal>
  )
}

export default ConfirmModal