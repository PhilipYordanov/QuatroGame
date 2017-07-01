namespace Quatro.Controllers
{
    using System.Collections.Generic;
    using System.IO;
    using System.Web.Mvc;
    using Quatro.Models;

    public class PlayerController : Controller
    {
        public ActionResult Newgame()
        {
            return View();
        }

        [HttpPost]
        public ActionResult GetPlayerNames(string firstPlayer, string secondPlayer)
        {
            // string filePath = Path.GetFullPath("Score.txt");
            var firstPlayerName = firstPlayer;
            var playerOne = new Player(firstPlayerName, 0, false);

            var secondPlayerName = secondPlayer;
            var playerTwo = new Player(secondPlayerName, 0, false);

            var currentPlayers = new List<Player>() { playerOne, playerTwo };
            currentPlayers.Add(playerOne);
            currentPlayers.Add(playerTwo);

            StreamWriter sw = new StreamWriter(/*filePath*/ @"C:\Users\User\Desktop\QuatroGame\Quatro\Score.txt", true);
            sw.WriteLine($"{playerOne.Name}  - {playerTwo.Name} : {playerOne.Score} - {playerTwo.Score}");
            
            sw.Flush();
            sw.Dispose();

            return RedirectToAction("NewGame", "Quatro", currentPlayers);
        }
    }
}