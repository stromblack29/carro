namespace carro_test_api.Dtos
{
   public record UserDto(string Name, string Gender, string Telephone, string UserName, string UserPassword, string Email, DateTime DateOfBirth);

   public record UserLogin(string UserName, string UserPassword);

}
