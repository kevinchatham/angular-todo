using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Server.Database;

namespace Server.Functions.Todos;

public class Delete
{
    readonly AppDbContext _db;

    public Delete(AppDbContext db)
    {
        _db = db;
    }

    [FunctionName("DeleteTodo")]
    public async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "delete", Route = "todo/{id}")] HttpRequest req,
        string id,
        ILogger log)
    {
        if (Guid.TryParse(id, out Guid parsedId))
        {
            var todo = await _db.Todos.SingleOrDefaultAsync(x => x.Id.Equals(parsedId));

            if (todo is null)
                return new NotFoundResult();

            _db.Todos.Remove(todo);

            await _db.SaveChangesAsync();

            return new OkResult();
        }
        else return new BadRequestResult();
    }
}