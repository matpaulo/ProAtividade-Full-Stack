using ProAtividade.Domain.Entities;
using ProAtividade.Domain.Interfaces.Repositories;
using ProAtividade.Domain.Interfaces.Services;

//quando for implementar regra de negocios, adicionar aqui no services
//smp que for Task, será um método asincrono

namespace ProAtividade.Domain.Services
{
    public class AtividadeService : IAtividadeService
    {
        private readonly IAtividadeRepo _atividadeRepo;
        
        public AtividadeService(IAtividadeRepo atividadeRepo)
        {
            _atividadeRepo = atividadeRepo;
            
        }
        public async Task<Atividade> AdicionarAtividade(Atividade model)
        {   
            // if(await _atividadeRepo.PegaPorTituloAsync(model.Titulo) != null)
            //     throw new Exception("Já existe uma atividade com esse título");
            if(await _atividadeRepo.PegaPorIdAsync(model.Id) == null)
            {
                _atividadeRepo.Adicionar(model);
                if(await _atividadeRepo.SalvarMudancasAsync())
                    return model;
            }
            // return null;
            throw new Exception("Erro ao adicionar título");
        }

        public async Task<Atividade> AtualizarAtividade(Atividade model)
        {
            if(await _atividadeRepo.PegaPorIdAsync(model.Id) == null)
            {
                _atividadeRepo.Atualizar(model);
                if(await _atividadeRepo.SalvarMudancasAsync())
                    return model;
            }
            // return null;
            throw new Exception("Erro ao adicionar atualizar atividade");;
        }

        public async Task<bool> ConcluirAtividade(Atividade model)
        {
            if(model != null)
            {
                model.Concluir();
                _atividadeRepo.Atualizar<Atividade>(model);
                return await _atividadeRepo.SalvarMudancasAsync();
            }
            return false;
        }

        public async Task<bool> DeletarAtividade(int atividadeId)
        {
            var atividade = await _atividadeRepo.PegaPorIdAsync(atividadeId) 
                ?? throw new Exception("Atividade que tentou deletar não existe");
            _atividadeRepo.Deletar(atividade);
            return await _atividadeRepo.SalvarMudancasAsync();
        }

        public async Task<Atividade> PegarAtividadePorIdAsync(int atividadeId)
        {
            try
            {
                var atividade = await _atividadeRepo.PegaPorIdAsync(atividadeId) 
                    ?? throw new Exception($"Atividade com o ID {atividadeId} não encontrada.");
                return atividade;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<Atividade[]> PegarTodasAtividadesAsync()
        {
            try
            {
                var atividades = await _atividadeRepo.PegaTodasAsync();
                return atividades ?? [];
            }
            catch (Exception ex)
            {   
                throw new Exception(ex.Message);
            }
        }
    }
}