import { Key } from "react";
import AtividadeCard from "./AtividadeCard";

interface Props {
    atividades?: any,
    pegarAtividade?: any
    handleConfirmModal?: any
}

export default function AtividadeLista({
    atividades, handleConfirmModal, pegarAtividade
  }: Props) {
  return (
    <div className="mt-3">
        {atividades.map((ativ: { id: Key | undefined; }) => (
            <AtividadeCard
                key={ativ.id}
                ativ={ativ}
                pegarAtividade={pegarAtividade}
                handleConfirmModal={handleConfirmModal}
            />
        ))}
    </div>
  )
}
