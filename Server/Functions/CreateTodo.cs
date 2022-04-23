using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Server.Database;
using Server.Models.Database;
using Server.Models.Dto;

namespace Server.Functions;

public class CreateTodo
{
    readonly AppDbContext _db;

    public CreateTodo(AppDbContext db)
    {
        _db = db;
    }

    [FunctionName("CreateTodo")]
    public async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = null)] HttpRequest req,
        ILogger log)
    {
        string requestBody = String.Empty;

        using (StreamReader streamReader = new StreamReader(req.Body))
            requestBody = await streamReader.ReadToEndAsync();

        var todoDto = JsonConvert.DeserializeObject<TodoDto>(requestBody);

        var todo = new Todo()
        {
            Value = todoDto.Value
        };

        await _db.AddAsync(todo);
        await _db.SaveChangesAsync();

        return new OkObjectResult(todo);
    }
}