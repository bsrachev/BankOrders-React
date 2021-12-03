namespace BankOrders.Controllers.Api
{
    using BankOrders.Data.Models.Enums;
    using BankOrders.Models.Details;
    using BankOrders.Models.Orders;
    using BankOrders.Services.Currencies;
    using BankOrders.Services.Details;
    using BankOrders.Services.Orders;
    using BankOrders.Services.Templates;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using System;
    using System.Collections.Generic;

    [ApiController]
    [Route("api/orders")]
    public class OrdersApiController : ControllerBase
    {
        private readonly IOrderService orderService;
        private readonly IDetailService detailService;
        private readonly ICurrencyService currencyService;

        public OrdersApiController(
            IOrderService orderService,
            IDetailService detailService,
            ICurrencyService currencyService)
        {
            this.orderService = orderService;
            this.detailService = detailService;
            this.currencyService = currencyService;
        }

        [HttpGet]
        //[Authorize]
        public IEnumerable<OrderApiModel> GetAllOrders()
        {
            var orders = this.orderService.GetAllOrders();

            var ordersToReturn = new List<OrderApiModel>();

            foreach (var o in orders)
            {
                var order = new OrderApiModel
                {
                    AccountingDate = o.AccountingDate,
                    Id = o.Id,
                    RefNumber = o.RefNumber,
                    UserCreate = o.UserCreateId,
                    UserApprove = o.UserApproveId,
                    UserPosting = o.UserPostingId,
                    UserApprovePosting = o.UserApprovePostingId,
                    PostingNumber = o.PostingNumber,
                    Status = Enum.GetName(typeof(OrderStatus), o.Status),
                    System = Enum.GetName(typeof(OrderSystem), o.System),
                };

                ordersToReturn.Add(order);
            }

            return ordersToReturn;
        }

        /*
        [HttpGet]
        [Authorize]
        public IEnumerable<DetailApiModel> GetDetails(int orderId)
        {
            var order = this.orderService.GetOrderInfo(orderId);

            var orderDetails = this.detailService.GetDetails(order.RefNumber);

            var detailsToReturn = new List<DetailApiModel>();

            foreach (var od in orderDetails)
            {
                var detail = new DetailApiModel
                {
                    Account = od.Account,
                    AccountTypeName = Enum.GetName(typeof(AccountType), od.AccountType),
                    Branch = od.Branch,
                    CostCenter = od.CostCenter,
                    CurrencyName = this.currencyService.GetCurrencyInfo(od.CurrencyId).Code,
                    Project = od.Project,
                    Reason = od.Reason,
                    Sum = od.Sum,
                    SumBGN = od.SumBGN
                };

                detailsToReturn.Add(detail);
            }

            return detailsToReturn;
        }
        */
    }
}
