namespace BankOrders.Models.Orders
{
    using System;

    public class OrderApiModel
    {
        public int Id { get; set; }

        public int RefNumber { get; set; }

        public string System { get; set; }

        public string UserCreate { get; set; }

        public DateTime AccountingDate { get; set; }

        public string UserApprove { get; set; }

        public string UserPosting { get; set; }

        public string UserApprovePosting { get; set; }

        public string Status { get; set; }

        public int PostingNumber { get; set; }
    }
}
