using System;
using System.Reflection;
using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Server.Database;

[assembly: FunctionsStartup(typeof(Server.Startup))]

namespace Server;

class Startup : FunctionsStartup
{
    public override void Configure(IFunctionsHostBuilder builder)
    {
        builder.Services.AddAutoMapper(Assembly.GetAssembly(this.GetType()));
        string connectionString = Environment.GetEnvironmentVariable("ConnectionString");
        builder.Services.AddDbContext<AppDbContext>(
            options => options.UseSqlite(@"Data Source=app.db;"));
    }
}