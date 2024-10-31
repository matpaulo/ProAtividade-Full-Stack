import AtividadeCard from "./AtividadeCard";
import { AtividadeListaProps } from "../../model/atividadesProps";

const AtividadeLista: React.FC<AtividadeListaProps> = ({
  atividades,
  handleConfirmModal,
  pegarAtividade,
}: AtividadeListaProps) => {
  return (
    <div className="mt-3">
      {atividades.length === 0 ? (
        <p className="d-flex justify-content-center mt-5">
          A lista não possui atividades...
        </p>
      ) : (
        atividades.map((ativ) => (
          <AtividadeCard
            key={ativ.id}
            ativ={ativ}
            pegarAtividade={pegarAtividade}
            handleConfirmModal={handleConfirmModal}
          />
        ))
      )}
    </div>
  );
};

export default AtividadeLista;
