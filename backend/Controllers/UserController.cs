using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using FitnessTracker.backend.models;

namespace MyApp.Namespace
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private string cs {get; set;}

        public UserController(){
            cs = new ConnectionString().cs;
        }
        // GET: api/<User>
        [HttpGet]
        public IEnumerable<User> Get()
        {
            List<User> users = new List<User>();

             try
            {
                using (MySqlConnection connection = new MySqlConnection(cs))
                {
                    connection.Open();
                    using (MySqlCommand command = new MySqlCommand("SELECT * FROM user", connection))
                    {
                        using (MySqlDataReader reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                users.Add(new User
                                {
                                    id = Convert.ToInt32(reader["id"]),
                                    username = Convert.ToString(reader["username"]),
                                    password = Convert.ToString(reader["password"]),
                                    firstname = Convert.ToString(reader["firstname"]),
                                    lastname = Convert.ToString(reader["lastname"]),
                                    dateOfBirth = Convert.ToString(reader["dateOfBirth"]),
                                    signUpDate = Convert.ToDateTime(reader["signUpDate"]),
                                    height = Convert.ToDouble(reader["height"]),
                                    weight = Convert.ToDouble(reader["weight"]),
                                    bodyFatPct = Convert.ToDouble(reader["bodyFatPct"]),
                                    measurementSystem = Convert.ToString(reader["measurementSystem"]),
                                    pictureLink = Convert.ToString(reader["pictureLink"]),
                                    caloriesToday = Convert.ToInt32(reader["caloriesToday"]),
                                    targetWeight = Convert.ToDouble(reader["targetWeight"]),
                                    targetCalories = Convert.ToInt32(reader["targetCalories"]),
                                    targetBfp = Convert.ToDouble(reader["targetBfp"])
                                });
                            }
                        }
                    }
                    connection.Close();
                }

                return users;
            }
            catch (Exception ex)
            {
                // Log the exception details (you can replace Console.WriteLine with your logging mechanism)
                Console.WriteLine($"Error in GetAllGames: {ex.Message}");

                // Return an empty list or handle the error appropriately
                return new List<User>();
            }
        }

        // GET api/<User>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<User>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<User>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<User>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
