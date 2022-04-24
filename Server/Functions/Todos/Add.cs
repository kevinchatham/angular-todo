using System;
using System.IO;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Server.Database;
using Server.Models.Database;
using Server.Models.Dto;

namespace Server.Functions.Todos;

public class AddTodo
{
    readonly AppDbContext _db;
    readonly IMapper _mapper;

    public AddTodo(AppDbContext db, IMapper mapper)
    {
        _db = db;
        _mapper = mapper;
    }

    [FunctionName("AddTodo")]
    public async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "todo")] HttpRequest req,
        ILogger log)
    {
        var requestBody = await new StreamReader(req.Body).ReadToEndAsync();

        var todoDto = JsonConvert.DeserializeObject<TodoDto>(requestBody);

        var todo = _mapper.Map<Todo>(todoDto);

        await _db.Todos.AddAsync(todo);
        await _db.SaveChangesAsync();

        todoDto = _mapper.Map<TodoDto>(todo);

        return new OkObjectResult(todoDto);
    }
}