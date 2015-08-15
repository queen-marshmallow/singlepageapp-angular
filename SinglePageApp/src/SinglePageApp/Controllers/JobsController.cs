using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using SinglePageApp.Data.Models;
using SinglePageApp.Data;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace SinglePageApp.Controllers
{
    [Route("api/[controller]")]
    public class JobsController : Controller
    {
        private readonly AppDataContext _context;
        public JobsController(AppDataContext context)
        {
            _context = context;
        }
        // GET: api/values
        [HttpGet]
        public IEnumerable<Job> Get()
        {
            return _context.Set<Job>().ToList();
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]Job value)
        {
            //TODO: fill in manager details from claims...
            var user = _context.Set<User>().FirstOrDefault(t => t.UserPrincipalName == "mafletch@microsoft.com");
            if (user == null)
            {
                user = new User
                {
                    UserPrincipalName = "mafletch@microsoft.com"
                };
                _context.Set<User>().Add(user);
            }
            value.CreatedBy = user;
            value.CreatedOn = DateTime.UtcNow;
            _context.Set<Job>().Add(value);
        }
    }
}
