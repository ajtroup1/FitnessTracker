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
                                    targetBfp = Convert.ToDouble(reader["targetBfp"]),
                                    lastDayCalories = Convert.ToDateTime(reader["lastDayCalories"])
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
        public string Post([FromBody] User myUser)
        {
            try
            {
                using (MySqlConnection connection = new MySqlConnection(cs))
                {
                    connection.Open();
                    using (MySqlCommand command = new MySqlCommand(
                        "INSERT INTO user (username, password, firstname, lastname, dateOfBirth, signUpDate, height, weight, bodyFatPct, measurementSystem, pictureLink, caloriesToday, targetWeight, targetCalories, targetBfp) " +
                        "VALUES (@username, @password, @firstname, @lastname, @dateOfBirth, @signUpDate, @height, @weight, @bodyFatPct, @measurementSystem, @pictureLink, @caloriesToday, @targetWeight, @targetCalories, @targetBfp)", connection))
                    {
                        command.Parameters.AddWithValue("@username", myUser.username);
                        command.Parameters.AddWithValue("@password", myUser.password);
                        command.Parameters.AddWithValue("@firstname", myUser.firstname);
                        command.Parameters.AddWithValue("@lastname", myUser.lastname);
                        command.Parameters.AddWithValue("@dateOfBirth", myUser.dateOfBirth);
                        command.Parameters.AddWithValue("@signUpDate", DateTime.Now.Date); //automatically add now as the signup date
                        command.Parameters.AddWithValue("@height", myUser.height);
                        command.Parameters.AddWithValue("@weight", myUser.weight);
                        command.Parameters.AddWithValue("@bodyFatPct", myUser.bodyFatPct);
                        command.Parameters.AddWithValue("@measurementSystem", myUser.measurementSystem);
                        command.Parameters.AddWithValue("@pictureLink", myUser.pictureLink);
                        command.Parameters.AddWithValue("@caloriesToday", myUser.caloriesToday);
                        command.Parameters.AddWithValue("@targetWeight", myUser.targetWeight);
                        command.Parameters.AddWithValue("@targetCalories", myUser.targetCalories);
                        command.Parameters.AddWithValue("@targetBfp", myUser.targetBfp);

                        command.Prepare();
                        command.ExecuteNonQuery();
                    }
                    connection.Close();
                }

                return "User added successfully";
            }
            catch (Exception ex)
            {
                // Log the exception details (you can replace Console.WriteLine with your logging mechanism)
                Console.WriteLine($"Error in PostUser: {ex.Message}");

                // Return a more informative error message
                return $"Error adding User: {ex.Message}";
            }
        }

        // PUT api/<User>/5
        [HttpPut("{id}")]
        public string Put(int id, [FromBody] User myUser)
        {
            try
            {
                using (MySqlConnection connection = new MySqlConnection(cs))
                {
                    connection.Open();
                    using (MySqlCommand command = new MySqlCommand(
                        "UPDATE user SET username = @username, password = @password, firstname = @firstname, " +
                        "lastname = @lastname, dateOfBirth = @dateOfBirth, signUpDate = @signUpDate, height = @height, " +
                        "weight = @weight, bodyFatPct = @bodyFatPct, measurementSystem = @measurementSystem, " +
                        "picturelink = @picturelink, caloriesToday = @caloriesToday, targetWeight = @targetWeight, " +
                        "targetCalories = @targetCalories, targetBfp = @targetBfp, lastDayCalories = @lastDayCalories WHERE id = @id", connection))
                    {
                        command.Parameters.AddWithValue("@id", id); // Add ID parameter for WHERE clause
                        command.Parameters.AddWithValue("@username", myUser.username);
                        command.Parameters.AddWithValue("@password", myUser.password);
                        command.Parameters.AddWithValue("@firstname", myUser.firstname);
                        command.Parameters.AddWithValue("@lastname", myUser.lastname);
                        command.Parameters.AddWithValue("@dateOfBirth", myUser.dateOfBirth);
                        command.Parameters.AddWithValue("@signUpDate", myUser.signUpDate); // Use myUser.signUpDate instead of DateTime.Now.Date
                        command.Parameters.AddWithValue("@height", myUser.height);
                        command.Parameters.AddWithValue("@weight", myUser.weight);
                        command.Parameters.AddWithValue("@bodyFatPct", myUser.bodyFatPct);
                        command.Parameters.AddWithValue("@measurementSystem", myUser.measurementSystem);
                        command.Parameters.AddWithValue("@pictureLink", myUser.pictureLink); // Fix parameter name
                        command.Parameters.AddWithValue("@caloriesToday", myUser.caloriesToday);
                        command.Parameters.AddWithValue("@targetWeight", myUser.targetWeight);
                        command.Parameters.AddWithValue("@targetCalories", myUser.targetCalories);
                        command.Parameters.AddWithValue("@targetBfp", myUser.targetBfp);
                        command.Parameters.AddWithValue("@lastDayCalories", myUser.lastDayCalories);


                        command.Prepare();
                        command.ExecuteNonQuery();
                    }
                    connection.Close();
                }

                return "User updated successfully";
            }
            catch (Exception ex)
            {
                // Log the exception details (you can replace Console.WriteLine with your logging mechanism)
                Console.WriteLine($"Error in PutUser: {ex.Message}");

                // Return a more informative error message
                return $"Error updating User: {ex.Message}";
            }
        }


        // DELETE api/<User>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
