using Microsoft.AspNetCore.Mvc;
using ProAtividade.Domain.Entities;
using ProAtividade.Domain.Interfaces.Services;

namespace ProAtividadeAPI.Controllers
{
    [ApiController]
    [Route("api/login/[controller]")]
    public class AtividadeController : ControllerBase
    {
        private readonly IAtividadeService _atividadeService;
        public AtividadeController(IAtividadeService atividadeService)
        {
            _atividadeService = atividadeService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var atividades = await _atividadeService.PegarTodasAtividadesAsync();
                if (atividades == null) return NoContent();

                return Ok(atividades);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar Atividades. Erro: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            try
            {
                var atividade = await _atividadeService.PegarAtividadePorIdAsync(id);
                if (atividade == null) return NoContent();

                return Ok(atividade);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar recuperar Atividade com id: ${id}. Erro: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(Atividade model)
        {
            try
            {
                var atividade = await _atividadeService.AdicionarAtividade(model);
                if (atividade == null) return NoContent();

                return Ok(atividade);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar Adicionar Atividades. Erro: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, Atividade model)
        {
            try 
            {
                var atividade = await _atividadeService.AtualizarAtividade(model);

                if (model.Id != id)
                    return StatusCode(StatusCodes.Status409Conflict,
                        "Você está tentando atualizar a atividade errada");

                if (atividade == null) return NoContent();
                return Ok(atividade);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar Atualizar Atividade com id: ${id}. Erro: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var atividade = await _atividadeService.PegarAtividadePorIdAsync(id);
                if (atividade == null)
                    StatusCode(StatusCodes.Status409Conflict,
                        "Você está tentando deletar a atividade que não existe");

                if (await _atividadeService.DeletarAtividade(id))
                {
                    return Ok(new { message = "Deletado" });
                }
                else
                {
                    return BadRequest("Ocorreu um problema não específico ao tentar deletar a atividade.");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    $"Erro ao tentar deletar Atividade com id: ${id}. Erro: {ex.Message}");
            }
        }
    }
}