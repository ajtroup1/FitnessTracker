namespace FitnessTracker.backend.models
{
    public class User
    {
        public int id { get; set; }
        public string username { get; set; }
        public string password { get; set; }
        public string firstname { get; set; }
        public string lastname { get; set; }
        public string dateOfBirth { get; set; }
        public DateTime signUpDate { get; set; }
        public double height { get; set; }
        public double weight { get; set; }
        public double bodyFatPct { get; set; }
        public string measurementSystem { get; set; }
        public string pictureLink { get; set; }
        public int caloriesToday { get; set; }
        public double targetWeight { get; set; }
        public int targetCalories { get; set; }
        public double targetBfp { get; set; }
    }
}