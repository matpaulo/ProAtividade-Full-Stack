using ProAtividade.Domain.Entities;

namespace ProAtividade.Domain.Interfaces.Repositories
{
    public interface IAtividadeRepo 
    {
        Task<Atividade[]> PegaTodasAsync(); //assinaturas
        Task<Atividade> PegaPorIdAsync();
        Task<Atividade> PegaPorTituloAsync();
    }
}