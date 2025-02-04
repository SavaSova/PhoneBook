using System.Collections.Generic;
using System.Threading.Tasks;
using EyeRidePhoneBook.Server.Models;
using FluentValidation.Results;

namespace EyeRidePhoneBook.Server.Services.Interfaces
{
    public interface IContactService
    {
        Task<IEnumerable<Contact>> GetContactsAsync();
        Task<Contact?> GetContactOrNullByIdAsync(int id);
        Task<Contact> AddContactAsync(Contact contact);
        Task<bool> UpdateContactAsync(Contact contact);
        Task<bool> DeleteContactAsync(int id);
        Task<ValidationResult> ValidateContactAsync(Contact contact);
    }
}
