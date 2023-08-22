using MyFace.Models.Database;

namespace MyFace.Models.Response
{
    public class RoleResponse
    {
        public Role Role {get;}
        public RoleResponse (bool isAdmin)
        {
            if(isAdmin)
            {
                Role = Role.ADMIN;
            }
            else
            {
                Role = Role.MEMBER;
            }
        }
    }




}