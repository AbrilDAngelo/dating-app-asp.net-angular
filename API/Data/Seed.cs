using System;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class Seed
{
    public static async Task SeedUsers(DataContext context)
    {
        // AnyAsync returns true if there are any users
        if (await context.Users.AnyAsync())
            return;

        // Read JSON file and deserialize JSON into to an AppUser object
        var userData = await File.ReadAllTextAsync("Data/UserSeedData.json");

        var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };

        // When deserialize the JSON into C# we create new instances of the AppUser object
        var users = JsonSerializer.Deserialize<List<AppUser>>(userData, options);

        if (users == null)
            return;

        foreach (var user in users)
        {
            using var hmac = new HMACSHA512();

            user.UserName = user.UserName.ToLower();
            user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("Pa$$w0rd"));
            user.PasswordSalt = hmac.Key;

            // Entity framework begins tracking the entity when Add() is called
            // More info on EF change tracking https://learn.microsoft.com/en-us/ef/core/change-tracking/
            context.Users.Add(user);
        }

        // Save the changes made in this context into the database
        await context.SaveChangesAsync();
    }
}
