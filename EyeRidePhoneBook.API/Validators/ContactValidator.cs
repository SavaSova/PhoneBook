using EyeRidePhoneBook.Server.Models;
using FluentValidation;

namespace EyeRidePhoneBook.Server.Validators
{
    public class ContactValidator : AbstractValidator<Contact>
    {
        public ContactValidator() 
        {            
            RuleFor(x => x.Name)
                .NotEmpty().WithMessage("Name is required.");

            RuleFor(x => x.PhoneNumber)
                .Matches(@"^\+?\d{5,15}$")
                .WithMessage("Invalid phone number.");

            RuleFor(x => x.ContactType)
                .NotEmpty().WithMessage("ContactType is required.")
                .Must(contactType => contactType == "Person" || contactType == "Private" || contactType == "Public")
                .WithMessage("ContactType must be 'Person', 'Private', or 'Public'.");
            
            RuleFor(x => x.FieldOfActivity)
                .NotEmpty().WithMessage("Field of activity is required when ContactType is Public.")
                .When(x => x.ContactType == "Public");

            RuleFor(x => x.TIN)
                .NotEmpty().WithMessage("TIN is required when ContactType is Public.")
                .When(x => x.ContactType == "Public");

            RuleFor(x => x.Industry)
                .NotEmpty().WithMessage("Industry is required when ContactType is Privat.")
                .When(x => x.ContactType == "Private");

            RuleFor(x => x.EIN)
                .NotEmpty().WithMessage("EIN is required when ContactType is Privat.")
                .When(x => x.ContactType == "Private");
        }
    }
}
