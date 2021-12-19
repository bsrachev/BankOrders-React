namespace BankOrders.Models.Users
{
    using static Data.DataConstants.User;

    using System.ComponentModel.DataAnnotations;

    public class RegisterModel
    {
        [Required(ErrorMessage = "User Name is required")]
        [RegularExpression(@"(BO\d{3})")] //TODO 6
        public string EmployeeNumber { get; set; }

        [Required(ErrorMessage = "User Name is required")]
        [MaxLength(FullNameMaxLength)]
        public string FullName { get; set; }

        [EmailAddress]
        [Required(ErrorMessage = "Email is required")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; }

        [Required(ErrorMessage = "Confirm Password is required")]
        public string ConfirmPassword { get; set; }
    }
}
