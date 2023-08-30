namespace carro_test_api.Models
{
    public class User
    {
        public Guid Id { get; set; }
        public string FullName { get; set; }
        public string Gender { get; set; }
        public string Telephone { get; set; }

        public string UserName { get; set; }
        public string UserPassword { get; set; }
        public string Email { get; set; }
        public DateTime DateOfBirth { get; set; }
    }
}
