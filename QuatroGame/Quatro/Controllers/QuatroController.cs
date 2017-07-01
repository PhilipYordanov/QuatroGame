namespace Quatro.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Web.Mvc;
    using Quatro.Models;

    public class QuatroController : Controller
    {
        public ActionResult NewGame()
        {
            string currentLine = string.Empty;
            string firstPlayerName = string.Empty;
            string secondPlayerName = string.Empty;
            StreamReader readFile = new StreamReader(@"C:\Users\User\Desktop\QuatroGame\Quatro\Score.txt");
            while (readFile.EndOfStream == false)
            {
                currentLine = readFile.ReadLine();
            }

            readFile.Close();
            readFile.Dispose();

            var tokens = currentLine
                .Split(new[] { ' ', '-' }, StringSplitOptions.RemoveEmptyEntries)
                .ToArray();

            firstPlayerName = tokens[0];
            secondPlayerName = tokens[1];
            var firstPlayerScore = int.Parse(tokens[3]);
            var secondPlayerScore = int.Parse(tokens[4]);

            var listOfPlayers = new List<Player>();
            listOfPlayers.Add(new Player(firstPlayerName, firstPlayerScore));
            listOfPlayers.Add(new Player(secondPlayerName, secondPlayerScore));
            return View(listOfPlayers);
        }

        public ActionResult PlayAgain()
        {
            // TODO: get the winner using ViewBag
            // increment winner score
            // update the players in the score.txt
            return View("PlayAgain");
        }
    }
}