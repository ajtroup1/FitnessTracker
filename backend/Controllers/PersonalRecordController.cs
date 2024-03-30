using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using FitnessTracker.backend.models;
using System;
using System.Collections.Generic;

namespace MyApp.Namespace
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonalRecordController : ControllerBase
    {
        private string cs { get; set; }

        public PersonalRecordController()
        {
            cs = new ConnectionString().cs;
        }
        // GET: api/<PersonalRecord>
        [HttpGet]
        public List<PersonalRecord> Get()
        {
            List<PersonalRecord> records = new List<PersonalRecord>();

            try
            {
                using (MySqlConnection connection = new MySqlConnection(cs))
                {
                    connection.Open();
                    using (MySqlCommand command = new MySqlCommand("SELECT * FROM personalRecord", connection))
                    {
                        using (MySqlDataReader reader = command.ExecuteReader())
                        {
                            // Inside the while loop where you're reading data from the reader
                        while (reader.Read())
                        {
                            try
                            {
                                PersonalRecord record = new PersonalRecord
                                {
                                    id = Convert.ToInt32(reader["id"]),
                                    userID = Convert.ToInt32(reader["userID"]),
                                    workoutName = Convert.ToString(reader["workoutName"]),
                                    prType = Convert.ToString(reader["prType"]),
                                    prDate = Convert.ToDateTime(reader["prDate"]),
                                    distance = reader["distance"] == DBNull.Value ? null : Convert.ToString(reader["distance"]),
                                    speed = reader["speed"] == DBNull.Value ? null : Convert.ToString(reader["speed"])
                                };

                                // Check for DBNull value before converting weight
                                if (reader["weight"] != DBNull.Value)
                                {
                                    record.weight = Convert.ToDouble(reader["weight"]);
                                }
                                else
                                {
                                    record.weight = 0.0; // or set it to null if weight is nullable in your database
                                }

                                records.Add(record);
                            }
                            catch (Exception ex)
                            {
                                Console.WriteLine($"Error converting: {ex.Message}");
                                // Handle the error as needed, e.g., log the error and continue or skip the record
                            }
                        }



                        }
                    }
                    connection.Close();
                }

                return records;
            }
            catch (Exception ex)
            {
                // Log the exception details (you can replace Console.WriteLine with your logging mechanism)
                Console.WriteLine($"Error in GetAllGames: {ex.Message}");

                // Return an empty list or handle the error appropriately
                return new List<PersonalRecord>();
            }
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
