namespace BankOrders.Models.Details
{
    public class DetailFormApiModel
    {
        public int Id { get; set; }

        public string Branch { get; set; }

        public string CostCenter { get; set; }

        public string Project { get; set; }

        public string Reason { get; set; }

        public string Account { get; set; }

        public string AccountTypeName { get; set; }

        public decimal Sum { get; set; }

        public int CurrencyId { get; set; }

        public decimal SumBGN { get; set; }

        public int OrderOrTemplateRefNum { get; set; }
    }
}
