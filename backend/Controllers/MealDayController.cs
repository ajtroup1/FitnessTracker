using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MyApp.Namespace
{
    [Route("api/[controller]")]
    [ApiController]
    public class MealDayController : ControllerBase
    {
        // GET: api/<MealDay>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<MealDay>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<MealDay>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<MealDay>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<MealDay>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
