using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using FitnessTracker.backend.models;

namespace MyApp.Namespace
{
    [Route("api/[controller]")]
    [ApiController]
    public class MealController : ControllerBase
    {
        private string cs {get; set;}

        public MealController(){
            cs = new ConnectionString().cs;
        }
        // GET: api/<Meal>
        [HttpGet]
        public IEnumerable<Meal> Get()
        {
        
            List<Meal> meals = new List<Meal>();

             try
            {
                using (MySqlConnection connection = new MySqlConnection(cs))
                {
                    connection.Open();
                    using (MySqlCommand command = new MySqlCommand("SELECT * FROM meal", connection))
                    {
                        using (MySqlDataReader reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                meals.Add(new Meal
                                {
                                    id = Convert.ToInt32(reader["id"]),
                                    userID = Convert.ToInt32(reader["userID"]),
                                    name = Convert.ToString(reader["name"]),
                                    description = Convert.ToString(reader["description"]),
                                    calories = Convert.ToInt32(reader["calories"]),
                                    dateCreated = Convert.ToDateTime(reader["dateCreated"]),
                                    protein = Convert.ToInt32(reader["protein"]),
                                    carbs = Convert.ToInt32(reader["carbs"]),
                                    fats = Convert.ToInt32(reader["fats"]),
                                    sugar = Convert.ToInt32(reader["sugar"]),
                                    mealType = Convert.ToString(reader["mealType"])
                                });
                            }
                        }
                    }
                    connection.Close();
                }

                return meals;
            }
            catch (Exception ex)
            {
                // Log the exception details (you can replace Console.WriteLine with your logging mechanism)
                Console.WriteLine($"Error in GetAllGames: {ex.Message}");

                // Return an empty list or handle the error appropriately
                return new List<Meal>();
            }
        }

        // GET api/<Meal>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<Meal>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<Meal>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<Meal>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
