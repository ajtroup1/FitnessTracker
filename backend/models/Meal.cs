namespace FitnessTracker.backend.models
{
    public class Meal
    {
        public int id { get; set; }
        public int userID { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public int calories { get; set; }
        public DateTime dateCreated { get; set; }
        public int protein { get; set; }
        public int carbs { get; set; }
        public int fats { get; set; }
        public int sugar { get; set; }
        public string mealType { get; set; }
    }
}