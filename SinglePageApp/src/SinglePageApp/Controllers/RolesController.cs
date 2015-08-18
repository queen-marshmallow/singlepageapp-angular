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
    public class RolesController : Controller
    {
        private readonly AppDataContext _context;

        public RolesController(AppDataContext context)
        {
            _context = context;
        }
        // GET: api/values
        [HttpGet]
        public IEnumerable<PositionType> Get()
        {
            return _context.PositionTypes.ToList();
        }

    }
}
