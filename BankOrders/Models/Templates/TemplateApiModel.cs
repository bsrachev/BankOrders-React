namespace BankOrders.Models.Templates
{
    using System;

    public class TemplateApiModel
    {
        public int Id { get; set; }

        public int RefNumber { get; set; }

        public string Name { get; set; }

        public string System { get; set; }

        public string UserCreate { get; set; }

        public int TimesUsed { get; set; }
    }
}
