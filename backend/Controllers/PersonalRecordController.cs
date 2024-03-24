using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MyApp.Namespace
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonalRecordController : ControllerBase
    {
        // GET: api/<PersonalRecord>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<PersonalRecord>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<PersonalRecord>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<PersonalRecord>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<PersonalRecord>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
