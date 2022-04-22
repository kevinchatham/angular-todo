using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Host.Config;
using Microsoft.Azure.WebJobs.Hosting;
using Microsoft.Extensions.DependencyInjection;

[assembly: WebJobsStartup(typeof(Server.Database.AppDbInit))]

namespace Server.Database;

public class AppDbInit : IWebJobsStartup
{
    public void Configure(IWebJobsBuilder builder)
    {
        builder.AddExtension<DbSeedConfigProvider>();
    }
}

internal class DbSeedConfigProvider : IExtensionConfigProvider
{
    private readonly IServiceScopeFactory _scopeFactory;

    public DbSeedConfigProvider(IServiceScopeFactory scopeFactory)
    {
        _scopeFactory = scopeFactory;
    }

    public void Initialize(ExtensionConfigContext context)
    {
        using var scope = _scopeFactory.CreateScope();
        var dbContext = scope.ServiceProvider.GetService<AppDbContext>();
        dbContext.Database.EnsureCreated();
    }
}