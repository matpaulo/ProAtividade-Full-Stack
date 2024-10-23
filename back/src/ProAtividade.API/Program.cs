using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Converters;
using ProAtividade.Data.Context;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers()
    .AddNewtonsoftJson(options =>
    {
        options.SerializerSettings.Converters.Add(new StringEnumConverter());
    });

builder.Services.AddDbContext<DataContext>(
    options => options.UseSqlite(builder.Configuration.GetConnectionString("Default")) // configurando o SQLite
);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1");
        options.RoutePrefix = string.Empty;
    });
}

app.UseCors(option => option.AllowAnyOrigin()
                            .AllowAnyHeader()
                            .AllowAnyMethod());

app.UseHttpsRedirection();

app.MapControllers();

app.Run();
