using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Server.Database;
using Server.Models.Dto;

namespace Server.Functions;

public class CompleteTodo
{
    readonly AppDbContext _db;
    readonly IMapper _mapper;

    public CompleteTodo(AppDbContext db, IMapper mapper)
    {
        _db = db;
        _mapper = mapper;
    }

    [FunctionName("CompleteTodo")]
    public async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = null)] HttpRequest req,
        ILogger log)
    {
        string queryId = req.Query["id"];

        var id = Guid.Parse(queryId);

        var todo = await _db.Todos.SingleAsync(x => x.Id.Equals(id));

        if (!todo.Completed)
        {
            todo.CompletedUtc = DateTime.UtcNow;
            _db.Update(todo);
            await _db.SaveChangesAsync();
        }

        var dto = _mapper.Map<TodoDto>(todo);

        return new OkObjectResult(dto);
    }
}