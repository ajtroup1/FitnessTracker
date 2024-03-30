namespace FitnessTracker.backend.models
{
    public class PersonalRecord
    {
        public int id {get; set;}
        public int userID {get; set;}
        public string workoutName {get; set;}
        public string prType {get; set;}
        public DateTime prDate {get; set;}
        public double weight {get; set;}
        public string distance {get; set;}
        public string speed {get; set;}
    }
}