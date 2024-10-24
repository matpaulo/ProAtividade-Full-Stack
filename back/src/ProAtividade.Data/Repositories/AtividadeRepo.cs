using Microsoft.EntityFrameworkCore;
using ProAtividade.Data.Context;
using ProAtividade.Domain.Entities;
using ProAtividade.Domain.Interfaces.Repositories;

namespace ProAtividade.Data.Repositories
{
    public class AtividadeRepo : GeralRepo, IAtividadeRepo // herda as caracterias de ambas
    {
        private readonly DataContext _context;
        public AtividadeRepo(DataContext context) : base(context)
        {
            _context = context;
        }
        public async Task<Atividade> PegaPorIdAsync(int id)
        {
            IQueryable<Atividade> query = _context.Atividades;
            query = query.AsNoTracking()
                            .OrderBy(ativ => ativ.Id)
                            .Where(a => a.Id == id);
            var atividadeId = await query.FirstOrDefaultAsync() ?? throw new Exception("Nenhum ID encontrado.");
            return atividadeId;
        }

        public async Task<Atividade> PegaPorTituloAsync(string titulo)
        {
            IQueryable<Atividade> query = _context.Atividades;
            query = query.AsNoTracking()
                            .OrderBy(ativ => ativ.Titulo)
                            .Where(a => a.Titulo == titulo);
            var atividadeTitulo = await query.FirstOrDefaultAsync() ?? throw new Exception("Nenhuma título encontrado.");
            return atividadeTitulo;
        }
        public async Task<Atividade[]> PegaTodasAsync()
        {
            IQueryable<Atividade> query = _context.Atividades;
            query = query.AsNoTracking()
                            .OrderBy(ativ => ativ.Id);
            var atividadeTodosOsId = await query.ToArrayAsync() ?? throw new Exception("Nenhuma conjunto de IDs encontrado.");
            return atividadeTodosOsId;
        }
    }
}