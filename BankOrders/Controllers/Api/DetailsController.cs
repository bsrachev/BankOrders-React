﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BankOrders.Data;
using BankOrders.Data.Models;
using BankOrders.Services.Details;
using BankOrders.Models.Details;
using BankOrders.Data.Models.Enums;
using BankOrders.Services.Currencies;

namespace BankOrders.Controllers.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class DetailsController : ControllerBase
    {
        private readonly BankOrdersDbContext _context;
        private readonly IDetailService _details;
        private readonly ICurrencyService _currencies;

        public DetailsController(BankOrdersDbContext context, IDetailService detailService, ICurrencyService currencyService)
        {
            _context = context;
            _details = detailService;
            _currencies = currencyService;
        }

        // GET: api/Details
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DetailApiModel>>> GetDetails()
        {
            var detailData = await _context.Details.ToListAsync();

            var details = detailData
                .Select(d => new DetailApiModel
                {
                    Id = d.Id,
                    Account = d.Account,
                    AccountTypeName = Enum.GetName(typeof(AccountType), d.AccountType),
                    Branch = d.Branch,
                    CostCenter = d.CostCenter,
                    CurrencyId = d.CurrencyId,
                    CurrencyName = _currencies.GetCurrencyInfo(d.CurrencyId).Code,
                    Project = d.Project,
                    Reason = d.Reason,
                    Sum = d.Sum,
                    SumBGN = d.SumBGN,
                    OrderOrTemplateRefNum = d.OrderOrTemplateRefNum
                })
                .ToList();

            return details;
        }

        // GET: api/Details/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Detail>> GetDetail(int id)
        {
            var detail = await _context.Details.FindAsync(id);

            if (detail == null)
            {
                return NotFound();
            }

            return detail;
        }

        // PUT: api/Details/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDetail(int id, Detail detail)
        {
            if (id != detail.Id)
            {
                return BadRequest();
            }

            _context.Entry(detail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DetailExists(id))
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

        // POST: api/Details
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Detail>> PostDetail(Detail detail)
        {
            _context.Details.Add(detail);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDetail", new { id = detail.Id }, detail);
        }

        // DELETE: api/Details/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDetail(int id)
        {
            var detail = await _context.Details.FindAsync(id);
            if (detail == null)
            {
                return NotFound();
            }

            _context.Details.Remove(detail);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DetailExists(int id)
        {
            return _context.Details.Any(e => e.Id == id);
        }
    }
}
