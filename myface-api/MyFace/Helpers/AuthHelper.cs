using System;
using Microsoft.AspNetCore.Http;
using MyFace.Repositories;

namespace MyFace.Helpers;

public interface IAuthHelper
{
    (bool, string) IsAuthenticated(HttpRequest request);
}

public class AuthHelper : IAuthHelper
{
    private readonly IUsersRepo _users;

    public AuthHelper(IUsersRepo users)
    {
        _users = users;
    }
    public (bool, string) IsAuthenticated(HttpRequest request)
    {
        var hasAuthHeader = request.Headers.TryGetValue("Authorization", out var authHeader);

        if (!hasAuthHeader)
        {
            return (false, "Auth Header Error!");
        }

        if (!authHeader.ToString().StartsWith("Basic "))
        {
            return (false, "Auth Header Basic Not Found!");
        }

        var encodedData = authHeader.ToString().Split(" ")[1];
        var data = Convert.FromBase64String(encodedData);
        var decodedString = System.Text.Encoding.UTF8.GetString(data);
        var userName = decodedString.Split(":")[0];
        var password = decodedString.Split(":")[1];
        var authenticated = _users.VerifyUser(userName, password);

        return (authenticated, userName);
    }
}