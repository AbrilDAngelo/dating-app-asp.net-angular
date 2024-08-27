namespace API.Entities;

public class AppUser
{
    // Entity framework can only access public properties
    // Id will be the primary key. If there's no Id, you have to specify he primary key using [key]
    public int Id { get; set; }
    public required string UserName { get; set; }
    public required byte[] PasswordHash { get; set; }
    public required byte[] PasswordSalt { get; set; }
}
 