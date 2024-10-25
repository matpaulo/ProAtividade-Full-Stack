import { Button } from "react-bootstrap"
import TitlePage from "../../components/TitlePage/TitlePage"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { useNavigate, useParams } from "react-router-dom"

export default function ClienteForm() {
  const navigate = useNavigate();
  const voltarLista = () => {
    navigate("/clientes/lista");
}
  let { id } = useParams();
  return (
    <>
        <TitlePage title={"Detalhes do Cliente " + (id !== undefined ? id : '')}>
          <Button className="btn" onClick={voltarLista}>
            <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
            Voltar
          </Button>
        </TitlePage>
        
    </>
  )
}
