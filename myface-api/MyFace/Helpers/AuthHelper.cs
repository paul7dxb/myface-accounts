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
        var userName = decodedString.Split(":")[0];
        var password = decodedString.Split(":")[1];
        var authenticated = _users.VerifyUser(userName, password);
        var user = _users.GetUserByUsername(userName);


        return (authenticated, user.Id);
    }
}