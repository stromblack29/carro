using carro_test_api.Dtos;
using carro_test_api.Email;
using carro_test_api.Extensions;
using carro_test_api.Interfaces;
using carro_test_api.Models;
using Microsoft.AspNetCore.Mvc;

namespace carro_test_api.Controllers
{
    
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly ILogger<UserController> _logger;
        private readonly IEmailSender _emailSender;
        public UserController(ILogger<UserController> logger, IUserRepository userRepository, IEmailSender emailSender) 
        {
            _logger= logger;
            _userRepository= userRepository;
            _emailSender =  emailSender;
        }

        [HttpGet]
        public ActionResult<IEnumerable<UserDto>> GetAll ()
        {
            try
            {
                var result = _userRepository.GetAll().Take(5).Select(x => x.AsDto()).AsEnumerable();
                return Ok(result);
            }
            catch (Exception ex) 
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.ToString());
            }
        }

        [HttpPost]
        [Route("register")]
        public ActionResult<User> Register([FromBody] UserDto reqUser)
        {
            try
            {
                User row = new User() { Id = new Guid(), FullName = reqUser.Name, Gender = reqUser.Gender, Telephone = reqUser.Telephone, Email = reqUser.Email, DateOfBirth = reqUser.DateOfBirth, UserName = reqUser.UserName, UserPassword = reqUser.UserPassword } ;
                _userRepository.Insert(row);
                _userRepository.Save();
                try
                {
                    var message = new Message(new string[] { reqUser.Email }, "Test email", "This is the content from our email.");
                    _emailSender.SendEmail(message);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, ex.ToString());
                }
                return Ok(row);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.ToString());
            }
        }

        [HttpPost]
        [Route("login")]
        public ActionResult<UserDto> Login([FromBody] UserLogin reqUser)
        {
            try
            {
                var row = _userRepository.GetAll().Where(x => x.UserName == reqUser.UserName && x.UserPassword == reqUser.UserPassword).FirstOrDefault();
                if (row == null) return StatusCode(StatusCodes.Status404NotFound);
                return Ok(row);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.ToString());
            }
        }
    }
}
