using carro_test_api.Context;
using carro_test_api.Interfaces;
using carro_test_api.Models;

namespace carro_test_api.Repository
{
    public class UserRepository : GenericRepository<User>, IUserRepository
    {
        public UserRepository(DataContext context) : base(context)
        {

        }
    }
}
