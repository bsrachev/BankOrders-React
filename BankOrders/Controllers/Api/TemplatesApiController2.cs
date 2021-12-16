namespace BankOrders.Controllers.Api
{
    using BankOrders.Data.Models.Enums;
    using BankOrders.Models.Details;
    using BankOrders.Models.Templates;
    using BankOrders.Services.Currencies;
    using BankOrders.Services.Details;
    using BankOrders.Services.Templates;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using System;
    using System.Collections.Generic;

    [ApiController]
    [Route("api/templates2")]
    public class TemplatesApiController2 : ControllerBase
    {
        private readonly ITemplateService templateService;
        private readonly IDetailService detailService;
        private readonly ICurrencyService currencyService;

        public TemplatesApiController2(
            ITemplateService templateService, 
            IDetailService detailService,
            ICurrencyService currencyService)
        { 
            this.templateService = templateService;
            this.detailService = detailService;
            this.currencyService = currencyService;
        }

        [HttpGet]
        //[Authorize]
        public IEnumerable<TemplateApiModel> GetAllTemplates()
        {
            var templates = this.templateService.GetAllTemplates();

            var templatesToReturn = new List<TemplateApiModel>();

            foreach (var t in templates)
            {
                var template = new TemplateApiModel
                {
                    Id = t.Id,
                    RefNumber = t.RefNumber,
                    UserCreate = t.UserCreateId,
                    Name = t.Name,
                    TimesUsed = t.TimesUsed,
                    System = Enum.GetName(typeof(OrderSystem), t.System)
                };

                templatesToReturn.Add(template);
            }

            return templatesToReturn;
        }

        [HttpGet("{id}")]
        public IEnumerable<DetailApiModel> GetDetails(int templateId)
        {
            var template = this.templateService.GetTemplateInfo(templateId);

            var templateDetails = this.detailService.GetDetails(template.RefNumber);

            var detailsToReturn = new List<DetailApiModel>();

            foreach (var td in templateDetails)
            {
                var detail = new DetailApiModel
                {
                    Account = td.Account,
                    AccountTypeName = Enum.GetName(typeof(AccountType), td.AccountType),
                    Branch = td.Branch,
                    CostCenter = td.CostCenter,
                    CurrencyName = this.currencyService.GetCurrencyInfo(td.CurrencyId).Code,
                    Project = td.Project,
                    Reason = td.Reason,
                    Sum = td.Sum,
                    SumBGN = td.SumBGN
                };

                detailsToReturn.Add(detail);
            }

            return detailsToReturn;
        }
    }
}
