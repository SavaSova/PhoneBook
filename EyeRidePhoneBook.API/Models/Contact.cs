namespace EyeRidePhoneBook.Server.Models
{
    public class Contact
    {
        //All
        public int Id { get; set; }
        public string? ContactType { get; set; }
        public string? Name { get; set; }
        public string? PhoneNumber { get; set; }
        public string? TextComments { get; set; }

        //Public
        public string? FieldOfActivity { get; set; }
        public string? TIN { get; set; }

        //Privat
        public string? Industry { get; set; }
        public string? EIN { get; set; }        
    }
}
