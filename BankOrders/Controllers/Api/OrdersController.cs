using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BankOrders.Data;
using BankOrders.Data.Models;
using BankOrders.Services.Users;
using BankOrders.Models.Orders;
using BankOrders.Data.Models.Enums;

namespace BankOrders.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly BankOrdersDbContext _context;
        private readonly IUserService _users;

        public OrdersController(BankOrdersDbContext context, IUserService userService)
        {
            _context = context;
            _users = userService;

        }

        // GET: api/Orders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderApiModel>>> GetOrders()
        {
            var orders = new List<OrderApiModel>();

            foreach (var t in await _context.Orders.ToListAsync())
            {
                var userCreate = _users.GetUserInfo(t.UserCreateId).EmployeeNumber;
                var userApprove = t.UserApproveId == null ? null : _users.GetUserInfo(t.UserApproveId).EmployeeNumber;
                var userPosting = t.UserPostingId == null ? null : _users.GetUserInfo(t.UserPostingId).EmployeeNumber;
                var userApprovePosting = t.UserApprovePostingId == null ? null : _users.GetUserInfo(t.UserApprovePostingId).EmployeeNumber;

                orders.Add(new OrderApiModel
                {
                    Id = t.Id,
                    RefNumber = t.RefNumber,
                    System = Enum.GetName(typeof(OrderSystem), t.System),
                    UserCreate = userCreate,
                    UserApprove = userApprove,
                    UserPosting = userPosting,
                    UserApprovePosting = userApprovePosting,
                    AccountingDate = t.AccountingDate,
                    PostingNumber = t.PostingNumber,
                    Status = Enum.GetName(typeof(OrderStatus), t.Status)
                });
            }

            return orders;
        }

        // GET: api/Orders/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }

        // PUT: api/Orders/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOrder(int id, Order order)
        {
            if (id != order.Id)
            {
                return BadRequest();
            }

            _context.Entry(order).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
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

        // POST: api/Orders
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Order>> PostOrder(Order order)
        {
            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrder", new { id = order.Id }, order);
        }

        // DELETE: api/Orders/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OrderExists(int id)
        {
            return _context.Orders.Any(e => e.Id == id);
        }
    }
}
