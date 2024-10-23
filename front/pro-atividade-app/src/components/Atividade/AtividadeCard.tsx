import { faFaceGrimace, faFaceGrinBeam, faFaceGrinBeamSweat } from '@fortawesome/free-regular-svg-icons'
import { faPen, faQuestion, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface Props {
  ativ?: any,
  handleConfirmModal?: any,
  pegarAtividade?: any,
}

function priorityLabel(param: string) {
  switch(param) {
    case 'Baixa':
    case 'Normal':
    case 'Alta':
      return param;
  default:
    return 'Não definido';
  }
}

function priorityIcon(param: string) {
  switch(param) {
    case 'Baixa':
      return <FontAwesomeIcon icon={faFaceGrinBeam} />;
  }
  switch(param) {
    case 'Normal':
      return <FontAwesomeIcon icon={faFaceGrinBeamSweat} />;
  }
  switch(param) {
    case 'Alta':
      return <FontAwesomeIcon icon={faFaceGrimace} />;
  default:
      return <FontAwesomeIcon icon={faQuestion} />;
  }
}

function priorityStyle(param: string) {
  switch(param) {
    case 'Baixa':
      return 'success';
  }
  switch(param) {
    case 'Normal':
      return 'dark';
  }
  switch(param) {
    case 'Alta':
      return 'warning';
  default:
    return 'primary';
  }
}

export default function AtividadeCard({
    ativ, handleConfirmModal, pegarAtividade
  }: Props) { 
  return (
    <div className={'card mb-2 shadow-sm border-' + priorityStyle(ativ.prioridade)}>
      <div className='card-body'>
        <div className='d-flex justify-content-between'>
          <h5 className='card-title'>
            <span className='badge bg-secondary me-2'>{ativ.id}</span>
            - {ativ.titulo}
          </h5>
          <h6>
            Prioridade: 
            <span className={'ms-1 text-' + priorityStyle(ativ.prioridade)}>
              <i className='ms-1'>{priorityIcon(ativ.prioridade)}</i>
              <i className='ms-1'>{priorityLabel(ativ.prioridade)}</i>
            </span>  
          </h6>
        </div>
        <p className='card-text'>
          {ativ.descricao}
        </p>
        <div className='d-flex justify-content-end pt-2 m-0 border-top'>
          <button 
            className='btn btn-outline-primary me-2 btn-sm'
            onClick={() => pegarAtividade(ativ.id)}
            >
              <FontAwesomeIcon className='me-1' icon={faPen} />
              Editar
          </button>
          <button 
            className='btn btn-outline-danger me-2 btn-sm'
            onClick={() => handleConfirmModal(ativ.id)}>
              <FontAwesomeIcon className='me-1' icon={faTrash} />
              Deletar
          </button>
        </div>
      </div>
    </div>
  )
}
