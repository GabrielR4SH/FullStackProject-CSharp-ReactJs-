# FullStackProject-CSharp-ReactJs

Este projeto é uma aplicação FullStack que combina ASP.NET para o backend, ReactJS para o frontend e SQL Server para o banco de dados.

## Instruções de Configuração

Siga estas etapas para configurar o projeto em sua máquina local.

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

- Node.js: [https://nodejs.org/](https://nodejs.org/)
- Visual Studio ou Visual Studio Code para ASP.NET 
- SQL Server: [https://www.microsoft.com/pt-br/sql-server/sql-server-downloads](https://www.microsoft.com/pt-br/sql-server/sql-server-downloads)

### Configurando o Banco de Dados (SQL Server)

1. Certifique-se de que o SQL Server esteja instalado em sua máquina. Você pode baixá-lo em [https://www.microsoft.com/pt-br/sql-server/sql-server-downloads](https://www.microsoft.com/pt-br/sql-server/sql-server-downloads).

2. Abra o SQL Server Management Studio (SSMS) ou qualquer ferramenta de gerenciamento de banco de dados que você preferir.

3. Execute o seguinte script SQL para criar o banco de dados "UserDB" e a tabela "Users":

```sql
USE master;
GO

-- Crie o banco de dados
CREATE DATABASE UserDB;

-- Crie a tabela "Users"
CREATE TABLE Users (
    ID INT PRIMARY KEY IDENTITY(1,1),
    Nome NVARCHAR(50),
    UltimoNome NVARCHAR(50),
    Email NVARCHAR(100),
    Senha NVARCHAR(100),
    CPF NVARCHAR(11),
    Telefone NVARCHAR(20),
    NivelPrivilegio INT
);

### Clone este repositorio e para se conectar com o banco faça:
 - Vá até a pasta ClientApp e digite: npm install
 - Abra o arquivo appsettings.json e verifique se a configuração da conexão com o banco de dados está correta. Deve ser semelhante a:
 "ConnectionStrings": {
    "DefaultConnection": "Server=NomeDoServidor;Database=UserDB;Trusted_Connection=True;MultipleActiveResultSets=true"
}



