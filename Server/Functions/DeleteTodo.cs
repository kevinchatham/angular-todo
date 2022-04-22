using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Server.Database;

namespace Server.Functions;

public class DeleteTodo
{
    readonly AppDbContext _db;

    public DeleteTodo(AppDbContext db)
    {
        _db = db;
    }

    [FunctionName("DeleteTodo")]
    public async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "delete", Route = null)] HttpRequest req,
        ILogger log)
    {
        string queryId = req.Query["id"];

        var id = Guid.Parse(queryId);

        var todo = await _db.Todos.SingleOrDefaultAsync(x => x.Id.Equals(id));

        _db.Todos.Remove(todo);

        await _db.SaveChangesAsync();

        return new OkResult();
    }
}