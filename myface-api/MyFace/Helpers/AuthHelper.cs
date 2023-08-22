using System;
using Microsoft.AspNetCore.Http;
using MyFace.Repositories;

namespace MyFace.Helpers;

public interface IAuthHelper
{
    (bool, int) IsAuthenticated(HttpRequest request);
}

public class AuthHelper : IAuthHelper
{
    private readonly IUsersRepo _users;

    public AuthHelper(IUsersRepo users)
    {
        _users = users;
    }
    public (bool, int) IsAuthenticated(HttpRequest request)
    {
        var hasAuthHeader = request.Headers.TryGetValue("Authorization", out var authHeader);

        if (!hasAuthHeader)
        {
            return (false, 400);
        }

        if (!authHeader.ToString().StartsWith("Basic "))
        {
            return (false, 400);
        }

        var encodedData = authHeader.ToString().Split(" ")[1];
        var data = Convert.FromBase64String(encodedData);
        var decodedString = System.Text.Encoding.UTF8.GetString(data);

        var splitString = decodedString.Split(":");
        if(splitString.Length < 2)
        {
            return (false, 400);
        }

        string password;

        //firstuser:password:123

        if(splitString.Length > 2)
        {
            string tempP = "";
            for(int i = 1; i < splitString.Length -1; i++ )
            {
                tempP += splitString[i] + ":";
            } 
            tempP += splitString[splitString.Length - 1];
            password = tempP;
        } else
        {
            password = decodedString.Split(":")[1];
        }
        var userName = decodedString.Split(":")[0];

        Console.WriteLine($"Username: {userName}");
        Console.WriteLine($"Password: {password}");

        var authenticated = _users.VerifyUser(userName, password);
        var user = _users.GetUserByUsername(userName);


        return (authenticated, user.Id);
    }
}