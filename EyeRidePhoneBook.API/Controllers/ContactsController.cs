using Microsoft.AspNetCore.Mvc;
using EyeRidePhoneBook.Server.Models;
using EyeRidePhoneBook.Server.Services.Interfaces;
using FluentValidation.Results;

namespace EyeRidePhoneBook.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactsController : ControllerBase
    {
        private readonly IContactService _contactService;

        public ContactsController(IContactService contactService)
        {
            _contactService = contactService;
        }

        // GET: api/Contacts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Contact>>> GetContacts()
        {
            var contacts = await _contactService.GetContactsAsync();
            return Ok(contacts);
        }

        // GET: api/Contacts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Contact>> GetContact(int id)
        {
            var contact = await _contactService.GetContactOrNullByIdAsync(id);

            if (contact == null)
            {
                return NotFound();
            }

            return Ok(contact);
        }

        // PUT: api/Contacts/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutContact(int id, Contact contact)
        {
            if (id != contact.Id)
            {
                return BadRequest(new { message = "Contact ID mismatch." });
            }

            ValidationResult validationResult = await _contactService.ValidateContactAsync(contact);
            if (!validationResult.IsValid)
            {
                return BadRequest(validationResult.Errors);
            }

            var updated = await _contactService.UpdateContactAsync(contact);
            if (!updated)
            {
                return NotFound();
            }

            return NoContent();
        }

        // POST: api/Contacts
        [HttpPost]
        public async Task<ActionResult<Contact>> PostContact(Contact contact)
        {
            ValidationResult validationResult = await _contactService.ValidateContactAsync(contact);
            if (!validationResult.IsValid)
            {
                return BadRequest(validationResult.Errors);
            }

            var createdContact = await _contactService.AddContactAsync(contact);
            return CreatedAtAction("GetContact", new { id = createdContact.Id }, createdContact);
        }

        // DELETE: api/Contacts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContact(int id)
        {
            var deleted = await _contactService.DeleteContactAsync(id);
            if (!deleted)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
