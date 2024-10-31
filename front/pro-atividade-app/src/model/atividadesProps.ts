import { IAtividade } from "./atividade";

export interface AtividadeListaProps {
  atividades: IAtividade[];
  handleConfirmModal: (id: number) => void;
  pegarAtividade: (id: number) => void;
}

//detalhe importante, função que não retorna nada se chama método (void em JS)!

export interface AtividadeCardProps {
  ativ: IAtividade;
  handleConfirmModal: (id: number) => void;
  pegarAtividade: (id: number) => void;
}

export interface AtividadeFormProps {
  addAtividade: (atividade: IAtividade) => void;
  ativSelecionada: IAtividade;
  atualizarAtividade: (atividade: IAtividade) => void;
  cancelarAtividade: () => void;
}
