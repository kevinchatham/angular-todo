using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Server.Database;

namespace Server.Functions;

public class GetTodo
{
    readonly AppDbContext _db;

    public GetTodo(AppDbContext db)
    {
        _db = db;
    }

    [FunctionName("GetTodo")]
    public async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = null)] HttpRequest req,
        ILogger log)
    {
        var todos = await _db.Todos.ToListAsync();
        return new OkObjectResult(todos);
    }
}