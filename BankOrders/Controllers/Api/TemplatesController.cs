using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BankOrders.Data;
using BankOrders.Data.Models;
using BankOrders.Models.Orders;
using BankOrders.Models.Templates;
using BankOrders.Services.Users;
using BankOrders.Data.Models.Enums;
using BankOrders.Services.Templates;
using BankOrders.Services.Details;

namespace BankOrders.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class TemplatesController : ControllerBase
    {
        private readonly BankOrdersDbContext _context;
        private readonly IUserService _users;
        private readonly ITemplateService _templates; 
        private readonly IDetailService _details;

        public TemplatesController(
            BankOrdersDbContext context, 
            IUserService userService, 
            ITemplateService templateService,
            IDetailService detailService)
        {
            _context = context;
            _users = userService;
            _templates = templateService;
            _details = detailService;
        }

        // GET: api/Templates
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TemplateApiModel>>> GetTemplates()
        {
            var templates = new List<TemplateApiModel>();

            foreach (var t in await _context.Templates.ToListAsync())
            {
                var userCreate = _users.GetUserInfo(t.UserCreateId).EmployeeNumber;

                templates.Add(new TemplateApiModel
                {
                    Id = t.Id,
                    RefNumber = t.RefNumber,
                    Name = t.Name,
                    System = Enum.GetName(typeof(OrderSystem), t.System),
                    UserCreate = userCreate,
                    TimesUsed = t.TimesUsed
                });
            }

            return templates;
        }

        // GET: api/Templates/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TemplateApiModel>> GetTemplate(int id)
        {
            var templateData = await _context.Templates.FindAsync(id);

            if (templateData == null)
            {
                return NotFound();
            }

            var userCreate = _users.GetUserInfo(templateData.UserCreateId).EmployeeNumber;

            var template = new TemplateApiModel
            {
                Id = templateData.Id,
                Name = templateData.Name,
                RefNumber = templateData.RefNumber,
                System = Enum.GetName(typeof(OrderSystem), templateData.System),
                TimesUsed = templateData.TimesUsed,
                UserCreate = userCreate
            };

            return template;
        }

        // PUT: api/Templates/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> CopyDetails(int id, TemplateApiModel template)
        {
            if (template.Id == 0)
            {
                return BadRequest();
            }

            _details.CopyFromTemplate(id, template.Id);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TemplateExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Templates
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Template>> PostTemplate(TemplateApiModel templateModel)
        {
            var userCreateId = _users.GetUserIdByEmployeeNumber(templateModel.UserCreate);

            var template = new Template
            {
                Name = templateModel.Name,
                System = (OrderSystem)Enum.Parse(typeof(OrderSystem), templateModel.System, true),
                UserCreateId = userCreateId
            };

            _context.Templates.Add(template);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTemplate", new { id = template.Id }, template);
        }

        // DELETE: api/Templates/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTemplate(int id)
        {
            var template = await _context.Templates.FindAsync(id);
            if (template == null)
            {
                return NotFound();
            }

            _context.Templates.Remove(template);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TemplateExists(int id)
        {
            return _context.Templates.Any(e => e.Id == id);
        }
    }
}
