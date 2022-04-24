using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Server.Database;
using Server.Models.Dto;

namespace Server.Functions.Todos;

public class UpdateTodo
{
    readonly AppDbContext _db;

    public UpdateTodo(AppDbContext db)
    {
        _db = db;
    }

    [FunctionName("UpdateTodo")]
    public async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "put", Route = "todo/{id}")] HttpRequest req,
        string id,
        ILogger log)
    {
        if (Guid.TryParse(id, out Guid parsedId))
        {
            var requestBody = await new StreamReader(req.Body).ReadToEndAsync();

            var todoDto = JsonConvert.DeserializeObject<TodoDto>(requestBody);

            var todo = await _db.Todos.SingleOrDefaultAsync(x => x.Id.Equals(parsedId));

            if (todo is null)
                return new NotFoundResult();

            todo.Completed = todoDto.Completed;
            todo.Value = todoDto.Value;

            _db.Todos.Update(todo);
            await _db.SaveChangesAsync();

            return new OkResult();
        }
        else return new BadRequestResult();
    }
}