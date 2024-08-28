using System;
using API.Data;
using API.Interfaces;
using API.Services;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions;

// Extension methods are static, we can use the methods within this class without creating a new instance of it
public static class ApplicationServiceExtensions
{
    public static IServiceCollection AddApplicationServices(
        this IServiceCollection services,
        IConfiguration config
    )
    {
        services.AddControllers();
        services.AddDbContext<DataContext>(opt =>
        {
            opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
        });
        services.AddCors();
        // Lifetime of a service:
        // Singleton maintains a state that should be shared accross the app
        // Transient are created everytime they are requested, lightweight stateless services
        // Scoped are created once per client request (http) and when the req is
        // https://learn.microsoft.com/en-us/dotnet/core/extensions/dependency-injection#service-lifetimes
        services.AddScoped<ITokenService, TokenService>();

        return services;
    }
}
