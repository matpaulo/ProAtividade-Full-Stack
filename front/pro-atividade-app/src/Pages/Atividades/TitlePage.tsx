import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";

interface Props {
    novaAtividade?: any;
}

export default function TitlePage({novaAtividade} : Props) {
  return (
    <div className="d-flex justify-content-between align-items-end 
        mt-3 pb-3 border-bottom border-1">
        <h3 className='m-0 p-0'>Atividades</h3>
        <Button variant="outline-secondary" onClick={novaAtividade}>
          <FontAwesomeIcon icon={faPlus}/>
        </Button>
      </div>
  )
}
