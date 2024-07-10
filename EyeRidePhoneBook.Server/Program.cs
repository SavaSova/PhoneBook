using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using EyeRidePhoneBook.Server.Models;
using EyeRidePhoneBook.Server.Services.Interfaces;
using EyeRidePhoneBook.Server.Services;
using EyeRidePhoneBook.Server.Validators;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

// DB conecting
builder.Services.AddDbContext<ContactContext>(
    options => options.UseNpgsql(
        builder.Configuration.GetConnectionString("WebApiDatabase")));

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// ContactService
builder.Services.AddScoped<IContactService, ContactService>();

// ContactValidator
IServiceCollection serviceCollection = builder.Services.AddFluentValidation(fv => fv.RegisterValidatorsFromAssemblyContaining<ContactValidator>());
builder.Services.AddTransient<IValidator<Contact>, ContactValidator>();


// Add Cors
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp",
        builder => builder.WithOrigins("https://localhost:4200")
                          .AllowAnyHeader()
                          .AllowAnyMethod());
});

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

app.UseCors("AllowAngularApp");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();

app.MapControllers();
app.MapFallbackToFile("/index.html");

app.Run();
