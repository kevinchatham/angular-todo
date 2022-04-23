using System;
using System.IO;
using System.Threading.Tasks;
using AutoMapper;
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
    readonly IMapper _mapper;

    public CreateTodo(AppDbContext db, IMapper mapper)
    {
        _db = db;
        _mapper = mapper;
    }

    [FunctionName("CreateTodo")]
    public async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = null)] HttpRequest req,
        ILogger log)
    {
        string requestBody = String.Empty;

        using (StreamReader streamReader = new StreamReader(req.Body))
            requestBody = await streamReader.ReadToEndAsync();

        var dto = JsonConvert.DeserializeObject<TodoDto>(requestBody);

        var todo = _mapper.Map<Todo>(dto);
        todo.CreatedUtc = DateTime.UtcNow;

        await _db.AddAsync(todo);
        await _db.SaveChangesAsync();

        dto = _mapper.Map<TodoDto>(todo);

        return new OkObjectResult(dto);
    }
}