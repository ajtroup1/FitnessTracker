namespace FitnessTracker.backend.models
{
    public class ConnectionString
    {
        public string cs {get; set;}

        public ConnectionString(){
            string server = "bqmayq5x95g1sgr9.cbetxkdyhwsb.us-east-1.rds.amazonaws.com";
            string database = "o3jdvyoms7uvwbu6";
            string port = "3306";
            string userName = "ejpduxleav0fy71o";
            string password = "lcoee2acvnbr7h7q";

            cs = $@"server = {server};user = {userName};database = {database};port = {port};password = {password};";
        }
    }
}