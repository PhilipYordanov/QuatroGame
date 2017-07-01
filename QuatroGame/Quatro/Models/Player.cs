namespace Quatro.Models
{
    using System.ComponentModel.DataAnnotations;

    public class Player
    {
        [Required]
        public string Name { get; set; }

        public int Score { get; set; }

        public bool IsWinner { get; set; }

        public Player(string name, int score, bool isWinner)
        {
            this.Name = name;
            this.Score = score;
            this.IsWinner = isWinner;
        }

        public Player(string name, int score)
        {
            this.Name = name;
            this.Score = score;
        }
    }
}