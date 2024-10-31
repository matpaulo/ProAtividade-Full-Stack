export interface IAtividade {
  prioridade: Prioridade;
  id: number;
  titulo: string;
  descricao: string;
}

export enum Prioridade {
  NaoDefinido = "NaoDefinido",
  Baixa = "Baixa",
  Normal = "Normal",
  Alta = "Alta",
}

export const atividadeInicial: IAtividade = {
  id: 0,
  titulo: "",
  prioridade: Prioridade.NaoDefinido,
  descricao: "",
};
