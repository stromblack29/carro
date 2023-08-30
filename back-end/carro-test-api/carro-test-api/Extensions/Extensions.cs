using carro_test_api.Dtos;
using carro_test_api.Models;

namespace carro_test_api.Extensions
{
    public static class Extensions
    {
        public static UserDto AsDto (this User model)
        {
            return new UserDto(model.FullName, model.Gender, model.Telephone, model.UserName, model.UserPassword, model.Email, model.DateOfBirth);
        }
    }
}
