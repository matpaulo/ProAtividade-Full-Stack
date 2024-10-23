using Microsoft.AspNetCore.Mvc;
using ProAtividade.Data.Context;
using ProAtividade.Domain.Entities;

namespace ProAtividade.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AtividadeController : ControllerBase
    {
        private readonly DataContext _context;
        public AtividadeController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Atividade> Get()
        {
            return _context.Atividades;
        }

        [HttpGet("{id}")]
        public Atividade? Get(int id)
        {
            return _context.Atividades.FirstOrDefault(ati => ati.Id == id);
        }

        [HttpPost]
        public Atividade Post(Atividade atividade)
        {   
            _context.Atividades.Add(atividade);
            if (_context.SaveChanges() > 0)
            {
                var addedAtividade = _context.Atividades.
                    FirstOrDefault(ati => ati.Id == atividade.Id) 
                    ?? throw new Exception("A atividade não foi encontrada após ser adicionada.");
                return addedAtividade;
            }
            else
            {
                throw new Exception("Você não conseguiu adicionar uma atividade");
            }
            }

        [HttpPut("{id}")]
        public Atividade Put(int id, Atividade atividade)
        {
            if(atividade.Id != id) 
                throw new Exception("Você esta tentando adicionar a atividade errada");
            
            _context.Update(atividade);
            if(_context.SaveChanges() > 0)
                return _context.Atividades.FirstOrDefault(ativ => ativ.Id == id) ?? new Atividade();
            else
                return new Atividade();
        }

        [HttpDelete("{id}")]
        public bool Delete(int id)
        {
            var atividade = _context.Atividades.FirstOrDefault(ativ => ativ.Id == id);
            if (atividade == null)
                throw new Exception("Você está tentando deletar uma atividade que não existe");
            _context.Remove(atividade);

            return _context.SaveChanges() > 0;    
        }
    }
}
