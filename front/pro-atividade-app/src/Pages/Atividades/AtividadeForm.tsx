import { useState, useEffect } from "react";
import { atividadeInicial, IAtividade } from "../../model/atividade";
import { AtividadeFormProps } from "../../model/atividadesProps";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-regular-svg-icons";
import { faFileCirclePlus, faXmark } from "@fortawesome/free-solid-svg-icons";

const AtividadeForm: React.FC<AtividadeFormProps> = ({
  ativSelecionada,
  atualizarAtividade,
  addAtividade,
  cancelarAtividade,
}: AtividadeFormProps) => {
  const [atividade, setAtividade] = useState<IAtividade>(atividadeAtual());

  useEffect(() => {
    if (ativSelecionada.id !== 0) setAtividade(ativSelecionada);
  }, [ativSelecionada]);

  const handleValue = (e: any) => {
    const { name, value } = e.target;
    setAtividade({ ...atividade, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (ativSelecionada.id !== 0) atualizarAtividade(atividade);
    else addAtividade(atividade);
    setAtividade(atividadeInicial);
  };

  const handleCancelar = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    cancelarAtividade();
    setAtividade(atividadeInicial);
  };

  function atividadeAtual(): IAtividade {
    if (ativSelecionada.id !== 0) {
      return ativSelecionada;
    } else {
      return atividadeInicial;
    }
  }

  return (
    <>
      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label className="form-label">Título</label>
          <input
            name="titulo"
            value={atividade.titulo}
            onChange={handleValue}
            id="titulo"
            type="text"
            className="form-control"
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Prioridade</label>
          <select
            name="prioridade"
            value={atividade.prioridade}
            onChange={handleValue}
            id="prioridade"
            className="form-select"
          >
            <option value="NaoDefinido">Selecione...</option>
            <option value="Baixa">Baixa</option>
            <option value="Normal">Normal</option>
            <option value="Alta">Alta</option>
          </select>
        </div>
        <div className="col-md-12">
          <label className="form-label">Descrição</label>
          <textarea
            name="descricao"
            value={atividade.descricao}
            onChange={handleValue}
            id="descricao"
            className="form-control"
          />
          <hr />
        </div>
        <div className="col-12 mt-0 d-flex justify-content-between">
          {atividade.id === 0 ? (
            <button className="btn btn-outline-success" type="submit">
              <FontAwesomeIcon icon={faFileCirclePlus} className="me-1" />
              Salvar
            </button>
          ) : (
            <>
              <button className="btn btn-outline-success me-2" type="submit">
                <FontAwesomeIcon icon={faFloppyDisk} className="me-1" />
                Salvar
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={handleCancelar}
              >
                <FontAwesomeIcon icon={faXmark} className="me-1" />
                Cancelar
              </button>
            </>
          )}
        </div>
      </form>
    </>
  );
};

export default AtividadeForm;
