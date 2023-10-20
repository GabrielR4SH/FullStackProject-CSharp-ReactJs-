using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UsersSystem.Models;

namespace UsersSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserDbContext _context;

        public UserController(UserDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("GetUsers")]
        public IActionResult GetUsers()
        {
            List<User> list = _context.Users.ToList();
            return StatusCode(StatusCodes.Status200OK, list);
        }

        [HttpPost]
        [Route("AddUser")]
        public IActionResult AddUser(User user)
        {
            _context.Users.Add(user);
            _context.SaveChanges();
            return StatusCode(StatusCodes.Status201Created, user);
        }

        [HttpPut]
        [Route("EditUser/{id}")]
        public IActionResult EditUser(int id, [FromBody] User user)
        {
            var existingUser = _context.Users.Find(id);
            if (existingUser == null)
            {
                return StatusCode(StatusCodes.Status404NotFound, "Usuário não encontrado");
            }

            // Atualize os campos do usuário existente com os valores fornecidos no corpo da solicitação.
            existingUser.Nome = user.Nome;
            existingUser.UltimoNome = user.UltimoNome;
            existingUser.Email = user.Email;
            existingUser.Senha = user.Senha;
            existingUser.Cpf = user.Cpf;
            existingUser.Telefone = user.Telefone;
            existingUser.NivelPrivilegio = user.NivelPrivilegio;

            _context.SaveChanges();
            return StatusCode(StatusCodes.Status200OK, existingUser);
        }

        [HttpDelete]
        [Route("DeleteUser/{id}")]
        public IActionResult DeleteUser(int id)
        {
            var user = _context.Users.Find(id);
            if (user == null)
            {
                return StatusCode(StatusCodes.Status404NotFound, "Usuário não encontrado");
            }

            _context.Users.Remove(user);
            _context.SaveChanges();
            return StatusCode(StatusCodes.Status204NoContent);
        }
    }
}
