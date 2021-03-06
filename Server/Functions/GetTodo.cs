using System.Collections.Generic;
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

public class GetTodo
{
    readonly AppDbContext _db;
    readonly IMapper _mapper;

    public GetTodo(AppDbContext db, IMapper mapper)
    {
        _db = db;
        _mapper = mapper;
    }

    [FunctionName("GetTodo")]
    public async Task<IActionResult> Run(
        [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = null)] HttpRequest req,
        ILogger log)
    {
        var todos = await _db.Todos.ToListAsync();

        var dtos = _mapper.Map<List<TodoDto>>(todos);

        return new OkObjectResult(dtos);
    }
}