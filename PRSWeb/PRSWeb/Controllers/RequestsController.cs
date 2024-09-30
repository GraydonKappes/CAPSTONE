using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PRSWeb.Models;

namespace PRSWeb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RequestsController : ControllerBase
    {
        private readonly prsdbContext _context;

        public RequestsController(prsdbContext context)
        {
            _context = context;
        }

        // GET: api/Requests
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Request>>> GetRequests()
        {
            return await _context.Requests.ToListAsync();
        }

        // GET: api/Requests/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Request>> GetRequest(int id)
        {
            var request = await _context.Requests.FindAsync(id);

            if (request == null)
            {
                return NotFound();
            }

            return request;
        }

        // PUT: api/Requests/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutRequest(int id, Request request)
        {
            if (id != request.Id)
            {
                return BadRequest();
            }

            _context.Entry(request).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RequestExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Requests
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Request>> PostRequest(RequestForm requestForm)
        {
            Request request = new Request();
            request.UserId = requestForm.UserId;
            request.RequestNumber = GenerateRequestNumber();
            request.Description = requestForm.Description;
            request.Justification = requestForm.Justification;
            request.DateNeeded = requestForm.DateNeeded;
            request.DeliveryMode = requestForm.DeliveryMode;
            request.Status = "NEW";
            request.Total = 0.0m;
            request.SubmittedDate = DateTime.Now;

            _context.Requests.Add(request);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRequest", new { id = request.Id }, request);
        }

        private string GenerateRequestNumber()
        {
            //todays date and format
            string today = DateTime.Now.ToString("yyMMdd");
            //how many request have been added today
            int count = _context.Requests.Count(r => r.RequestNumber.StartsWith($"REQ{today}"));
            //increment that mug
            int requestNumber = count + 1;

            //format the request numba
            return $"REQ{today}{requestNumber:D2}";
        }

        // DELETE: api/Requests/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRequest(int id)
        {
            var request = await _context.Requests.FindAsync(id);
            if (request == null)
            {
                return NotFound();
            }

            _context.Requests.Remove(request);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool RequestExists(int id)
        {
            return _context.Requests.Any(e => e.Id == id);
        }



        [HttpPut("review/submit/{id}")]
        public async Task<IActionResult> RequestSubmitReview(int id)
        {
            var request = await _context.Requests.FindAsync(id);
            if (request == null) {
                return NotFound();
            }

            // TODO: Special Requirement for requests totals under $50 - skip for now - Sean to provide

            request.Status = "REVIEW";

            try {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) {
                throw;
            }

            return NoContent();
        }
        //api/Requests/review/id
        [HttpGet("review/list")]
        public async Task<ActionResult<IEnumerable<Request>>> GetReviewRequests()
        {
            return await _context.Requests
                .Where(r => r.Status == "REVIEW")
                .ToListAsync();
        }

        [HttpPut("review/approve/{id}")]
        public async Task<IActionResult> RequestApprove(int id)
        {
            var request = await _context.Requests.FindAsync(id);
            if (request == null) {
                return NotFound();
            }

            request.Status = "APPROVED";

            try {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) {
                throw;
            }

            return NoContent();
        }
        [HttpPut("review/reject/{id}")]
        public async Task<IActionResult> RequestReject(int id)
        {
            var request = await _context.Requests.FindAsync(id);
            if (request == null) {
                return NotFound();
            }

            request.Status = "REJECTED";

            try {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException) {
                throw;
            }

            return NoContent();
        }
    }
}
