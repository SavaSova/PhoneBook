using EyeRidePhoneBook.Server.Models;
using EyeRidePhoneBook.Server.Services.Interfaces;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.EntityFrameworkCore;

namespace EyeRidePhoneBook.Server.Services
{
    public class ContactService : IContactService
    {
        private readonly ContactContext _context;
        private readonly IValidator<Contact> _validator;

        public ContactService(ContactContext context, IValidator<Contact> validator)
        {
            _context = context;
            _validator = validator;
        }

        public async Task<IEnumerable<Contact>> GetContactsAsync()
        {
            return await _context.Contacts.ToListAsync();
        }

        public async Task<Contact?> GetContactOrNullByIdAsync(int id)
        {
            return await _context.Contacts.FindAsync(id);
        }

        public async Task<ValidationResult> ValidateContactAsync(Contact contact)
        {
            return await _validator.ValidateAsync(contact);
        }

        public async Task<Contact> AddContactAsync(Contact contact)
        {
            var validationResult = await ValidateContactAsync(contact);
            if (!validationResult.IsValid)
            {
                throw new ValidationException(validationResult.Errors);
            }

            _context.Contacts.Add(contact);
            await _context.SaveChangesAsync();
            return contact;
        }

        public async Task<bool> UpdateContactAsync(Contact contact)
        {
            var validationResult = await ValidateContactAsync(contact);
            if (!validationResult.IsValid)
            {
                throw new ValidationException(validationResult.Errors);
            }

            _context.Entry(contact).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                return true;
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ContactExists(contact.Id))
                {
                    return false;
                }
                else
                {
                    throw;
                }
            }
        }

        public async Task<bool> DeleteContactAsync(int id)
        {
            var contact = await _context.Contacts.FindAsync(id);
            if (contact == null)
            {
                return false;
            }

            _context.Contacts.Remove(contact);
            await _context.SaveChangesAsync();

            return true;
        }

        private bool ContactExists(int id)
        {
            return _context.Contacts.Any(e => e.Id == id);
        }
    }
}
