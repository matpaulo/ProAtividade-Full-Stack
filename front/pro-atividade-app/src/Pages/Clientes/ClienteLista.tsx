import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TitlePage from "../../components/TitlePage";
import {
  faMagnifyingGlass,
  faUserPen,
  faUserPlus,
  faUserXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const clientes = [
  {
    id: 1,
    nome: "Microsoft",
    responsavel: "Mike",
    contato: "40028922",
    situacao: "Ativo",
  },
  {
    id: 2,
    nome: "Apple",
    responsavel: "Gerald",
    contato: "14992001",
    situacao: "Ativo",
  },
  {
    id: 3,
    nome: "Toyota",
    responsavel: "Purple",
    contato: "15902004",
    situacao: "Desativado",
  },
  {
    id: 4,
    nome: "Amazon",
    responsavel: "Yellow",
    contato: "38190231",
    situacao: "Ativo",
  },
  {
    id: 5,
    nome: "Google",
    responsavel: "Red",
    contato: "12038181",
    situacao: "Ativo",
  },
];

const ClienteLista: React.FC = () => {
  const navigate = useNavigate();
  const [termoBusca, setTermoBusca] = useState("");
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTermoBusca(e.target.value);
  };
  const clientesFiltrados = clientes.filter((cliente) => {
    return Object.values(cliente)
      .join(" ")
      .toLowerCase()
      .includes(termoBusca.toLowerCase());
  });
  const novoCliente = () => {
    navigate("/cliente/detalhe");
  };
  return (
    <>
      <TitlePage title="Lista de Clientes">
        <Button variant="outline-primary" onClick={novoCliente}>
          <FontAwesomeIcon icon={faUserPlus} className="me-2" />
          Novo Cliente
        </Button>
      </TitlePage>
      <div className="input-group mb-3 mt-3">
        <input
          type="text"
          className="form-control"
          placeholder="Pesquisar..."
          onChange={handleInputChange}
        ></input>
        <span className="input-group-text" id="inputGroup-sizing-default">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </span>
      </div>
      <table className="table table-striped table-hover">
        <thead className="table-dark mt-3">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nome</th>
            <th scope="col">Responsável</th>
            <th scope="col">Contato</th>
            <th scope="col">Situacão</th>
            <th scope="col">Opções</th>
          </tr>
        </thead>
        <tbody>
          {clientesFiltrados.map((cliente) => (
            <tr key={cliente.id}>
              <td>{cliente.id}</td>
              <td>{cliente.nome}</td>
              <td>{cliente.responsavel}</td>
              <td>{cliente.contato}</td>
              <td>{cliente.situacao}</td>
              <td>
                <div>
                  <button
                    className="btn btn-sm btn-outline-success me-1"
                    onClick={() => navigate(`/cliente/detalhe/${cliente.id}`)}
                  >
                    <FontAwesomeIcon icon={faUserPen} className="me-1" />
                    Editar
                  </button>
                  <button className="btn btn-sm btn-outline-danger">
                    <FontAwesomeIcon icon={faUserXmark} className="me-1" />
                    Desativar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ClienteLista;
