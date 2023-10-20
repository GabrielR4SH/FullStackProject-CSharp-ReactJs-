using System;
using System.Collections.Generic;

namespace UsersSystem.Models;

public partial class User
{
    public int Id { get; set; }

    public string? Nome { get; set; }

    public string? UltimoNome { get; set; }

    public string? Email { get; set; }

    public string? Senha { get; set; }

    public string? Cpf { get; set; }

    public string? Telefone { get; set; }

    public int? NivelPrivilegio { get; set; }
}
